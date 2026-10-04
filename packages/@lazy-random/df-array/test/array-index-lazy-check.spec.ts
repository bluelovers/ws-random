//@noUnusedParameters:false
/// <reference types="node" />

/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 大量取樣下不得出現 `undefined` / No `undefined` may appear under heavy sampling
 *
 * 參考 `random-extra/test/distributions/lazy-check.test.ts` 的回傳值型別把關，
 * 以及 `random-extra/test/temp.ts` 直接以真實陣列呼叫取樣器的寫法。
 * Modeled on the return-type guard of
 * `random-extra/test/distributions/lazy-check.test.ts` and on calling the
 * samplers with a real array the way `random-extra/test/temp.ts` does.
 *
 * ## 回歸背景 / Regression background
 *
 * `int()` 覆蓋含端點的 `[start, end]`，而 `_handleStartEnd()` 交出來的是
 * 半開區間 `[start, end)`，兩者差一個位置。當 `end === arr.length`（也就是
 * `start` / `end` 都不傳的預設情形）時，`int()` 會抽中 `arr.length`，
 * 呼叫端拿 `arr[index]` 就得到 `undefined`；少量呼叫不容易撞到，
 * 本檔案用 `testLimit = 3000` 次把它穩定暴露出來。
 * `int()` covers the inclusive `[start, end]` while `_handleStartEnd()` hands
 * back the half-open `[start, end)` — the two differ by one position. When
 * `end === arr.length` (the default when neither bound is passed) `int()` can
 * draw `arr.length` and the caller reading `arr[index]` gets `undefined`; a
 * handful of calls rarely hits it, so this file uses `testLimit = 3000` to
 * surface it reliably.
 *
 * 修復方式是改用 randIndex 系列的 `randIndexWithRange()`，它本身即為半開區間。
 * The fix switches to `randIndexWithRange()` from the randIndex family, which is
 * half-open by construction.
 *
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/array-index-lazy-check.spec.ts`
 *
 * 快照本身不是最終裁決：`--test-update-snapshots` 會把不符的快照直接改寫而非失敗，
 * 因此每個快照之後都補 `t.assert.partialDeepStrictEqual()`，
 * 把索引域、回歸旗標與掃描覆蓋面寫成不會被自動更新覆蓋的斷言。
 *
 * The snapshot is not the final word: `--test-update-snapshots` rewrites a
 * mismatched snapshot instead of failing, so every snapshot is followed by a
 * `t.assert.partialDeepStrictEqual()` pinning the index domain, the regression
 * flags and the sweep coverage in assertions the auto-update cannot overwrite.
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { newRngMathRandom } from '@lazy-random/util-test';
import { dfArrayIndex } from '../src/index';
import { dfArrayIndexOne } from '../src/array-index-one';
import { _handleStartEnd } from '../src/util/options';

/**
 * 把出現過的索引排序後回傳，供快照比對 / Return the seen indexes sorted for snapshot comparison
 *
 * @param seen 出現值的集合 / The set of values seen
 * @returns 由小到大的索引清單 / The indexes in ascending order
 */
function sorted(seen: Set<number>): number[]
{
	return [...seen].sort((a, b) => a - b);
}

/**
 * 驗證單一索引：型別、整數性、邊界、以及真的取得到元素
 * Validate a single index: type, integrality, bounds, and that it really resolves to an element
 *
 * 四道檢查各自對應 `undefined` 的一種來源，缺一不可。
 * Each of the four checks catches a different source of `undefined`.
 *
 * @param index 取樣結果 / The sampled index
 * @param arr 目標陣列 / The target array
 * @param at 第幾次取樣，用於錯誤訊息 / Which sample this was, for the error message
 */
function checkIndex(index: unknown, arr: readonly unknown[], at: number): asserts index is number
{
	if (typeof index !== 'number')
	{
		throw new TypeError(`sample #${at} returned ${typeof index}, expected number`);
	}

	if (!Number.isInteger(index))
	{
		throw new RangeError(`sample #${at} returned non-integer ${index}`);
	}

	/**
	 * 越界正是 int() 含端點缺陷的症狀：預設 end 時會抽中 arr.length
	 * Out of bounds is the signature of int()'s inclusive defect: with the
	 * default end it draws arr.length
	 */
	if (index < 0 || index >= arr.length)
	{
		throw new RangeError(`sample #${at} returned ${index}, expected [0, ${arr.length})`);
	}

	if (arr[index] === undefined)
	{
		throw new RangeError(`sample #${at} returned ${index}, but arr[${index}] is undefined`);
	}
}

