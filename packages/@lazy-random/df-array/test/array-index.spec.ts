//@noUnusedParameters:false
/// <reference types="node" />

/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * 並以 `t.assert.snapshot()` 保留原有的快照斷言
 *
 * ## 快照 / Snapshot
 *
 * 從「值 → true」的對照表升級為完整的驗證報告：合法值區間、預期值、
 * 出現值、**缺失值**、非法值一併攤在快照裡，
 * 於是「少了哪一個值」不再是隱含資訊，而是快照上的一行。
 *
 * Upgraded from a `value → true` lookup into a full validation report: the
 * legal range, expected values, seen values, **missing values** and illegal
 * values all sit in the snapshot, so "which value is absent" is no longer
 * implied — it is a line in the snapshot.
 *
 * ## 驗證缺失 / Verifying absence
 *
 * 預期區間取自生產端的 `_handleStartEnd()`，與取樣器共用同一份契約，
 * 不在測試裡重抄一遍正規化規則。
 * The expected range comes from the production `_handleStartEnd()`, sharing the
 * sampler's contract instead of re-transcribing the normalisation rules into
 * the test.
 *
 * 每個抽樣值都經 `_createValuesValidator().check()` 驗合法性，
 * 迴圈結束後以 `verifyAllSeen()` 擋下任何缺失 — 它在快照**之前**執行，
 * 因此缺失會以錯誤訊息列出遺漏值，而不是寫進快照後靜靜通過。
 * Every draw passes through `_createValuesValidator().check()`, and
 * `verifyAllSeen()` rejects any missing value after the loop — it runs
 * **before** the snapshot, so a gap surfaces as an error listing what is
 * missing rather than being written into the snapshot and quietly passing.
 *
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/array-index.spec.ts`
 *
 * ## 快照不是最終裁決 / The snapshot is not the final word
 *
 * `test:node` 帶著 `--test-update-snapshots` 執行：快照與實際不符時
 * Node 會**直接改寫快照**而不是失敗，等於每次執行都自動「通過」。
 * 因此每個 `t.assert.snapshot()` 之後都補一份
 * `t.assert.partialDeepStrictEqual()`，把不變量（合法值數量、出現值數量、
 * 無缺失、無非法值、區間邊界）寫成不會被自動更新覆蓋的斷言。
 *
 * `test:node` runs with `--test-update-snapshots`: when a snapshot does not
 * match, Node **rewrites it instead of failing**, so every run passes by
 * construction. Each `t.assert.snapshot()` is therefore followed by a
 * `t.assert.partialDeepStrictEqual()` that pins the invariants (legal-value
 * count, seen count, no missing, no illegal, range bounds) in an assertion the
 * auto-update cannot overwrite.
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { dfArrayIndex } from '../src/index';
import { newRngMathRandom } from '@lazy-random/util-test';
import { dfArrayIndexOne } from '../src/array-index-one';
import { _handleStartEnd } from '../src/util/options';
import {
	_calcExpectedValuesByRange,
	_createValuesValidator,
	type IValuesValidator,
} from '@lazy-random/util-distributions';

/**
 * 彙整驗證器的結果為可快照的報告 / Collate a validator's results into a snapshot-able report
 *
 * @param label 驗證對象的名稱 / The name of whatever is being validated
 * @param validator 已跑完取樣的驗證器 / The validator after sampling
 * @param limit 取樣迴圈次數 / The number of sampling loop iterations
 * @returns 供快照比對的報告 / A report for snapshot comparison
 */
function report(label: string, validator: IValuesValidator, limit: number)
{
	return {
		label,
		testLimit: limit,
		total: validator.total,
		params: validator.expected.params,
		range: validator.expected.range,
		expectedValues: [...validator.expected.valuesGenerator()],
		expectedSize: validator.expected.size,
		seenValues: [...validator.seenValuesGenerator()],
		seenSize: validator.size,
		missingValues: [...validator.missingValuesGenerator()],
		illegalValues: [...validator.illegalValuesGenerator()],
	};
}

/**
 * 擷取建構結果：成功回 `ok`、失敗回 `throw`
 * Capture a build outcome: `ok` on success, `throw` on failure
 *
 * 刻意不記錯誤類別：這裡四種失敗都來自 `@lazy-random/expect()` 的同一個
 * `AssertionError`，記下來毫無鑑別力，只會把斷言綁在別人的錯誤型別上。
 *
 * The error class is deliberately not recorded: all four failures here come
 * from the same `AssertionError` thrown by `@lazy-random/expect()`, so it
 * carries no discriminating information and would only couple the assertion to
 * someone else's error type.
 *
 * @param fn 待執行的建構呼叫 / The build call to run
 * @returns 可快照的結果字串 / A snapshot-friendly result string
 */
function probe(fn: () => unknown): string
{
	try
	{
		fn();
		return 'ok';
	}
	catch
	{
		return 'throw';
	}
}

describe(`array-index`, () =>
{
	const testLimit = 1000;

	const rnd = newRngMathRandom();

	test(`dummy`, { skip: true }, () => {});

	describe(`dfArrayIndex`, () =>
	{

		test(`always return same size`, (t) =>
		{
			const size = 2;
			let arr = [1, 2, 3, 4] as const;

			const fn = dfArrayIndex(rnd, arr, size);

			let actual: number[] = [];

			for (let i = 0; i < testLimit; i++)
			{
				actual = fn();

				if (actual.length !== size)
				{
					break;
				}
			}

			assert.strictEqual(actual.length, size)

			/**
			 * 快照記錄「回傳數量」與「不重複」兩項不變量：
			 * `dfArrayIndex()` 是不放回抽樣，回傳長度恆為 size 且無重複。
			 * The snapshot records two invariants: the returned count and
			 * uniqueness — `dfArrayIndex()` samples without replacement, so the
			 * length is always `size` and never contains duplicates.
			 */
			const snapshot = {
				'每次回傳的數量': size,
				'最後一次的長度': actual.length,
				'不重複': new Set(actual).size === actual.length,
			};

			t.assert.snapshot(snapshot);
			t.assert.partialDeepStrictEqual(snapshot, {
				'每次回傳的數量': 2,
				'最後一次的長度': 2,
				'不重複': true,
			});
		});

		test(`end > start + 1`, (t) =>
		{
			const arr = [1, 2, 3, 4] as const;

			/**
			 * `_handleStartEnd()` 對「明確傳入 end」與「end 缺省」走不同分支：
			 * 明確傳入時要求 `end > start + 1`（單一候選被拒），
			 * 缺省時補成 `arr.length` 並跳過該檢查，因此 `[3, 4)` 只在缺省時被接受。
			 *
			 * `_handleStartEnd()` takes a different path for an explicit `end` than
			 * for an omitted one: an explicit `end` must satisfy `end > start + 1`
			 * (rejecting a single candidate), while an omitted `end` is filled in
			 * as `arr.length` and skips that check — so `[3, 4)` is accepted only
			 * when the bound is omitted.
			 */
			const cases: ReadonlyArray<readonly [string, () => unknown, 'ok' | 'throw']> = [
				['size=3 start=4（end 缺省）', () => dfArrayIndex(rnd, arr, 3, 4), 'throw'],
				['size=3 start=3（end 缺省）', () => dfArrayIndex(rnd, arr, 3, 3), 'ok'],
				['size=3 start=2 end=3', () => dfArrayIndex(rnd, arr, 3, 2, 3), 'throw'],
				['size=3 start=3 end=4', () => dfArrayIndex(rnd, arr, 3, 3, 4), 'throw'],
				['size=3 start=3 end=5', () => dfArrayIndex(rnd, arr, 3, 3, 5), 'ok'],
			];

			const snapshot: Record<string, string> = {};

			cases.forEach(([label, fn, expected]) =>
			{
				snapshot[label] = probe(fn);

				if (expected === 'throw')
				{
					assert.throws(fn, `${label} should throw`);
				}
				else
				{
					assert.doesNotThrow(fn, `${label} should not throw`);
				}
			});

			t.assert.snapshot(snapshot);
			t.assert.partialDeepStrictEqual(snapshot, {
				'size=3 start=4（end 缺省）': 'throw',
				'size=3 start=3（end 缺省）': 'ok',
				'size=3 start=2 end=3': 'throw',
				'size=3 start=3 end=4': 'throw',
				'size=3 start=3 end=5': 'ok',
			});
		});

		/**
		 * 整段索引的合法值與缺失檢查 / Legal values and missing-value check over the whole range
		 *
		 * 每次回傳 size 個索引，全部攤平後交給驗證器；
		 * `verifyAllSeen()` 確保整段 [0, length) 在 testLimit 內都被抽到過。
		 * Each call returns `size` indexes; flattening them all feeds the
		 * validator, and `verifyAllSeen()` guarantees the whole [0, length) was
		 * drawn at least once within `testLimit`.
		 */
		test(`整段索引無非法值、無缺失`, (t) =>
		{
			const size = 2;
			const arr = [1, 2, 3, 4] as const;

			/**
			 * 預期區間與取樣器共用同一份正規化，測試不重抄規則
			 * The expected range shares the sampler's normalisation; the test does
			 * not re-transcribe the rules
			 */
			const range = _handleStartEnd(arr);
			const expected = _calcExpectedValuesByRange(range.start, range.end);
			const validator = _createValuesValidator(expected, 'dfArrayIndex');

			const fn = dfArrayIndex(rnd, arr, size);

			for (let i = 0; i < testLimit; i++)
			{
				const ids = fn();

				assert.strictEqual(ids.length, size, `call #${i} returned ${ids.length} indexes`);

				ids.forEach((id) =>
				{
					/**
					 * 越界索引會沿著 dfArrayItem 的 arr[idx] 變成 undefined，
					 * 這裡直接驗那個症狀
					 * An out-of-range index becomes `undefined` through
					 * dfArrayItem's `arr[idx]`; assert the symptom directly
					 */
					assert.notStrictEqual(arr[id], undefined, `index ${id} resolved to undefined`);

					validator.check(id);
				});
			}

			validator.verifyAllSeen();

			const snapshot = report('dfArrayIndex', validator, testLimit);

			t.assert.snapshot(snapshot);

			/**
			 * 不變量斷言：整段 [0, length) 共 4 個合法值全部出現，
			 * 且快照不會被 `--test-update-snapshots` 自動改寫掉
			 * Invariant assertion: all 4 legal values of [0, length) appeared,
			 * and the auto-updating snapshot cannot erase this check
			 */
			t.assert.partialDeepStrictEqual(snapshot, {
				params: { start: 0, end: 4 },
				range: { start: 0, end: 4 },
				expectedSize: 4,
				seenSize: 4,
				missingValues: [],
				illegalValues: [],
			});
		});

	});

	test(`dfArrayIndexOne`, (t) =>
	{
		const min = 1;
		const max = 5;
		const arr = [1, 2, 3, 4] as const;

		/**
		 * arr.length = 4，因此傳入的 max = 5 會被收窄成 4，
		 * 真正的合法區間是 [1, 4) 而非 [1, 5)
		 * With arr.length = 4 the passed max = 5 narrows to 4, so the real legal
		 * range is [1, 4) rather than [1, 5)
		 */
		const range = _handleStartEnd(arr, min, max);
		const expected = _calcExpectedValuesByRange(range.start, range.end);
		const validator = _createValuesValidator(expected, 'dfArrayIndexOne');

		const fn = dfArrayIndexOne(rnd, arr, min, max);

		for (let i = 0; i < testLimit; i++)
		{
			const actual = fn();

			/**
			 * 同上：越界索引在呼叫端就是 undefined
			 * Same as above: an out-of-range index is `undefined` at the call site
			 */
			assert.notStrictEqual(arr[actual], undefined, `index ${actual} resolved to undefined`);

			validator.check(actual);
		}

		validator.verifyAllSeen();

		const snapshot = report('dfArrayIndexOne', validator, testLimit);

		t.assert.snapshot(snapshot);

		/**
		 * 不變量斷言：max = 5 被收窄成 4，合法值只剩 1 ～ 3 共 3 個且全數出現；
		 * 若收窄規則改變或出現缺失，這兩行會先於快照被改寫而失敗
		 * Invariant assertion: max = 5 narrows to 4, leaving the 3 legal values
		 * 1 ～ 3, all of which appeared; if the narrowing rule changes or a value
		 * goes missing, these two lines fail before the snapshot is rewritten
		 */
		t.assert.partialDeepStrictEqual(snapshot, {
			params: { start: 1, end: 4 },
			range: { start: 1, end: 4 },
			expectedSize: 3,
			seenSize: 3,
			missingValues: [],
			illegalValues: [],
		});
	});

})
