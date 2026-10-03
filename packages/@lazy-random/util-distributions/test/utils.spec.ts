//@noUnusedParameters:false
/// <reference types="node" />

/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 針對 `src/utils.ts` 的核心驗證與計算函式的單元測試
 * Unit tests for the core validation and calculation functions in `src/utils.ts`
 *
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/utils.spec.ts`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
	type IExpectedValues,
	MAX_LENGTH,
	MIN_LENGTH,
	SAFE_INTEGER_MAX,
	SAFE_INTEGER_MIN,
	assertInRange,
	assertIntegerInRange,
	assertLengthParams,
	assertRangeParams,
	calcExpectedValues,
	calcExpectedValuesByLength,
	calcExpectedValuesByRange,
	calcRangeSize,
	createValuesValidator,
	isInRange,
	rangeValues,
} from '../src/utils';

/**
 * 收集生成器的全部產出 / Collect every value produced by a generator
 */
function toArray(generator: Generator<number>): number[]
{
	return [...generator];
}

describe('utils', () =>
{
	describe('isInRange', () =>
	{
		test('start 為含 (inclusive)、end 為不含 (exclusive)', () =>
		{
			assert.equal(isInRange(0, 0, 5), true);
			assert.equal(isInRange(4, 0, 5), true);
			assert.equal(isInRange(5, 0, 5), false);
			assert.equal(isInRange(-1, 0, 5), false);
		});

		test('支援負數與非零下界', () =>
		{
			assert.equal(isInRange(-2, -3, 3), true);
			assert.equal(isInRange(-3, -3, 3), true);
			assert.equal(isInRange(-4, -3, 3), false);
			assert.equal(isInRange(4.9, 0, 5), true);
		});

		test('空區間內沒有任何合法值', () =>
		{
			assert.equal(isInRange(3, 3, 3), false);
		});
	});

	describe('assertInRange', () =>
	{
		test('合法時回傳該值以便串接', () =>
		{
			assert.equal(assertInRange(3, 0, 5), 3);
		});

		test('不合法時拋出 RangeError，訊息含標籤、名稱與區間', () =>
		{
			assert.throws(() => assertInRange(5, 0, 5, 'len', 'myLabel'), (error) =>
			{
				assert.ok(error instanceof RangeError);
				assert.match(error.message, /\[myLabel\]/);
				assert.match(error.message, /len=5/);
				assert.match(error.message, /\[0, 5\)/);
				return true;
			});
		});

		test('使用預設標籤與參數名稱', () =>
		{
			assert.throws(() => assertInRange(-1, 0, 5), (error) =>
			{
				assert.ok(error instanceof RangeError);
				assert.match(error.message, /\[assertInRange\]/);
				assert.match(error.message, /value=-1/);
				return true;
			});
		});
	});

	describe('assertIntegerInRange', () =>
	{
		test('閉區間 [min, max] 兩端皆可通過', () =>
		{
			assert.equal(assertIntegerInRange(0, 0, 10, 'n', 'ctx'), 0);
			assert.equal(assertIntegerInRange(10, 0, 10, 'n', 'ctx'), 10);
			assert.equal(assertIntegerInRange(5, 0, 10, 'n', 'ctx'), 5);
		});

		test('非整數拋出 TypeError', () =>
		{
			assert.throws(() => assertIntegerInRange(1.5, 0, 10, 'n', 'ctx'), (error) =>
			{
				assert.ok(error instanceof TypeError);
				assert.match(error.message, /\[ctx\]/);
				assert.match(error.message, /n=1.5/);
				return true;
			});
		});

		test('超出閉區間拋出 RangeError', () =>
		{
			assert.throws(() => assertIntegerInRange(-1, 0, 10, 'n', 'ctx'), RangeError);
			assert.throws(() => assertIntegerInRange(11, 0, 10, 'n', 'ctx'), RangeError);
		});

		test('常數邊界可通過', () =>
		{
			assert.equal(assertIntegerInRange(SAFE_INTEGER_MIN, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'n', 'ctx'), SAFE_INTEGER_MIN);
			assert.equal(assertIntegerInRange(SAFE_INTEGER_MAX, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'n', 'ctx'), SAFE_INTEGER_MAX);
		});
	});

	describe('assertLengthParams', () =>
	{
		test('MIN_LENGTH 與 MAX_LENGTH 皆合法', () =>
		{
			assert.equal(assertLengthParams(MIN_LENGTH), MIN_LENGTH);
			assert.equal(assertLengthParams(MAX_LENGTH), MAX_LENGTH);
			assert.equal(assertLengthParams(5), 5);
		});

		test('len 為 0 或負數時拋出 RangeError', () =>
		{
			assert.throws(() => assertLengthParams(0), RangeError);
			assert.throws(() => assertLengthParams(-1), RangeError);
		});

		test('len 非整數時拋出 TypeError', () =>
		{
			assert.throws(() => assertLengthParams(2.5), TypeError);
		});

		test('自訂標籤會出現在錯誤訊息中', () =>
		{
			assert.throws(() => assertLengthParams(0, 'myLabel'), (error) =>
			{
				assert.ok(error instanceof RangeError);
				assert.match(error.message, /\[myLabel\]/);
				return true;
			});
		});
	});

	describe('assertRangeParams', () =>
	{
		test('回傳已驗證的區間', () =>
		{
			assert.deepEqual(assertRangeParams(2, 5), { start: 2, end: 5 });
			assert.deepEqual(assertRangeParams(-3, 3), { start: -3, end: 3 });
		});

		test('start === end 表示空區間，拋出 RangeError', () =>
		{
			assert.throws(() => assertRangeParams(5, 5), (error) =>
			{
				assert.ok(error instanceof RangeError);
				assert.match(error.message, /range must not be empty/);
				return true;
			});
		});

		test('start > end 拋出 RangeError', () =>
		{
			assert.throws(() => assertRangeParams(6, 5), RangeError);
		});

		test('start / end 非整數拋出 TypeError', () =>
		{
			assert.throws(() => assertRangeParams(1.5, 5), TypeError);
			assert.throws(() => assertRangeParams(1, 5.5), TypeError);
		});

		test('超出安全整數範圍拋出 RangeError', () =>
		{
			assert.throws(() => assertRangeParams(0, SAFE_INTEGER_MAX + 1), (error) =>
			{
				assert.ok(error instanceof RangeError);
				assert.match(error.message, /parameter out of range/);
				return true;
			});
		});

		test('自訂標籤會出現在錯誤訊息中', () =>
		{
			assert.throws(() => assertRangeParams(5, 5, 'myLabel'), /\[myLabel\]/);
		});
	});

	describe('calcRangeSize', () =>
	{
		test('以 end - start 直接計算，不需列舉', () =>
		{
			assert.equal(calcRangeSize(0, 5), 5);
			assert.equal(calcRangeSize(2, 5), 3);
			assert.equal(calcRangeSize(3, 3), 0);
		});
	});

	describe('rangeValues', () =>
	{
		test('回傳生成器，並依序產出半開區間內的整數', () =>
		{
			const generator = rangeValues(0, 4);

			assert.equal(typeof generator.next, 'function');
			assert.equal(generator[Symbol.toStringTag], 'Generator');
			assert.equal(Array.isArray(generator), false);

			assert.deepEqual(toArray(rangeValues(0, 4)), [0, 1, 2, 3]);
			assert.deepEqual(toArray(rangeValues(1, 5)), [1, 2, 3, 4]);
			assert.deepEqual(toArray(rangeValues(-2, 2)), [-2, -1, 0, 1]);
		});

		test('空區間不產出任何值', () =>
		{
			assert.deepEqual(toArray(rangeValues(3, 3)), []);
		});

		test('產出數量與 calcRangeSize 一致', () =>
		{
			assert.equal(toArray(rangeValues(2, 9)).length, calcRangeSize(2, 9));
		});
	});

	describe('calcExpectedValues', () =>
	{
		test('記錄合法參數值、合法值區間與其數量', () =>
		{
			const expected = calcExpectedValues(1, 4, { foo: 2 });

			assert.deepEqual(expected.params, { foo: 2 });
			assert.deepEqual(expected.range, { start: 1, end: 4 });
			assert.equal(expected.size, 3);
			assert.deepEqual(toArray(expected.valuesGenerator()), [1, 2, 3]);
		});

		test('未提供 params 時為空物件', () =>
		{
			assert.deepEqual(calcExpectedValues(0, 2).params, {});
		});

		test('params 以副本儲存，外部事後變更不影響結果', () =>
		{
			const params = { a: 1 };
			const expected = calcExpectedValues(0, 2, params);

			params.a = 9;

			assert.deepEqual(expected.params, { a: 1 });
		});

		test('參數不合法時拋錯，不產生結果', () =>
		{
			assert.throws(() => calcExpectedValues(5, 5), RangeError);
			assert.throws(() => calcExpectedValues(5, 5, undefined, 'myLabel'), /\[myLabel\]/);
		});

		test('values() 是可重複列舉的生成器工廠', () =>
		{
			const expected = calcExpectedValues(0, 3);

			const first = expected.valuesGenerator();
			assert.deepEqual(toArray(first), [0, 1, 2]);

			// 第一個生成器已耗盡，仍可重新取得完整清單
			// The first generator is exhausted, yet a full list can still be obtained again
			assert.deepEqual(toArray(first), []);
			assert.deepEqual(toArray(expected.valuesGenerator()), [0, 1, 2]);
		});
	});

	describe('calcExpectedValuesByLength', () =>
	{
		test('randIndex(len) 的合法值為半開區間 [0, len)', () =>
		{
			const expected = calcExpectedValuesByLength(5);

			assert.deepEqual(expected.params, { len: 5 });
			assert.deepEqual(expected.range, { start: 0, end: 5 });
			assert.equal(expected.size, 5);
			assert.deepEqual(toArray(expected.valuesGenerator()), [0, 1, 2, 3, 4]);
		});

		test('size 與列舉數量一致', () =>
		{
			const expected = calcExpectedValuesByLength(3);

			assert.equal(expected.size, toArray(expected.valuesGenerator()).length);
		});

		test('len 不合法時拋錯', () =>
		{
			assert.throws(() => calcExpectedValuesByLength(0), RangeError);
			assert.throws(() => calcExpectedValuesByLength(-1), RangeError);
			assert.throws(() => calcExpectedValuesByLength(1.5), TypeError);
			assert.throws(() => calcExpectedValuesByLength(0), /\[calcExpectedValuesByLength\]/);
		});
	});

	describe('calcExpectedValuesByRange', () =>
	{
		test('randIndexWithRange(start, end) 的合法值為半開區間 [start, end)', () =>
		{
			const expected = calcExpectedValuesByRange(1, 5);

			assert.deepEqual(expected.params, { start: 1, end: 5 });
			assert.deepEqual(expected.range, { start: 1, end: 5 });
			assert.equal(expected.size, 4);
			assert.deepEqual(toArray(expected.valuesGenerator()), [1, 2, 3, 4]);
		});

		test('支援起訖為 0 的區間', () =>
		{
			const expected = calcExpectedValuesByRange(0, 4);

			assert.equal(expected.size, 4);
			assert.deepEqual(toArray(expected.valuesGenerator()), [0, 1, 2, 3]);
		});

		test('支援單一值的區間', () =>
		{
			const expected = calcExpectedValuesByRange(4, 5);

			assert.equal(expected.size, 1);
			assert.deepEqual(toArray(expected.valuesGenerator()), [4]);
		});

		test('空區間拋出 RangeError', () =>
		{
			assert.throws(() => calcExpectedValuesByRange(5, 5), RangeError);
			assert.throws(() => calcExpectedValuesByRange(5, 5), /\[calcExpectedValuesByRange\]/);
		});
	});

	describe('createValuesValidator', () =>
	{
		test('初始 size 為 0、total 為 0', () =>
		{
			const validator = createValuesValidator(calcExpectedValuesByRange(1, 5), 'demo');

			assert.equal(validator.label, 'demo');
			assert.equal(validator.size, 0);
			assert.equal(validator.total, 0);
			assert.deepEqual(toArray(validator.seenValuesGenerator()), []);
			assert.deepEqual(toArray(validator.missingValuesGenerator()), [1, 2, 3, 4]);
			assert.deepEqual(toArray(validator.illegalValuesGenerator()), []);
		});

		test('check() 回傳該值，並累計 total 與去重後的 size', () =>
		{
			const validator = createValuesValidator(calcExpectedValuesByRange(1, 5), 'demo');

			assert.equal(validator.check(1), 1);
			validator.check(1);
			assert.equal(validator.total, 2);
			assert.equal(validator.size, 1);

			validator.check(2);
			assert.equal(validator.total, 3);
			assert.equal(validator.size, 2);
		});

		test('seenValues() 依合法值由小到大列舉，missingValues() 互補', () =>
		{
			const validator = createValuesValidator(calcExpectedValuesByRange(1, 5), 'demo');

			validator.check(3);
			validator.check(1);

			assert.deepEqual(toArray(validator.seenValuesGenerator()), [1, 3]);
			assert.deepEqual(toArray(validator.missingValuesGenerator()), [2, 4]);
		});

		test('全部出現過時 verifyAllSeen() 不拋錯', () =>
		{
			const validator = createValuesValidator(calcExpectedValuesByRange(1, 5), 'demo');

			[1, 2, 3, 4].forEach((value) => validator.check(value));

			assert.doesNotThrow(() => validator.verifyAllSeen());
			assert.deepEqual(toArray(validator.missingValuesGenerator()), []);
			assert.equal(validator.size, 4);
		});

		test('有遺漏時 verifyAllSeen() 拋出 RangeError 並列出遺漏值', () =>
		{
			const validator = createValuesValidator(calcExpectedValuesByRange(1, 5), 'demo');

			validator.check(1);
			validator.check(4);

			assert.throws(() => validator.verifyAllSeen(), (error) =>
			{
				assert.ok(error instanceof RangeError);
				assert.match(error.message, /\[demo\]/);
				assert.match(error.message, /2, 3/);
				return true;
			});
		});

		test('出現非法值時先記錄再拋出 RangeError', () =>
		{
			const validator = createValuesValidator(calcExpectedValuesByRange(1, 5), 'demo');

			validator.check(1);

			assert.throws(() => validator.check(5), (error) =>
			{
				assert.ok(error instanceof RangeError);
				assert.match(error.message, /\[demo\]/);
				assert.match(error.message, /\[1, 5\)/);
				return true;
			});

			assert.deepEqual(toArray(validator.illegalValuesGenerator()), [5]);
		});

		test('非法值會中斷迴圈，無需跑完 testLimit', () =>
		{
			const validator = createValuesValidator(calcExpectedValuesByRange(1, 5), 'demo');
			const testLimit = 1000;
			let iterations = 0;

			assert.throws(() =>
			{
				for (let i = 0; i < testLimit; i++)
				{
					iterations++;
					validator.check(99);
				}
			}, RangeError);

			assert.equal(iterations, 1);
			assert.equal(validator.total, 1);
		});

		test('不同值數量超過合法值數量時拋出 RangeError', () =>
		{
			// 以刻意縮小的 size 建立描述，用來驗證 size 上限的防禦性檢查
			// Build a description with a deliberately smaller `size` to exercise the defensive size-cap check
			const expected: IExpectedValues = {
				params: {},
				range: { start: 0, end: 3 },
				size: 1,
				valuesGenerator()
				{
					return rangeValues(0, 3);
				},
			};

			const validator = createValuesValidator(expected, 'guard');

			validator.check(0);

			assert.throws(() => validator.check(1), (error) =>
			{
				assert.ok(error instanceof RangeError);
				assert.match(error.message, /\[guard\]/);
				assert.match(error.message, /2 > 1/);
				return true;
			});
		});

		test('非法值不會進入 seen，因此正常流程下 size 不會超過 expected.size', () =>
		{
			const expected = calcExpectedValuesByRange(1, 5);
			const validator = createValuesValidator(expected, 'demo');

			[1, 2, 3, 4, 1, 2].forEach((value) => validator.check(value));

			assert.equal(validator.size, expected.size);
			assert.deepEqual(toArray(validator.missingValuesGenerator()), []);
			assert.doesNotThrow(() => validator.verifyAllSeen());
		});
	});
});