/**
 * 逐次取樣並驗證單一索引，回傳出現過的索引集合
 * Sample one index repeatedly, validate each, and return the distinct indexes seen
 *
 * @param fn 取樣器 / The sampler
 * @param arr 目標陣列 / The target array
 * @param limit 取樣次數 / The number of samples
 * @returns 出現過的索引 / The indexes seen
 */
function sampleOne(fn: () => number, arr: readonly unknown[], limit: number): Set<number>
{
	const seen = new Set<number>();

	for (let i = 0; i < limit; i++)
	{
		const index = fn();

		checkIndex(index, arr, i);
		seen.add(index);
	}

	return seen;
}

/**
 * 逐次取樣並驗證索引清單：長度、去重、每一項的邊界與元素存在性
 * Sample an index list repeatedly and validate its size, uniqueness, and every entry's bounds and existence
 *
 * @param fn 取樣器 / The sampler
 * @param arr 目標陣列 / The target array
 * @param limit 取樣次數 / The number of samples
 * @param size 期望的索引數 / The expected number of indexes
 * @returns 出現過的索引 / The indexes seen
 */
function sampleMany(fn: () => number[], arr: readonly unknown[], limit: number, size: number): Set<number>
{
	const seen = new Set<number>();

	for (let i = 0; i < limit; i++)
	{
		const ids = fn();

		if (ids.length !== size)
		{
			throw new RangeError(`sample #${i} returned ${ids.length} indexes, expected ${size}`);
		}

		if (new Set(ids).size !== size)
		{
			throw new RangeError(`sample #${i} returned duplicated indexes: [${ids.join(', ')}]`);
		}

		ids.forEach((index, at) => checkIndex(index, arr, at));
		ids.forEach((index) => seen.add(index));
	}

	return seen;
}

/**
 * 由掃描維度算出應窮舉的組合數 / Compute the combinations to enumerate from the sweep dimensions
 *
 * @param dimensions 各維度的候選值清單 / The candidate values of each dimension
 * @returns 組合總數 / The total number of combinations
 */
function calcCombos(...dimensions: readonly (readonly unknown[])[]): number
{
	return dimensions.reduce((total, dimension) => total * dimension.length, 1);
}

/**
 * 由「成功建立的組合數 × 每組取樣數」算出取樣總數
 * Compute the total sample count from the combinations that built times the draws per combination
 *
 * 取樣總數無法獨立預測：哪些組合會在建立期拋錯由 `_handleStartEnd()` 的驗證規則決定，
 * 在測試裡重抄那份規則會違反單一事實來源。因此改用這個恆等式核對迴圈的帳——
 * 任何一組漏跑、或提前中斷而少跑幾次，兩邊就對不起來。
 *
 * The total cannot be predicted independently: which combinations throw at
 * build time is decided by `_handleStartEnd()`'s validation rules, and
 * re-transcribing them in the test would violate single source of truth. So the
 * loop's accounting is checked with this identity instead — any combination
 * skipped, or cut short and under-sampled, makes the two sides disagree.
 *
 * @param ok 成功建立的組合數 / The number of combinations that built successfully
 * @param draws 每組取樣次數 / The number of draws per combination
 * @returns 取樣總數 / The total number of samples
 */
function calcSampled(ok: number, draws: number): number
{
	return ok * draws;
}

