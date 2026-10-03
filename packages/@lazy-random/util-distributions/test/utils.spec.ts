//@noUnusedParameters:false
/// <reference types="node" />

/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 針對 `src/utils.ts` 的核心驗證與計算函式的單元測試，**以快照為主**
 * Unit tests for the core validation and calculation functions in `src/utils.ts`,
 * **snapshot-driven**
 *
 * 每個測試把「回傳值」與「拋出的錯誤」都轉成字串後一次快照，
 * 這樣成功與失敗的行為都會被記錄在同一份快照裡。
 * Each test turns both return values and thrown errors into strings and snapshots
 * them together, so passing and failing behaviour are recorded in one place.
 *
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/utils.spec.ts`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { fixZero } from 'num-is-zero';
import {
	type IValuesValidator,
	_fnCoreToInteger,
	_assertFiniteNumber,
	_assertInRange,
	_assertInteger,
	_assertIntegerInRange,
	_assertLengthParams,
	_assertRangeParams,
	_calcExpectedValues,
	_calcExpectedValuesByLength,
	_calcExpectedValuesByRange,
	_calcRangeSize,
	_createValuesValidator,
	_isFiniteNumber,
	_isInRange,
	_isIntegerInRange,
	_rangeValues,
} from '../src/utils';
import { fmt, outcome, toArray } from './snapshot-helpers';

/**
 * 驗證器狀態的快照摘要 / Snapshot summary of a validator's state */
function validatorState(validator: IValuesValidator)
{
	return {
		label: validator.label,
		size: validator.size,
		total: validator.total,
		seen: toArray(validator.seenValuesGenerator()),
		missing: toArray(validator.missingValuesGenerator()),
		illegal: toArray(validator.illegalValuesGenerator()),
		verifyAllSeen: outcome(() => validator.verifyAllSeen()),
	};
}

describe('utils', () =>
{
	describe('_fnCore：標準化不拋錯', () =>
	{
		test('fixZero()（num-is-zero）把 -0 轉回 +0', (t) =>
		{
			t.assert.snapshot({
				'-0': fmt(fixZero(-0)),
				'0': fmt(fixZero(0)),
				'1': fmt(fixZero(1)),
				'-1': fmt(fixZero(-1)),
				'NaN': fmt(fixZero(NaN)),
				'Infinity': fmt(fixZero(Infinity)),
				'-0 是 +0': Object.is(fixZero(-0), 0),
			});
		});

		test('_fnCoreToInteger()', (t) =>
		{
			t.assert.snapshot({
				'1.9': fmt(_fnCoreToInteger(1.9)),
				'4.8': fmt(_fnCoreToInteger(4.8)),
				'-0.5': fmt(_fnCoreToInteger(-0.5)),
				'-1.5': fmt(_fnCoreToInteger(-1.5)),
				'0': fmt(_fnCoreToInteger(0)),
				'-0': fmt(_fnCoreToInteger(-0)),
				'NaN': fmt(_fnCoreToInteger(NaN)),
				'Infinity': fmt(_fnCoreToInteger(Infinity)),
				'-Infinity': fmt(_fnCoreToInteger(-Infinity)),
				'-0.5 是 +0': Object.is(_fnCoreToInteger(-0.5), 0),
			});
		});
	});

	describe('is* 與 assert* 各自可單獨取用', () =>
	{
		test('isFiniteNumber() 不拋錯', (t) =>
		{
			t.assert.snapshot({
				'0': _isFiniteNumber(0),
				'1.5': _isFiniteNumber(1.5),
				'-9': _isFiniteNumber(-9),
				'NaN': _isFiniteNumber(NaN),
				'Infinity': _isFiniteNumber(Infinity),
				'-Infinity': _isFiniteNumber(-Infinity),
				'"1"': _isFiniteNumber('1'),
				'null': _isFiniteNumber(null),
				'undefined': _isFiniteNumber(undefined),
			});
		});

		test('assertFiniteNumber() 只拋錯，不做標準化', (t) =>
		{
			t.assert.snapshot({
				'0': outcome(() => _assertFiniteNumber(0)),
				'1.5': outcome(() => _assertFiniteNumber(1.5)),
				'-9': outcome(() => _assertFiniteNumber(-9)),
				'NaN': outcome(() => _assertFiniteNumber(NaN)),
				'Infinity': outcome(() => _assertFiniteNumber(Infinity)),
				'-Infinity': outcome(() => _assertFiniteNumber(-Infinity)),
				'undefined': outcome(() => _assertFiniteNumber(undefined)),
				'自訂標籤': outcome(() => _assertFiniteNumber(NaN, 'n', 'myLabel')),
			});
		});

		test('isIntegerInRange() 不拋錯', (t) =>
		{
			t.assert.snapshot({
				'0 in [0, 10]': _isIntegerInRange(0, 0, 10),
				'10 in [0, 10]': _isIntegerInRange(10, 0, 10),
				'-1 in [0, 10]': _isIntegerInRange(-1, 0, 10),
				'11 in [0, 10]': _isIntegerInRange(11, 0, 10),
				'1.5 in [0, 10]': _isIntegerInRange(1.5, 0, 10),
				'NaN in [0, 10]': _isIntegerInRange(NaN, 0, 10),
				'3 in [5, 2]': _isIntegerInRange(3, 5, 2),
			});
		});

		test('assertInteger() 只負責型別拋錯', (t) =>
		{
			t.assert.snapshot({
				'3': outcome(() => _assertInteger(3)),
				'1.5': outcome(() => _assertInteger(1.5)),
				'NaN': outcome(() => _assertInteger(NaN)),
				'Infinity': outcome(() => _assertInteger(Infinity)),
				'自訂標籤': outcome(() => _assertInteger(1.5, 'n', 'myLabel')),
			});
		});

		test('assertIntegerInRange() = assertInteger + 範圍檢查', (t) =>
		{
			t.assert.snapshot({
				'0 in [0, 10]': outcome(() => _assertIntegerInRange(0, 0, 10, 'n', 'ctx')),
				'10 in [0, 10]': outcome(() => _assertIntegerInRange(10, 0, 10, 'n', 'ctx')),
				'-1 in [0, 10]': outcome(() => _assertIntegerInRange(-1, 0, 10, 'n', 'ctx')),
				'11 in [0, 10]': outcome(() => _assertIntegerInRange(11, 0, 10, 'n', 'ctx')),
				'1.5 in [0, 10]': outcome(() => _assertIntegerInRange(1.5, 0, 10, 'n', 'ctx')),
				'NaN in [0, 10]': outcome(() => _assertIntegerInRange(NaN, 0, 10, 'n', 'ctx')),
				'SAFE_INTEGER_MIN': outcome(() => _assertIntegerInRange(-Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 'n', 'ctx')),
				'SAFE_INTEGER_MAX': outcome(() => _assertIntegerInRange(Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 'n', 'ctx')),
			});
		});

		test('isInRange() 不拋錯', (t) =>
		{
			t.assert.snapshot({
				'0 in [0, 5)': _isInRange(0, 0, 5),
				'4 in [0, 5)': _isInRange(4, 0, 5),
				'5 in [0, 5)': _isInRange(5, 0, 5),
				'-1 in [0, 5)': _isInRange(-1, 0, 5),
				'4.9 in [0, 5)': _isInRange(4.9, 0, 5),
				'-2 in [-3, 3)': _isInRange(-2, -3, 3),
				'-3 in [-3, 3)': _isInRange(-3, -3, 3),
				'3 in [3, 3)': _isInRange(3, 3, 3),
			});
		});

		test('assertInRange() 只拋錯，不做標準化', (t) =>
		{
			t.assert.snapshot({
				'3 in [0, 5)': outcome(() => _assertInRange(3, 0, 5)),
				'5 in [0, 5)': outcome(() => _assertInRange(5, 0, 5)),
				'-1 in [0, 5)': outcome(() => _assertInRange(-1, 0, 5)),
				'預設標籤': outcome(() => _assertInRange(-1, 0, 5)),
				'自訂標籤': outcome(() => _assertInRange(5, 0, 5, 'len', 'myLabel')),
			});
		});
	});

	describe('assertLengthParams / assertRangeParams', () =>
	{
		test('assertLengthParams()', (t) =>
		{
			t.assert.snapshot({
				'MIN_LENGTH': outcome(() => _assertLengthParams(1)),
				'5': outcome(() => _assertLengthParams(5)),
				'MAX_LENGTH': outcome(() => _assertLengthParams(Number.MAX_SAFE_INTEGER)),
				'0': outcome(() => _assertLengthParams(0)),
				'-1': outcome(() => _assertLengthParams(-1)),
				'2.5': outcome(() => _assertLengthParams(2.5)),
				'自訂標籤': outcome(() => _assertLengthParams(0, 'myLabel')),
			});
		});

		test('assertRangeParams()', (t) =>
		{
			t.assert.snapshot({
				'[2, 5)': outcome(() => _assertRangeParams(2, 5)),
				'[-3, 3)': outcome(() => _assertRangeParams(-3, 3)),
				'[5, 5)': outcome(() => _assertRangeParams(5, 5)),
				'[6, 5)': outcome(() => _assertRangeParams(6, 5)),
				'[1.5, 5)': outcome(() => _assertRangeParams(1.5, 5)),
				'[1, 5.5)': outcome(() => _assertRangeParams(1, 5.5)),
				'[0, MAX+1]': outcome(() => _assertRangeParams(0, Number.MAX_SAFE_INTEGER + 1)),
				'自訂標籤': outcome(() => _assertRangeParams(5, 5, 'myLabel')),
			});
		});
	});

	describe('calcRangeSize / rangeValues', () =>
	{
		test('calcRangeSize() 以 end - start 直接計算', (t) =>
		{
			t.assert.snapshot({
				'[0, 5)': _calcRangeSize(0, 5),
				'[2, 5)': _calcRangeSize(2, 5),
				'[3, 3)': _calcRangeSize(3, 3),
				'[-3, 3)': _calcRangeSize(-3, 3),
			});
		});

		test('rangeValues() 生成器產出', (t) =>
		{
			t.assert.snapshot({
				'[0, 4)': toArray(_rangeValues(0, 4)),
				'[1, 5)': toArray(_rangeValues(1, 5)),
				'[-2, 2)': toArray(_rangeValues(-2, 2)),
				'[3, 3)': toArray(_rangeValues(3, 3)),
				'是生成器': typeof _rangeValues(0, 1)[Symbol.iterator] === 'function',
				'非陣列': Array.isArray(_rangeValues(0, 1)),
				'數量與 calcRangeSize 一致': toArray(_rangeValues(2, 9)).length === _calcRangeSize(2, 9),
			});
		});
	});

	describe('calcExpectedValues*', () =>
	{
		test('calcExpectedValues()', (t) =>
		{
			t.assert.snapshot({
				'[1, 4) 帶 params': outcome(() => _calcExpectedValues(1, 4, { foo: 2 })),
				'[0, 2) 無 params': outcome(() => _calcExpectedValues(0, 2)),
				'[5, 5)': outcome(() => _calcExpectedValues(5, 5)),
				'[5, 5) 自訂標籤': outcome(() => _calcExpectedValues(5, 5, undefined, 'myLabel')),
			});
		});

		test('calcExpectedValues() 的 params 以副本儲存', (t) =>
		{
			const params = { a: 1 };
			const expected = _calcExpectedValues(0, 2, params);

			params.a = 9;

			t.assert.snapshot({
				'外部事後變更': expected.params,
				'values 可重複列舉': [
					toArray(expected.valuesGenerator()),
					toArray(expected.valuesGenerator()),
					toArray(expected.valuesGenerator()),
				],
			});
		});

		test('calcExpectedValuesByLength()', (t) =>
		{
			t.assert.snapshot({
				'len=5': outcome(() => _calcExpectedValuesByLength(5)),
				'len=3 的 values': toArray(_calcExpectedValuesByLength(3).valuesGenerator()),
				'len=0': outcome(() => _calcExpectedValuesByLength(0)),
				'len=-1': outcome(() => _calcExpectedValuesByLength(-1)),
				'len=1.5': outcome(() => _calcExpectedValuesByLength(1.5)),
			});
		});

		test('calcExpectedValuesByRange()', (t) =>
		{
			t.assert.snapshot({
				'[1, 5)': outcome(() => _calcExpectedValuesByRange(1, 5)),
				'[0, 4)': outcome(() => _calcExpectedValuesByRange(0, 4)),
				'[4, 5)': outcome(() => _calcExpectedValuesByRange(4, 5)),
				'[5, 5)': outcome(() => _calcExpectedValuesByRange(5, 5)),
			});
		});
	});

	describe('createValuesValidator', () =>
	{
		test('初始狀態', (t) =>
		{
			t.assert.snapshot(validatorState(_createValuesValidator(_calcExpectedValuesByRange(1, 5), 'demo')));
		});

		test('check() 累計 total 與去重後的 size', (t) =>
		{
			const validator = _createValuesValidator(_calcExpectedValuesByRange(1, 5), 'demo');

			const trace = [
				outcome(() => validator.check(1)),
				outcome(() => validator.check(1)),
				`size=${validator.size}, total=${validator.total}`,
				outcome(() => validator.check(2)),
				`size=${validator.size}, total=${validator.total}`,
			];

			t.assert.snapshot({
				trace,
				state: validatorState(validator),
			});
		});

		test('seenValues 與 missingValues 互補', (t) =>
		{
			const validator = _createValuesValidator(_calcExpectedValuesByRange(1, 5), 'demo');

			validator.check(3);
			validator.check(1);

			t.assert.snapshot(validatorState(validator));
		});

		test('全部出現過時 verifyAllSeen() 不拋錯', (t) =>
		{
			const validator = _createValuesValidator(_calcExpectedValuesByRange(1, 5), 'demo');

			[1, 2, 3, 4].forEach((value) => validator.check(value));

			t.assert.snapshot(validatorState(validator));
		});

		test('出現非法值時先記錄再拋出', (t) =>
		{
			const validator = _createValuesValidator(_calcExpectedValuesByRange(1, 5), 'demo');

			const trace = [
				outcome(() => validator.check(1)),
				outcome(() => validator.check(5)),
			];

			t.assert.snapshot({
				trace,
				state: validatorState(validator),
			});
		});

		test('非法值會中斷迴圈，無需跑完 testLimit', (t) =>
		{
			const validator = _createValuesValidator(_calcExpectedValuesByRange(1, 5), 'demo');
			const testLimit = 1000;
			let iterations = 0;

			outcome(() =>
			{
				for (let i = 0; i < testLimit; i++)
				{
					iterations++;
					validator.check(99);
				}
			});

			t.assert.snapshot({
				iterations,
				state: validatorState(validator),
			});
		});

		test('不同值數量超過合法值數量時拋出', (t) =>
		{
			/**
			 * 以刻意縮小的 size 建立描述，用來驗證 size 上限的防禦性檢查
			 * Build a description with a deliberately smaller `size` to exercise the defensive size-cap check
			 */
			const validator = _createValuesValidator({
				params: {},
				range: { start: 0, end: 3 },
				size: 1,
				valuesGenerator()
				{
					return _rangeValues(0, 3);
				},
			}, 'guard');

			const trace = [
				outcome(() => validator.check(0)),
				outcome(() => validator.check(1)),
			];

			t.assert.snapshot({ trace });
		});

		test('正常流程下 size 不會超過 expected.size', (t) =>
		{
			const expected = _calcExpectedValuesByRange(1, 5);
			const validator = _createValuesValidator(expected, 'demo');

			[1, 2, 3, 4, 1, 2].forEach((value) => validator.check(value));

			t.assert.snapshot({
				...validatorState(validator),
				'expected.size': expected.size,
			});
		});
	});
});
