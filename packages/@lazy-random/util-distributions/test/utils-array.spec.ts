//@noUnusedParameters:false
/// <reference types="node" />

/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 針對 `src/utils-array.ts` 的陣列輔助的單元測試，**以快照為主**
 * Unit tests for the array helpers in `src/utils-array.ts`, **snapshot-driven**
 *
 * 核心語意 / core semantics:
 *
 * - slice 風格：`-1` 從尾部往前算、超出範圍自動收窄
 *   slice style: `-1` counts from the tail, out-of-range bounds auto-narrow
 * - `min` / `max` 未輸入時以陣列為基礎補預設值（`0` ～ `length - 1`）
 *   omitted `min` / `max` default to the array basis (`0` ～ `length - 1`)
 * - core (`_fnCore*`) 不拋錯、assert 只拋錯，兩層可各自取用
 *   core (`_fnCore*`) never throws, assert only throws; both are usable alone
 *
 * 每個測試把「回傳值」與「拋出的錯誤」都轉成字串後一次快照，
 * 這樣成功與失敗的行為都會被記錄在同一份快照裡。
 * Each test turns both return values and thrown errors into strings and snapshots
 * them together, so passing and failing behaviour are recorded in one place.
 *
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/utils-array.spec.ts`
 */

import { describe, test } from 'node:test';
import { newRngMathRandom } from '@lazy-random/util-test';
import { int, randIndexByLength } from '../src/index';
import {
	type IArrayLike,
	_fnCoreArrayLength,
	_fnCoreClamp,
	_fnCoreNormalizeInclusiveIndex,
	_fnCoreNormalizeSliceIndex,
	_fnCoreNormalizeSliceMinMax,
	_fnCoreNormalizeSliceRange,
	_fnCoreOrderMinMax,
	_fnCoreResolveTailIndex,
	_assertArrayIndexMinMax,
	_assertArrayNotEmpty,
	_assertMinMax,
	_assertMinMaxOrder,
	_assertNotEmptyLength,
	_assertSize,
	_assertSizeInRange,
	_calcArrayIndexMinMax,
	_calcArrayIndexRange,
	_calcArrayLength,
	_calcArraySliceSize,
	_calcExpectedValuesByArray,
	_calcExpectedValuesByArrayMinMax,
	_calcExpectedValuesByMinMax,
	_clampSize,
	_clampValue,
	_isArrayEmpty,
	_normalizeArrayIndexMinMax,
	_normalizeArrayRange,
	_normalizeInclusiveIndex,
	_normalizeMinMax,
	_normalizeSliceIndex,
	_normalizeSliceMinMax,
	_normalizeSliceRange,
} from '../src/utils-array';
import { _createValuesValidator, type IExpectedValues, type IValuesValidator } from '../src/utils';
import { fmt, outcome, toArray } from './snapshot-helpers';

/**
 * `IExpectedValues` 的快照摘要 / Snapshot summary of an `IExpectedValues`
 */
function expectedSummary(expected: IExpectedValues)
{
	return {
		params: expected.params,
		range: expected.range,
		size: expected.size,
		values: toArray(expected.valuesGenerator()),
	};
}

/**
 * 驗證器狀態的快照摘要 / Snapshot summary of a validator's state
 */
function validatorSummary(validator: IValuesValidator)
{
	return {
		size: validator.size,
		total: validator.total,
		seen: toArray(validator.seenValuesGenerator()),
		missing: toArray(validator.missingValuesGenerator()),
		illegal: toArray(validator.illegalValuesGenerator()),
		verifyAllSeen: outcome(() => validator.verifyAllSeen()),
	};
}

describe('utils-array', () =>
{
	const testLimit = 1000;

	const rnd = newRngMathRandom();

	/**
	 * 實際 array 範例 / Real array examples
	 *
	 * 直接拿真的陣列取值，而不是只用數字區間，確保輔助與陣列長度、索引一致。
	 * Sample from real arrays instead of bare numeric ranges, so the helpers
	 * stay consistent with the actual array length and indexes.
	 */
	describe('實際 array 範例', () =>
	{
		test('randIndexByLength() 取實際陣列索引，0 ～ length - 1 全部出現且無非預期值', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			const expected = _calcExpectedValuesByArray(arr);
			const validator = _createValuesValidator(expected, 'randIndexByLength(array)');

			for (let i = 0; i < testLimit; i++)
			{
				/**
				 * 索引必須真的取得到陣列元素 / the index must resolve to a real element
				 */
				const index = randIndexByLength(rnd, arr.length);

				if (arr[index] === undefined)
				{
					throw new RangeError(`randIndexByLength(${arr.length}) => ${index} out of range`);
				}

				validator.check(index);
			}

			t.assert.snapshot({
				'expected.size === arr.length': expected.size === arr.length,
				state: validatorSummary(validator),
			});
		});

		test('min / max 未輸入時以整段陣列為基礎，int() 所有索引皆出現', (t) =>
		{
			const arr = [10, 20, 30, 40, 50];

			const domain = _normalizeArrayIndexMinMax(arr, null, null);
			const expected = _calcExpectedValuesByArrayMinMax(arr, null, null);
			const validator = _createValuesValidator(expected, 'int(array)');

			for (let i = 0; i < testLimit; i++)
			{
				const value = int(rnd, domain.min, domain.max);

				/**
				 * 取出的索引必須真的存在於陣列中 / the drawn index must exist in the array
				 */
				if (arr[value] === undefined)
				{
					throw new RangeError(`int(${domain.min}, ${domain.max}) => ${value} out of range`);
				}

				validator.check(value);
			}

			t.assert.snapshot({
				domain,
				'expected.size === arr.length': expected.size === arr.length,
				state: validatorSummary(validator),
			});
		});

		test('min / max 為負數時從尾部往前算，只取最後幾個元素', (t) =>
		{
			const arr = [10, 20, 30, 40, 50];

			const domain = _normalizeArrayIndexMinMax(arr, -2, -1);
			const expected = _calcExpectedValuesByArrayMinMax(arr, -2, -1);
			const validator = _createValuesValidator(expected, 'int(array[-2, -1])');

			for (let i = 0; i < testLimit; i++)
			{
				const value = int(rnd, domain.min, domain.max);

				/**
				 * 只能取到最後兩個元素 / only the last two elements may be drawn
				 */
				if (![40, 50].includes(arr[value]))
				{
					throw new RangeError(`int(${domain.min}, ${domain.max}) => ${value} escaped the tail`);
				}

				validator.check(value);
			}

			t.assert.snapshot({
				domain,
				'expected.size': expected.size,
				state: validatorSummary(validator),
			});
		});

		test('空陣列 [] 無法取索引，建立期立刻拋錯', (t) =>
		{
			const arr: string[] = [];

			t.assert.snapshot({
				'isArrayEmpty': _isArrayEmpty(arr),
				'calcArrayIndexRange': outcome(() => _calcArrayIndexRange(arr)),
				'calcExpectedValuesByArray': outcome(() => _calcExpectedValuesByArray(arr)),
				'assertArrayNotEmpty': outcome(() => _assertArrayNotEmpty(arr)),
				'calcArrayIndexMinMax': outcome(() => _calcArrayIndexMinMax(arr)),
				'normalizeArrayIndexMinMax': outcome(() => _normalizeArrayIndexMinMax(arr)),
				'calcExpectedValuesByArrayMinMax': outcome(() => _calcExpectedValuesByArrayMinMax(arr)),
			});
		});

		test('單元素陣列僅有一個合法索引', (t) =>
		{
			const arr = ['only'];

			t.assert.snapshot({
				'expected': expectedSummary(_calcExpectedValuesByArray(arr)),
				'calcArrayIndexMinMax': _calcArrayIndexMinMax(arr),
				'randIndexByLength': randIndexByLength(rnd, arr.length),
			});
		});

		test('子區間 [start, end) 只允許該段索引', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

			t.assert.snapshot(expectedSummary(_calcExpectedValuesByArray(arr, 2, 5)));
		});
	});

	describe('陣列長度', () =>
	{
		test('isArrayEmpty() 判斷 length === 0', (t) =>
		{
			t.assert.snapshot({
				'[]': _isArrayEmpty([]),
				'[1]': _isArrayEmpty([1]),
				'new Array(0)': _isArrayEmpty(new Array(0)),
				'{ length: 0 }': _isArrayEmpty({ length: 0 }),
			});
		});

		test('_fnCoreArrayLength() 只讀 length，不拋錯', (t) =>
		{
			t.assert.snapshot({
				'[]': fmt(_fnCoreArrayLength([])),
				'[a,b,c]': fmt(_fnCoreArrayLength(['a', 'b', 'c'])),
				'{ length: 7 }': fmt(_fnCoreArrayLength({ length: 7 })),
				'"hello"': fmt(_fnCoreArrayLength('hello' as unknown as IArrayLike)),
				'null': fmt(_fnCoreArrayLength(null as unknown as IArrayLike)),
				'undefined': fmt(_fnCoreArrayLength(undefined as unknown as IArrayLike)),
				'{ length: NaN }': fmt(_fnCoreArrayLength({ length: NaN })),
			});
		});

		test('calcArrayLength() 回傳長度，0 視為合法', (t) =>
		{
			t.assert.snapshot({
				'[]': _calcArrayLength([]),
				'[a]': _calcArrayLength(['a']),
				'[a,b,c]': _calcArrayLength(['a', 'b', 'c']),
				'new Array(4)': _calcArrayLength(new Array(4)),
				'{ length: 7 }': _calcArrayLength({ length: 7 }),
				'"hello"': _calcArrayLength('hello' as unknown as IArrayLike),
			});
		});

		test('calcArrayLength() 非類陣列與非法長度拋錯', (t) =>
		{
			t.assert.snapshot({
				'null': outcome(() => _calcArrayLength(null as unknown as IArrayLike)),
				'undefined': outcome(() => _calcArrayLength(undefined as unknown as IArrayLike)),
				'{ length: NaN }': outcome(() => _calcArrayLength({ length: NaN })),
				'{ length: -1 }': outcome(() => _calcArrayLength({ length: -1 } as IArrayLike)),
				'{ length: 1.5 }': outcome(() => _calcArrayLength({ length: 1.5 } as IArrayLike)),
			});
		});

		test('assertNotEmptyLength() 對 0 與負數拋出 RangeError', (t) =>
		{
			t.assert.snapshot({
				'1': outcome(() => _assertNotEmptyLength(1)),
				'9': outcome(() => _assertNotEmptyLength(9)),
				'0': outcome(() => _assertNotEmptyLength(0)),
				'-1': outcome(() => _assertNotEmptyLength(-1)),
				'1.5': outcome(() => _assertNotEmptyLength(1.5)),
			});
		});

		test('assertArrayNotEmpty() 回傳長度，空陣列拋出 RangeError', (t) =>
		{
			t.assert.snapshot({
				'[a,b]': outcome(() => _assertArrayNotEmpty(['a', 'b'])),
				'[]': outcome(() => _assertArrayNotEmpty([])),
				'calcExpectedValuesByArray([])': outcome(() => _calcExpectedValuesByArray([])),
			});
		});
	});

	/**
	 * core 層 / Core layer
	 *
	 * `_fnCore*` 只做標準化，`NaN` / `±Infinity` 原樣流出、絕不拋錯。
	 * `_fnCore*` only normalises; `NaN` / `±Infinity` flow through and it never throws.
	 *
	 * 前置條件（`length >= 1`、`min <= max`…）由上層 `assert*` 把關，
	 * core 不重複驗證；因此這裡只測「會收到的輸入」，
	 * 例外是半開邊界的 `length === 0` — 那是 `_assertSliceIndexParams()` 明文允許的值。
	 * Preconditions (`length >= 1`, `min <= max`, …) are guarded by the `assert*`
	 * layer and not re-checked here, so only inputs that actually reach core are
	 * tested. The exception is `length === 0` for a half-open bound, which
	 * `_assertSliceIndexParams()` explicitly allows.
	 */
	describe('core：_fnCore* 不拋錯', () =>
	{
		test('_fnCoreNormalizeSliceIndex() 半開邊界收進 [0, length]', (t) =>
		{
			t.assert.snapshot({
				'0': fmt(_fnCoreNormalizeSliceIndex(0, 5)),
				'3': fmt(_fnCoreNormalizeSliceIndex(3, 5)),
				'5': fmt(_fnCoreNormalizeSliceIndex(5, 5)),
				'99': fmt(_fnCoreNormalizeSliceIndex(99, 5)),
				'99 @ length 0': fmt(_fnCoreNormalizeSliceIndex(99, 0)),
				'-1': fmt(_fnCoreNormalizeSliceIndex(-1, 5)),
				'-2': fmt(_fnCoreNormalizeSliceIndex(-2, 5)),
				'-5': fmt(_fnCoreNormalizeSliceIndex(-5, 5)),
				'-99': fmt(_fnCoreNormalizeSliceIndex(-99, 5)),
				'1.9': fmt(_fnCoreNormalizeSliceIndex(1.9, 5)),
				'-1.5': fmt(_fnCoreNormalizeSliceIndex(-1.5, 5)),
				'-0.5': fmt(_fnCoreNormalizeSliceIndex(-0.5, 5)),
				'NaN': fmt(_fnCoreNormalizeSliceIndex(NaN, 5)),
				'Infinity': fmt(_fnCoreNormalizeSliceIndex(Infinity, 5)),
				'-Infinity': fmt(_fnCoreNormalizeSliceIndex(-Infinity, 5)),
			});
		});

		test('_fnCoreNormalizeInclusiveIndex() 含端點邊界收進 [0, length - 1]', (t) =>
		{
			t.assert.snapshot({
				'0': fmt(_fnCoreNormalizeInclusiveIndex(0, 5)),
				'4': fmt(_fnCoreNormalizeInclusiveIndex(4, 5)),
				'5': fmt(_fnCoreNormalizeInclusiveIndex(5, 5)),
				'99': fmt(_fnCoreNormalizeInclusiveIndex(99, 5)),
				'-1': fmt(_fnCoreNormalizeInclusiveIndex(-1, 5)),
				'-99': fmt(_fnCoreNormalizeInclusiveIndex(-99, 5)),
				'NaN': fmt(_fnCoreNormalizeInclusiveIndex(NaN, 5)),
				'Infinity': fmt(_fnCoreNormalizeInclusiveIndex(Infinity, 5)),
			});
		});

		test('_fnCoreNormalizeSliceRange() 不檢查空區間', (t) =>
		{
			t.assert.snapshot({
				'缺省': _fnCoreNormalizeSliceRange(undefined, undefined, 5),
				'[-3, -1)': _fnCoreNormalizeSliceRange(-3, -1, 5),
				'[0, 99)': _fnCoreNormalizeSliceRange(0, 99, 5),
				'[3, 3) 為空但不拋錯': _fnCoreNormalizeSliceRange(3, 3, 5),
				'NaN': _fnCoreNormalizeSliceRange(NaN, undefined, 5),
			});
		});

		test('_fnCoreNormalizeSliceMinMax() 不檢查空陣列', (t) =>
		{
			t.assert.snapshot({
				'缺省': _fnCoreNormalizeSliceMinMax(undefined, undefined, 5),
				'null, null': _fnCoreNormalizeSliceMinMax(null, null, 5),
				'[-2, -1)': _fnCoreNormalizeSliceMinMax(-2, -1, 5),
				'[0, 99)': _fnCoreNormalizeSliceMinMax(0, 99, 5),
			});
		});

		test('_fnCoreResolveTailIndex() 只解析記法、不收窄', (t) =>
		{
			t.assert.snapshot({
				'0': fmt(_fnCoreResolveTailIndex(0, 5)),
				'4': fmt(_fnCoreResolveTailIndex(4, 5)),
				'-1': fmt(_fnCoreResolveTailIndex(-1, 5)),
				'-5': fmt(_fnCoreResolveTailIndex(-5, 5)),
				/**
				 * 收窄才會得到 -1，這裡只解析 → -1，留給上層決定要不要擋
				 * Only narrowing would give -1 after clamping; this resolves to -1 and lets the layer above decide
				 */
				'-6': fmt(_fnCoreResolveTailIndex(-6, 5)),
				'99 不收窄': fmt(_fnCoreResolveTailIndex(99, 5)),
				'NaN': fmt(_fnCoreResolveTailIndex(NaN, 5)),
			});
		});

		test('_fnCoreClamp() / _fnCoreOrderMinMax() 不拋錯', (t) =>
		{
			t.assert.snapshot({
				'clamp(5, 0, 3)': fmt(_fnCoreClamp(5, 0, 3)),
				'clamp(-1, 0, 3)': fmt(_fnCoreClamp(-1, 0, 3)),
				'clamp(1, 3, 0) 上下界反轉不拋錯': fmt(_fnCoreClamp(1, 3, 0)),
				'order(3, 1)': _fnCoreOrderMinMax(3, 1),
				'order(1, 3)': _fnCoreOrderMinMax(1, 3),
				'order(2, 2)': _fnCoreOrderMinMax(2, 2),
			});
		});
	});

	/**
	 * assert 層 / Assert layer
	 *
	 * `assert*` 只做拋錯，可疊在 core 之上或單獨取用。
	 * `assert*` only throws; it stacks on top of a core or stands alone.
	 */
	describe('assert：只拋錯', () =>
	{
		test('assertMinMaxOrder() 拒絕 min > max', (t) =>
		{
			t.assert.snapshot({
				'1 <= 3': outcome(() => _assertMinMaxOrder(1, 3, 'ctx')),
				'3 <= 3': outcome(() => _assertMinMaxOrder(3, 3, 'ctx')),
				'3 > 1': outcome(() => _assertMinMaxOrder(3, 1, 'ctx')),
			});
		});
	});

	describe('slice 風格 normalizeSliceIndex', () =>
	{
		test('正數落在 [0, length]，超出自動收窄', (t) =>
		{
			t.assert.snapshot({
				'0': fmt(_normalizeSliceIndex(0, 5)),
				'3': fmt(_normalizeSliceIndex(3, 5)),
				'5': fmt(_normalizeSliceIndex(5, 5)),
				'99': fmt(_normalizeSliceIndex(99, 5)),
				'99 @ length 0': fmt(_normalizeSliceIndex(99, 0)),
			});
		});

		test('負數從尾部往前算，-1 即最後一個位置', (t) =>
		{
			t.assert.snapshot({
				'-1': fmt(_normalizeSliceIndex(-1, 5)),
				'-2': fmt(_normalizeSliceIndex(-2, 5)),
				'-5': fmt(_normalizeSliceIndex(-5, 5)),
				'-99 停在 0': fmt(_normalizeSliceIndex(-99, 5)),
			});
		});

		test('小數向零取整，-0 統一轉回 +0', (t) =>
		{
			t.assert.snapshot({
				'1.9': fmt(_normalizeSliceIndex(1.9, 5)),
				'4.8': fmt(_normalizeSliceIndex(4.8, 5)),
				/**
				 * ToIntegerOrInfinity() 向零取整：-1.5 → -1 → 4
				 * ToIntegerOrInfinity() truncates toward zero: -1.5 → -1 → 4
				 */
				'-1.5': fmt(_normalizeSliceIndex(-1.5, 5)),
				'-0.5': fmt(_normalizeSliceIndex(-0.5, 5)),
				'-0.5 是 +0': Object.is(_normalizeSliceIndex(-0.5, 5), 0),
			});
		});

		test('NaN / Infinity 不可修正，拋出 TypeError', (t) =>
		{
			t.assert.snapshot({
				'NaN': outcome(() => _normalizeSliceIndex(NaN, 5)),
				'Infinity': outcome(() => _normalizeSliceIndex(Infinity, 5)),
				'-Infinity': outcome(() => _normalizeSliceIndex(-Infinity, 5)),
			});
		});

		test('length 非法時拋出 RangeError / TypeError', (t) =>
		{
			t.assert.snapshot({
				'length -1': outcome(() => _normalizeSliceIndex(0, -1)),
				'length 1.5': outcome(() => _normalizeSliceIndex(0, 1.5)),
			});
		});
	});

	/**
	 * 原子層 / Atomic layer
	 *
	 * 只吃 `length` 與邊界，不依賴任何陣列，也不綁定政策，可按需單獨取用。
	 * Take only a `length` and bounds; they depend on no array and bind no policy,
	 * so each can be used on its own.
	 */
	describe('原子層：只吃 length，不依賴陣列', () =>
	{
		test('normalizeInclusiveIndex() 把含端點邊界收進 [0, length - 1]', (t) =>
		{
			t.assert.snapshot({
				'0': fmt(_normalizeInclusiveIndex(0, 5)),
				'4': fmt(_normalizeInclusiveIndex(4, 5)),
				/**
				 * 含端點的上界是 length - 1，不是 length
				 * The inclusive upper bound is length - 1, not length
				 */
				'5': fmt(_normalizeInclusiveIndex(5, 5)),
				'99': fmt(_normalizeInclusiveIndex(99, 5)),
				'-1': fmt(_normalizeInclusiveIndex(-1, 5)),
				'-2': fmt(_normalizeInclusiveIndex(-2, 5)),
				'-5': fmt(_normalizeInclusiveIndex(-5, 5)),
				'-99': fmt(_normalizeInclusiveIndex(-99, 5)),
			});
		});

		test('normalizeInclusiveIndex() length 非法時拋錯', (t) =>
		{
			t.assert.snapshot({
				'length 0': outcome(() => _normalizeInclusiveIndex(0, 0)),
				'length -1': outcome(() => _normalizeInclusiveIndex(0, -1)),
				'length 1.5': outcome(() => _normalizeInclusiveIndex(0, 1.5)),
			});
		});

		test('normalizeSliceRange() 只吃 length，語意與 array 版一致', (t) =>
		{
			t.assert.snapshot({
				'缺省': outcome(() => _normalizeSliceRange(undefined, undefined, 5)),
				'[-3, -1)': outcome(() => _normalizeSliceRange(-3, -1, 5)),
				'[0, 99)': outcome(() => _normalizeSliceRange(0, 99, 5)),
				/**
				 * 半開區間政策：收窄後為空 → 拋錯
				 * Half-open policy: empty after narrowing → throws
				 */
				'[3, 3)': outcome(() => _normalizeSliceRange(3, 3, 5)),
			});
		});

		test('normalizeSliceMinMax() 只吃 length，補預設值但不碰陣列', (t) =>
		{
			t.assert.snapshot({
				'缺省': outcome(() => _normalizeSliceMinMax(undefined, undefined, 5)),
				'null, null': outcome(() => _normalizeSliceMinMax(null, null, 5)),
				'[-2, -1)': outcome(() => _normalizeSliceMinMax(-2, -1, 5)),
				'[0, 99)': outcome(() => _normalizeSliceMinMax(0, 99, 5)),
			});
		});

		test('兩種政策目標不相容，同一組輸入各自成立', (t) =>
		{
			t.assert.snapshot({
				/**
				 * 半開區間：`[3, 3)` 為空 → 拋錯 / Half-open: `[3, 3)` is empty → throws
				 */
				'normalizeSliceRange(3, 3, 5)': outcome(() => _normalizeSliceRange(3, 3, 5)),
				/**
				 * 含端點：`[3, 3]` 是合法單一值 → 成立 / Inclusive: `[3, 3]` is legal → succeeds
				 */
				'normalizeSliceMinMax(3, 3, 5)': outcome(() => _normalizeSliceMinMax(3, 3, 5)),
			});
		});

		test('原子層組合可取代 array 便利包裝', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			/**
			 * 不經 array 包裝，直接以 length 組合
			 * Compose straight from the length without the array wrapper
			 */
			t.assert.snapshot({
				'range 一致': JSON.stringify(_normalizeSliceRange(0, -1, arr.length)) === JSON.stringify(_normalizeArrayRange(arr, 0, -1)),
				'minMax 一致': JSON.stringify(_normalizeSliceMinMax(null, null, arr.length)) === JSON.stringify(_normalizeArrayIndexMinMax(arr, null, null)),
				'原子 range': _normalizeSliceRange(0, -1, arr.length),
				'原子 minMax': _normalizeSliceMinMax(null, null, arr.length),
			});
		});
	});

	describe('normalizeArrayRange', () =>
	{
		test('缺省時回傳整段 [0, length)', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'缺省': _normalizeArrayRange(arr),
				'null, null': _normalizeArrayRange(arr, null, null),
				'start 1': _normalizeArrayRange(arr, 1),
			});
		});

		test('負數從尾部往前算，等同 slice() 的語意', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				/**
				 * 同 arr.slice(-1) / same as arr.slice(-1)
				 */
				'[-1]': _normalizeArrayRange(arr, -1),
				/**
				 * 同 arr.slice(0, -1) / same as arr.slice(0, -1)
				 */
				'[0, -1)': _normalizeArrayRange(arr, 0, -1),
				/**
				 * 同 arr.slice(-3, -1) / same as arr.slice(-3, -1)
				 */
				'[-3, -1)': _normalizeArrayRange(arr, -3, -1),
				/**
				 * 同 arr.slice(-99) — 停在 0 / same as arr.slice(-99), stops at 0
				 */
				'[-99]': _normalizeArrayRange(arr, -99),
			});
		});

		test('小數向零取整', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'[1.9, 4.8)': _normalizeArrayRange(arr, 1.9, 4.8),
				'[0.5, 1.5)': _normalizeArrayRange(arr, 0.5, 1.5),
			});
		});

		test('超出範圍自動收窄，不直接報錯', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot({
				'[0, 99)': _normalizeArrayRange(arr, 0, 99),
				'[-99, 99)': _normalizeArrayRange(arr, -99, 99),
			});
		});

		test('收窄後為空才拋出 RangeError', (t) =>
		{
			const arr = ['a', 'b', 'c'];
			const arr5 = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'[2, 2)': outcome(() => _normalizeArrayRange(arr, 2, 2)),
				/**
				 * start 99 收窄為 3、end 缺省亦為 3 → 空
				 * start 99 narrows to 3 and the defaulted end is also 3 → empty
				 */
				'[99]': outcome(() => _normalizeArrayRange(arr, 99)),
				'[1, 0)': outcome(() => _normalizeArrayRange(arr, 1, 0)),
				/**
				 * 同 arr.slice(0, -99) 為空 / same as arr.slice(0, -99), which is empty
				 */
				'[0, -99)': outcome(() => _normalizeArrayRange(arr, 0, -99)),
				/**
				 * 5 元素陣列的 arr.slice(-3, 2) → [2, 2) 為空
				 * arr.slice(-3, 2) on a 5-element array → [2, 2), which is empty
				 */
				'arr5 [-3, 2)': outcome(() => _normalizeArrayRange(arr5, -3, 2)),
			});
		});

		test('NaN / Infinity 不可修正，拋出 TypeError', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot({
				'NaN': outcome(() => _normalizeArrayRange(arr, NaN)),
				'end Infinity': outcome(() => _normalizeArrayRange(arr, 0, Infinity)),
				'start -Infinity': outcome(() => _normalizeArrayRange(arr, -Infinity)),
			});
		});

		test('空陣列拋出 RangeError', (t) =>
		{
			t.assert.snapshot({
				'[]': outcome(() => _normalizeArrayRange([])),
			});
		});
	});

	describe('由陣列推導合法索引', () =>
	{
		test('calcArrayIndexRange() 回傳整段 [0, length)', (t) =>
		{
			t.assert.snapshot({
				'[a,b,c]': outcome(() => _calcArrayIndexRange(['a', 'b', 'c'])),
				'[only]': outcome(() => _calcArrayIndexRange(['only'])),
				/**
				 * 空陣列沒有任何合法索引，拋出 RangeError
				 * An empty array has no legal index, so a RangeError is thrown
				 */
				'[]': outcome(() => _calcArrayIndexRange([])),
			});
		});

		test('calcExpectedValuesByArray() 預設涵蓋整段索引', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot(expectedSummary(_calcExpectedValuesByArray(arr)));
		});

		test('calcExpectedValuesByArray() 同步 slice 風格的負值與自動收窄', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd'];

			t.assert.snapshot({
				/**
				 * -1 → 最後一個索引 / -1 → the last index
				 */
				'[-1]': expectedSummary(_calcExpectedValuesByArray(arr, -1)),
				/**
				 * 小數向零取整 / truncate toward zero
				 */
				'[1.5]': expectedSummary(_calcExpectedValuesByArray(arr, 1.5)),
				/**
				 * end 超出長度自動收窄 / an out-of-range end auto-narrows
				 */
				'[0, 99)': expectedSummary(_calcExpectedValuesByArray(arr, 0, 99)),
			});
		});

		test('calcExpectedValuesByArray() 收窄後為空則拋出 RangeError', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd'];

			t.assert.snapshot({
				'[3, 3)': outcome(() => _calcExpectedValuesByArray(arr, 3, 3)),
				'[4, 2)': outcome(() => _calcExpectedValuesByArray(arr, 4, 2)),
				/**
				 * 空陣列拋錯 / an empty array throws
				 */
				'[]': outcome(() => _calcExpectedValuesByArray([], 0, 1)),
			});
		});

		test('calcArraySliceSize() 回傳 slice 長度', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'缺省': outcome(() => _calcArraySliceSize(arr)),
				'[-1]': outcome(() => _calcArraySliceSize(arr, -1)),
				'[0, -1)': outcome(() => _calcArraySliceSize(arr, 0, -1)),
				'[-3, -1)': outcome(() => _calcArraySliceSize(arr, -3, -1)),
				'[2, 99)': outcome(() => _calcArraySliceSize(arr, 2, 99)),
				'[99]': outcome(() => _calcArraySliceSize(arr, 99)),
			});
		});
	});

	describe('min / max（以 array 為基礎）', () =>
	{
		test('calcArrayIndexMinMax() 回傳 [0, length - 1]', (t) =>
		{
			t.assert.snapshot({
				'[a,b,c]': outcome(() => _calcArrayIndexMinMax(['a', 'b', 'c'])),
				'[only]': outcome(() => _calcArrayIndexMinMax(['only'])),
				'[]': outcome(() => _calcArrayIndexMinMax([])),
			});
		});

		test('assertArrayIndexMinMax() 未輸入 min / max 時以整段陣列補值', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'缺省': outcome(() => _assertArrayIndexMinMax(arr)),
				'null, null': outcome(() => _assertArrayIndexMinMax(arr, null, null)),
				'min 1': outcome(() => _assertArrayIndexMinMax(arr, 1)),
				'max 2': outcome(() => _assertArrayIndexMinMax(arr, undefined, 2)),
				'[2, 2]': outcome(() => _assertArrayIndexMinMax(arr, 2, 2)),
			});
		});

		test('assertArrayIndexMinMax() 接受負數（從尾部往前算）', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'[-1, -1]': outcome(() => _assertArrayIndexMinMax(arr, -1, -1)),
				'[-2, -1]': outcome(() => _assertArrayIndexMinMax(arr, -2, -1)),
				'[-5, -1]': outcome(() => _assertArrayIndexMinMax(arr, -5, -1)),
			});
		});

		test('assertArrayIndexMinMax() 不做收窄：越界拋出 RangeError', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot({
				'[0, 9]': outcome(() => _assertArrayIndexMinMax(arr, 0, 9)),
				'min 9': outcome(() => _assertArrayIndexMinMax(arr, 9)),
				/**
				 * -6 超出尾部 / -6 runs past the tail
				 */
				'min -6': outcome(() => _assertArrayIndexMinMax(arr, -6)),
			});
		});

		test('assertArrayIndexMinMax() 不做交換：min > max 拋出 RangeError', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'[3, 1]': outcome(() => _assertArrayIndexMinMax(arr, 3, 1)),
			});
		});

		test('assertArrayIndexMinMax() 非整數拋出 TypeError', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot({
				'min 1.5': outcome(() => _assertArrayIndexMinMax(arr, 1.5)),
				'max 1.5': outcome(() => _assertArrayIndexMinMax(arr, 0, 1.5)),
			});
		});

		test('normalizeArrayIndexMinMax() 未輸入時以整段陣列補值', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'缺省': outcome(() => _normalizeArrayIndexMinMax(arr)),
				'null, null': outcome(() => _normalizeArrayIndexMinMax(arr, null, null)),
				'max 2': outcome(() => _normalizeArrayIndexMinMax(arr, undefined, 2)),
			});
		});

		test('normalizeArrayIndexMinMax() 負數從尾部往前算', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'[-1, -1]': outcome(() => _normalizeArrayIndexMinMax(arr, -1, -1)),
				'[-2, -1]': outcome(() => _normalizeArrayIndexMinMax(arr, -2, -1)),
				/**
				 * 超過尾部長度停在 0 / beyond the tail it stops at 0
				 */
				'[-99]': outcome(() => _normalizeArrayIndexMinMax(arr, -99)),
			});
		});

		test('normalizeArrayIndexMinMax() 越界自動收窄到 [0, length - 1]', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot({
				'[0, 99]': outcome(() => _normalizeArrayIndexMinMax(arr, 0, 99)),
				'[99, 99]': outcome(() => _normalizeArrayIndexMinMax(arr, 99, 99)),
				'[-99, 99]': outcome(() => _normalizeArrayIndexMinMax(arr, -99, 99)),
			});
		});

		test('normalizeArrayIndexMinMax() min > max 時交換兩者', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot({
				'[4, 1]': outcome(() => _normalizeArrayIndexMinMax(arr, 4, 1)),
				'[-1, -3]': outcome(() => _normalizeArrayIndexMinMax(arr, -1, -3)),
			});
		});

		test('normalizeArrayIndexMinMax() NaN / Infinity 拋出 TypeError', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot({
				'NaN': outcome(() => _normalizeArrayIndexMinMax(arr, NaN)),
				'max Infinity': outcome(() => _normalizeArrayIndexMinMax(arr, 0, Infinity)),
				'min -Infinity': outcome(() => _normalizeArrayIndexMinMax(arr, -Infinity)),
			});
		});

		test('normalizeArrayIndexMinMax() 空陣列拋出 RangeError', (t) =>
		{
			t.assert.snapshot({
				'[]': outcome(() => _normalizeArrayIndexMinMax([])),
			});
		});
	});

	describe('calcExpectedValuesByArrayMinMax', () =>
	{
		test('未輸入 min / max 時等同取整段陣列索引', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot(expectedSummary(_calcExpectedValuesByArrayMinMax(arr)));
		});

		test('含端點 [min, max] 轉成半開區間 [min, max + 1)', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot(expectedSummary(_calcExpectedValuesByArrayMinMax(arr, 1, 3)));
		});

		test('負數 min / max 從尾部往前算', (t) =>
		{
			const arr = ['a', 'b', 'c', 'd', 'e'];

			t.assert.snapshot(expectedSummary(_calcExpectedValuesByArrayMinMax(arr, -3, -1)));
		});

		test('單一值區間 min === max', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot(expectedSummary(_calcExpectedValuesByArrayMinMax(arr, 2, 2)));
		});

		test('越界自動收窄後仍可取值', (t) =>
		{
			const arr = ['a', 'b', 'c'];

			t.assert.snapshot(expectedSummary(_calcExpectedValuesByArrayMinMax(arr, 0, 999)));
		});

		test('空陣列拋出 RangeError', (t) =>
		{
			t.assert.snapshot({
				'[]': outcome(() => _calcExpectedValuesByArrayMinMax([])),
			});
		});
	});

	describe('min / max 大小值驗證（無陣列基礎）', () =>
	{
		test('assertMinMax() 接受 min === max 與負數', (t) =>
		{
			t.assert.snapshot({
				'[2, 2]': outcome(() => _assertMinMax(2, 2)),
				'[0, 0]': outcome(() => _assertMinMax(0, 0)),
				'[-5, -1]': outcome(() => _assertMinMax(-5, -1)),
				'[-5, 0]': outcome(() => _assertMinMax(-5, 0)),
				'[-1, 5]': outcome(() => _assertMinMax(-1, 5)),
				'[MIN_SAFE, MAX_SAFE]': outcome(() => _assertMinMax(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)),
			});
		});

		test('assertMinMax() min > max 拋出 RangeError', (t) =>
		{
			t.assert.snapshot({
				'[3, 1]': outcome(() => _assertMinMax(3, 1)),
				'[0, -1]': outcome(() => _assertMinMax(0, -1)),
				'[-1, -2]': outcome(() => _assertMinMax(-1, -2)),
			});
		});

		test('assertMinMax() 非整數與越界拋錯', (t) =>
		{
			t.assert.snapshot({
				'[1.5, 3]': outcome(() => _assertMinMax(1.5, 3)),
				'[1, 3.5]': outcome(() => _assertMinMax(1, 3.5)),
				'[0, MAX+1]': outcome(() => _assertMinMax(0, Number.MAX_SAFE_INTEGER + 1)),
				'[MIN-1, 0]': outcome(() => _assertMinMax(Number.MIN_SAFE_INTEGER - 1, 0)),
			});
		});
	});

	describe('min / max 大小值修正', () =>
	{
		test('normalizeMinMax() min > max 時交換兩者', (t) =>
		{
			t.assert.snapshot({
				'[3, 1]': outcome(() => _normalizeMinMax(3, 1)),
				'[0, -5]': outcome(() => _normalizeMinMax(0, -5)),
				'[-1, -5]': outcome(() => _normalizeMinMax(-1, -5)),
				'[1, 3] 順序正確': outcome(() => _normalizeMinMax(1, 3)),
				'[2, 2]': outcome(() => _normalizeMinMax(2, 2)),
				'[-5, -1]': outcome(() => _normalizeMinMax(-5, -1)),
			});
		});

		test('normalizeMinMax() 修正後仍滿足 min <= max', (t) =>
		{
			const pair = _normalizeMinMax(7, 2);

			t.assert.snapshot({
				pair,
				'min <= max': pair.min <= pair.max,
			});
		});

		test('normalizeMinMax() 不修正非整數，仍拋出 TypeError', (t) =>
		{
			t.assert.snapshot({
				'[3.5, 1]': outcome(() => _normalizeMinMax(3.5, 1)),
				'[3, 1.5]': outcome(() => _normalizeMinMax(3, 1.5)),
			});
		});
	});

	describe('大小值修正 clamp', () =>
	{
		test('clampValue() 把值夾進 [min, max]', (t) =>
		{
			t.assert.snapshot({
				'clamp(5, 0, 3)': outcome(() => _clampValue(5, 0, 3)),
				'clamp(-1, 0, 3)': outcome(() => _clampValue(-1, 0, 3)),
				'clamp(2, 0, 3)': outcome(() => _clampValue(2, 0, 3)),
				'clamp(0, 0, 3)': outcome(() => _clampValue(0, 0, 3)),
				'clamp(3, 0, 3)': outcome(() => _clampValue(3, 0, 3)),
			});
		});

		test('clampValue() 支援負數區間與浮點數', (t) =>
		{
			t.assert.snapshot({
				'clamp(-9, -5, -1)': outcome(() => _clampValue(-9, -5, -1)),
				'clamp(0, -5, -1)': outcome(() => _clampValue(0, -5, -1)),
				'clamp(-3, -5, -1)': outcome(() => _clampValue(-3, -5, -1)),
				'clamp(4.5, 0, 3)': outcome(() => _clampValue(4.5, 0, 3)),
				'clamp(-0.5, 0, 3)': outcome(() => _clampValue(-0.5, 0, 3)),
				'clamp(1.25, 0, 3)': outcome(() => _clampValue(1.25, 0, 3)),
				'clamp(1, 3, 0) 上下界反轉': outcome(() => _clampValue(1, 3, 0)),
			});
		});

		test('clampSize() 大小值修正', (t) =>
		{
			t.assert.snapshot({
				/**
				 * 需求超過可用上限時縮小規模 / an oversized request shrinks to fit
				 */
				'clampSize(10, 5)': outcome(() => _clampSize(10, 5)),
				'clampSize(6, 5)': outcome(() => _clampSize(6, 5)),
				'clampSize(5, 5)': outcome(() => _clampSize(5, 5)),
				/**
				 * 負數需求歸零 / a negative request becomes 0
				 */
				'clampSize(-1, 5)': outcome(() => _clampSize(-1, 5)),
				'clampSize(-99, 5)': outcome(() => _clampSize(-99, 5)),
				'clampSize(0, 5)': outcome(() => _clampSize(0, 5)),
				/**
				 * 可用上限為 0（空陣列）時一律歸零 / ceiling 0 (empty array) always clamps to 0
				 */
				'clampSize(3, 0)': outcome(() => _clampSize(3, 0)),
				'clampSize(0, 0)': outcome(() => _clampSize(0, 0)),
				'clampSize(1.5, 5)': outcome(() => _clampSize(1.5, 5)),
				'clampSize(3, 2.5)': outcome(() => _clampSize(3, 2.5)),
			});
		});
	});

	describe('size 驗證', () =>
	{
		test('assertSize() 必須是 >= 1 的整數', (t) =>
		{
			t.assert.snapshot({
				'1': outcome(() => _assertSize(1)),
				'3': outcome(() => _assertSize(3)),
				'MAX_SAFE_INTEGER': outcome(() => _assertSize(Number.MAX_SAFE_INTEGER)),
				'0': outcome(() => _assertSize(0)),
				'-1': outcome(() => _assertSize(-1)),
				'2.5': outcome(() => _assertSize(2.5)),
			});
		});

		test('assertSizeInRange() size 必須落在 [1, max]', (t) =>
		{
			t.assert.snapshot({
				'[1, 5]': outcome(() => _assertSizeInRange(1, 5)),
				'[5, 5]': outcome(() => _assertSizeInRange(5, 5)),
				'[6, 5]': outcome(() => _assertSizeInRange(6, 5)),
				'[0, 5]': outcome(() => _assertSizeInRange(0, 5)),
				/**
				 * 可用上限不足（空陣列）時拋出明確的 RangeError
				 * ceiling too low (empty array) throws a clearer RangeError
				 */
				'[1, 0]': outcome(() => _assertSizeInRange(1, 0)),
				'[3, 0]': outcome(() => _assertSizeInRange(3, 0)),
				'[1, 2.5]': outcome(() => _assertSizeInRange(1, 2.5)),
			});
		});
	});

	describe('calcExpectedValuesByMinMax（無陣列基礎）', () =>
	{
		test('含端點語意：[min, max] 轉成半開區間 [min, max + 1)', (t) =>
		{
			t.assert.snapshot({
				'[1, 5]': expectedSummary(_calcExpectedValuesByMinMax(1, 5)),
				'[-5, -1] 負數': expectedSummary(_calcExpectedValuesByMinMax(-5, -1)),
				'[-2, 2] 跨 0': expectedSummary(_calcExpectedValuesByMinMax(-2, 2)),
				'[3, 3] 單一值': expectedSummary(_calcExpectedValuesByMinMax(3, 3)),
			});
		});

		test('min > max 拋出 RangeError', (t) =>
		{
			t.assert.snapshot({
				'[5, 1]': outcome(() => _calcExpectedValuesByMinMax(5, 1)),
			});
		});

		test('max 為 SAFE_INTEGER_MAX 時 max + 1 溢位，拋出 RangeError', (t) =>
		{
			t.assert.snapshot({
				'[0, MAX_SAFE_INTEGER]': outcome(() => _calcExpectedValuesByMinMax(0, Number.MAX_SAFE_INTEGER)),
			});
		});
	});
});