describe('array-index 大量取樣', () =>
{
	/**
	 * 取樣次數：`int()` 的含端點缺陷是 1/(end - start + 1) 的機率，
	 * 3000 次足以讓它在預設的 5 元素陣列上必然浮現。
	 *
	 * Sample count: `int()`'s inclusive defect fires with probability
	 * 1/(end - start + 1), so 3000 draws make it certain to surface on a
	 * default 5-element array.
	 */
	const testLimit = 3000;

	const rnd = newRngMathRandom();

	/** 與 `lazy-check.test.ts` / `temp.ts` 相同的 5 元素陣列 / the same 5-element array */
	const arr = [11, 22, 33, 44, 55];

	test('dfArrayIndexOne 預設區間 [0, length)：3000 次全落在陣列內', (t) =>
	{
		const seen = sampleOne(dfArrayIndexOne(rnd, arr), arr, testLimit);

		const snapshot = {
			'出現的索引': sorted(seen),
			'涵蓋全部索引': seen.size === arr.length,
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'出現的索引': [0, 1, 2, 3, 4],
			'涵蓋全部索引': true,
		});
	});

	test('回歸：預設 end 時不得抽中 arr.length', (t) =>
	{
		/**
		 * 這是最容易撞到缺陷的形狀：完全不傳 start / end，
		 * 讓 end 落在 arr.length 上，舊的 int() 會回傳 4（5 元素陣列的越界位）。
		 *
		 * This is the shape that hits the defect most readily: no start / end at
		 * all, so end lands on arr.length — the old int() returns 4, one past a
		 * 5-element array.
		 */
		const fn = dfArrayIndexOne(rnd, arr);
		const seen = new Set<number>();

		for (let i = 0; i < testLimit; i++)
		{
			const index = fn();

			assert.ok(index < arr.length, `sample #${i} returned ${index}, arr.length is ${arr.length}`);
			assert.notStrictEqual(arr[index], undefined, `sample #${i} returned ${index}, arr[${index}] is undefined`);

			seen.add(index);
		}

		const snapshot = {
			'arr.length': arr.length,
			'出現的索引': sorted(seen),
			'抽中 arr.length': seen.has(arr.length),
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'arr.length': 5,
			'出現的索引': [0, 1, 2, 3, 4],
			'抽中 arr.length': false,
		});
	});

	test('回歸：dfArrayIndexOne(target, 1, 5) 只抽 [1, 4) 內的索引', (t) =>
	{
		/**
		 * `array-index.spec.ts` 用的就是這組參數，舊快照記下了越界的 `4`：
		 * arr 只有 0 ～ 3 四個合法索引，`4` 對應 arr[4] === undefined。
		 *
		 * Same arguments as `array-index.spec.ts`, whose old snapshot recorded the
		 * out-of-range `4`: the array only has legal indexes 0 ～ 3, and `4` maps
		 * to arr[4] === undefined.
		 */
		const target = [1, 2, 3, 4];
		const seen = sampleOne(dfArrayIndexOne(rnd, target, 1, 5), target, testLimit);

		const snapshot = {
			'出現的索引': sorted(seen),
			'排除越界的 4': seen.has(4) === false,
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'出現的索引': [1, 2, 3],
			'排除越界的 4': true,
		});
	});

	test('dfArrayIndexOne 超出 length 的 end 會收窄，不放大到陣列外', (t) =>
	{
		/**
		 * end 傳 999，`_handleStartEnd()` 會把它夾回 arr.length，
		 * 因此收窄後的上界仍是 arr.length 而非 999。
		 *
		 * An end of 999 is clamped back to arr.length by `_handleStartEnd()`, so
		 * the narrowed upper bound stays arr.length rather than 999.
		 */
		const seen = sampleOne(dfArrayIndexOne(rnd, arr, 0, 999), arr, testLimit);

		const snapshot = {
			'出現的索引': sorted(seen),
			'涵蓋全部索引': seen.size === arr.length,
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'出現的索引': [0, 1, 2, 3, 4],
			'涵蓋全部索引': true,
		});
	});

	test('dfArrayIndexOne 單一候選的常數快取路徑', (t) =>
	{
		/**
		 * start === end - 1 時走常數函式，不應消耗亂數，也永遠回傳同一索引。
		 * When start === end - 1 the constant sampler is used: it draws no random
		 * number and always returns the same index.
		 */
		const fn = dfArrayIndexOne(rnd, arr, 4);

		for (let i = 0; i < testLimit; i++)
		{
			assert.strictEqual(fn(), 4);
		}

		const snapshot = { '固定索引': 4 };

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, { '固定索引': 4 });
	});

	test('dfArrayIndex size=3：每次回傳 3 個不重複且在範圍內的索引', (t) =>
	{
		const size = 3;
		const seen = sampleMany(dfArrayIndex(rnd, arr, size), arr, testLimit, size);

		const snapshot = {
			'出現的索引': sorted(seen),
			'涵蓋全部索引': seen.size === arr.length,
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'出現的索引': [0, 1, 2, 3, 4],
			'涵蓋全部索引': true,
		});
	});

	test('dfArrayIndex size 超過可用數量時縮小，不回傳越界索引', (t) =>
	{
		/**
		 * size 遠大於陣列可用索引數時，`dfArrayIndex()` 應縮小規模而不是
		 * 硬湊出重複或越界值。
		 * When size far exceeds the available indexes, `dfArrayIndex()` shrinks
		 * the run instead of padding with duplicates or out-of-range values.
		 */
		const seen = sampleMany(dfArrayIndex(rnd, arr, 99), arr, testLimit, arr.length);

		const snapshot = {
			'出現的索引': sorted(seen),
			'實際 size': arr.length,
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'出現的索引': [0, 1, 2, 3, 4],
			'實際 size': 5,
		});
	});

	test('dfArrayIndex 子區間 [1, 4)：只抽 1 ～ 3', (t) =>
	{
		const seen = sampleMany(dfArrayIndex(rnd, arr, 2, 1, 4), arr, testLimit, 2);

		const snapshot = {
			'出現的索引': sorted(seen),
			'排除 0 與 4': seen.has(0) === false && seen.has(4) === false,
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'出現的索引': [1, 2, 3],
			'排除 0 與 4': true,
		});
	});

	test('回傳值型別把關（對齊 lazy-check）：非 undefined、非 null、非 function', (t) =>
	{
		const one = dfArrayIndexOne(rnd, arr);
		const many = dfArrayIndex(rnd, arr, 2);

		let lastOne: unknown;
		let lastMany: unknown;

		for (let i = 0; i < testLimit; i++)
		{
			lastOne = one();
			lastMany = many();

			assert.notStrictEqual(typeof lastOne, 'undefined');
			assert.notStrictEqual(lastOne, null);
			assert.notStrictEqual(typeof lastOne, 'function');

			assert.notStrictEqual(typeof lastMany, 'undefined');
			assert.notStrictEqual(lastMany, null);
			assert.notStrictEqual(typeof lastMany, 'function');
		}

		const snapshot = {
			'dfArrayIndexOne': typeof lastOne,
			'dfArrayIndex': typeof lastMany,
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'dfArrayIndexOne': 'number',
			'dfArrayIndex': 'object',
		});
	});

	/**
	 * 全參數掃描 / Full parameter sweep
	 *
	 * 窮舉 `length × size × start × end` 的組合，逐一確認「建立期拋錯」或
	 * 「回傳的每一項都是合法索引」兩者必居其一 — 不允許第三種結果。
	 * Enumerates every `length × size × start × end` combination and asserts that
	 * each one either throws at build time or returns only legal indexes —
	 * a third outcome is not allowed.
	 *
	 * 越界索引會沿著 `dfArrayItem` 的 `fn().reduce((a, i) => a.push(arr[i]))`
	 * 變成結果陣列裡的 `undefined`，這正是大量測試下看到的症狀。
	 * An out-of-range index flows into `undefined` in the result array through
	 * `dfArrayItem`'s `fn().reduce((a, i) => a.push(arr[i]))` — exactly the
	 * symptom seen under heavy testing.
	 */
	test('dfArrayIndex 全參數掃描：任何組合都不得回傳越界索引', (t) =>
	{
		const lengths = [1, 2, 3, 5];
		const sizes = [-1, 0, 1, 2, 3, 99];
		const starts: (number | undefined)[] = [undefined, -1, 0, 1, 2];
		const ends: (number | undefined | null)[] = [undefined, null, 0, 1, 3, 99];
		const draws = 100;

		const stats = { combos: 0, ok: 0, sampled: 0, threw: 0, maxIds: 0 };

		for (const length of lengths)
		{
			const target = Array.from({ length }, (_, i) => 11 + i * 11);

			for (const size of sizes)
			{
				for (const start of starts)
				{
					for (const end of ends)
					{
						stats.combos++;

						let fn: () => number[];

						try
						{
							fn = dfArrayIndex(rnd, target, size, start, end as number | undefined);
						}
						catch
						{
							stats.threw++;
							continue;
						}

						stats.ok++;

						/**
						 * 用同一份正規化重算區間，確認取樣器的範圍與
						 * `dfArrayIndex()` 內部用來算 size_runtime 的完全一致：
						 * 任何回傳值都必須落在這裡算出的 `[range.start, range.end)`。
						 *
						 * Recomputing the range with the same normalisation checks that
						 * the sampler's span matches what `dfArrayIndex()` used for
						 * size_runtime: every returned value must fall inside the
						 * `[range.start, range.end)` computed here.
						 */
						const range = _handleStartEnd(target, start, end as number | undefined);

						for (let i = 0; i < draws; i++)
						{
							const ids = fn();

							stats.sampled++;
							stats.maxIds = Math.max(stats.maxIds, ids.length);

							if (ids.length !== new Set(ids).size)
							{
								throw new RangeError(`size=${size} start=${start} end=${end} returned duplicates: [${ids.join(', ')}]`);
							}

							if (ids.length > size || ids.length > length)
							{
								throw new RangeError(`size=${size} start=${start} end=${end} returned ${ids.length} indexes`);
							}

							ids.forEach((index, at) =>
							{
								checkIndex(index, target, at);

								if (index < range.start || index >= range.end)
								{
									throw new RangeError(`size=${size} start=${start} end=${end} returned ${index}, expected [${range.start}, ${range.end})`);
								}
							});
						}
					}
				}
			}
		}

		t.assert.snapshot(stats);

		const combos = calcCombos(lengths, sizes, starts, ends);
		const ok = combos - stats.threw;

		/**
		 * 覆蓋面斷言：三個預期值都由邏輯推導，不寫死數字。
		 * `combos` 是各維度的笛卡兒積；`ok` 核對「每一組不是成功建立就是拋錯」；
		 * `sampled` 核對「成功建立的每一組都真的跑了 draws 次」——
		 * 否則「全部在建立期拋錯」也能讓掃描空轉通過。
		 *
		 * Coverage assertion: all three expected values are derived by logic
		 * rather than hard-coded. `combos` is the Cartesian product of the
		 * dimensions; `ok` checks that every combination either built or threw;
		 * `sampled` checks that every one that built really ran `draws` times —
		 * otherwise "everything throws at build time" would let the sweep pass
		 * vacuously.
		 */
		t.assert.partialDeepStrictEqual(stats, {
			combos,
			ok,
			sampled: calcSampled(ok, draws),
		});
	});

	/**
	 * 單一索引的同款掃描 / Same sweep for the single-index sampler
	 *
	 * `dfArrayIndex` 的建立期會先因 `size` 拋錯而來不及走到取樣，
	 * 所以這裡直接掃 `dfArrayIndexOne`，補上那些被 `size` 擋在門外的組合。
	 * `dfArrayIndex` throws on `size` before ever sampling, so this sweeps
	 * `dfArrayIndexOne` directly to cover the combinations `size` blocks at the door.
	 */
	test('dfArrayIndexOne 全參數掃描：任何組合都不得回傳越界索引', (t) =>
	{
		const lengths = [1, 2, 3, 5];
		const starts: (number | undefined)[] = [undefined, -1, 0, 1, 2];
		const ends: (number | undefined | null)[] = [undefined, null, 0, 1, 3, 99];
		const draws = 100;

		const stats = { combos: 0, ok: 0, sampled: 0, threw: 0 };

		for (const length of lengths)
		{
			const target = Array.from({ length }, (_, i) => 11 + i * 11);

			for (const start of starts)
			{
				for (const end of ends)
				{
					stats.combos++;

					let fn: () => number;

					try
					{
						fn = dfArrayIndexOne(rnd, target, start, end as number | undefined);
					}
					catch
					{
						stats.threw++;
						continue;
					}

					stats.ok++;

					for (let i = 0; i < draws; i++)
					{
						stats.sampled++;
						checkIndex(fn(), target, i);
					}
				}
			}
		}

		t.assert.snapshot(stats);

		const combos = calcCombos(lengths, starts, ends);
		const ok = combos - stats.threw;

		/**
		 * 覆蓋面斷言：與前一個掃描同一套推導，只是維度少了 `size`。
		 * 預期值全部由 `calcCombos()` / `calcSampled()` 算出，不寫死數字。
		 *
		 * Coverage assertion: the same derivation as the previous sweep, minus
		 * the `size` dimension. Every expected value comes from `calcCombos()` /
		 * `calcSampled()` rather than a hard-coded number.
		 */
		t.assert.partialDeepStrictEqual(stats, {
			combos,
			ok,
			sampled: calcSampled(ok, draws),
		});
	});
});
