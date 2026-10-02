/**
 * Created by user on 2018/11/16/016.
 *
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * `expect.extend(checkTypesMatchers)` 的 `toBeCloseToWithDelta()` 以 `assertCloseToWithDelta()` 取代
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { SUM_DELTA } from '@lazy-random/shared-lib';
import { fixZero } from 'num-is-zero';
import { toFixedNumber } from '@lazy-num/to-fixed-number';
import { num_array_sum } from '@lazy-num/sum';
import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfRandSumInt, dfRandSumFloat } from '../src/index';

/**
 * 檢查實際值是否為期望值 ± delta / check actual number is expected number ± delta
 */
function assertCloseToWithDelta(actual: number, expected: number, delta: number)
{
	assert.ok(Math.abs(actual - expected) <= delta,
		`Expected ${actual} to be within ${expected} ± ${delta}`,
	);
}

const delta = SUM_DELTA;

const rnd = newRngSeedRandom();

describe(`random integer number list by expected sum`, () =>
{
	_createTest(3, 6);
	_createTest(3, 21);
	_createTest(3, -21);
	_createTest(3, null, 1, 6, 6);
	_createTest(3, null, 0, 6, 6);
	_createTest(2, 5)
	_createTest(6, 13, -8, 15)
	_createTest(6, -13, -8, 15)
	_createTest(6, 0, -8, 15)
	_createTest(6, -14, -13, 15)

	function _createTest(size: number, sum: number, min?: number, max?: number, expected_sum?: number)
	{
		expected_sum = typeof expected_sum === 'number' ? expected_sum : sum;

		test(
			`dfSumInt(${size}, ${sum}, ${min}, ${max}) => ${typeof expected_sum === 'number' ? expected_sum : 'unknow'}`,
			() =>
			{
				const d = dfRandSumInt(rnd, size, sum, min, max);

				let cache = {} as {
					[k: string]: number[],
				};

				for (let i = 0; i < 10000; ++i)
				{
					const v = d();

					cache[toKey(v)] = v;
				}

				const vs = Object.values(cache);

				console.log(vs.length, vs[0], num_array_sum(vs[0]));

				let check_range = typeof min === 'number' && typeof max === 'number';

				vs
					.forEach(function (v)
					{
						//console.log(v, sum);

						if (typeof expected_sum === 'number')
						{
							const sum = num_array_sum(v);

							assertCloseToWithDelta(sum, expected_sum, delta);
						}

						assert.strictEqual(v.length, size);

						if (check_range)
						{
							v.forEach(n =>
							{
								assert.ok(n >= min, `${n} should be >= ${min}`);
								assert.ok(n <= max, `${n} should be <= ${max}`);
							})
						}
					})
				;

				assert.ok(vs.length > 0, `should produce at least one result`)
				;
			},
		);
	}

});

describe(`random float number list by expected sum`, () =>
{

	_createTest(3, undefined, undefined, undefined, 1);
	_createTest(3, 21);
	_createTest(3, -21);
	_createTest(3, null, 1, 6, 8);
	_createTest(3, null, -6, -1, -13);
	_createTest(3, 10, 1, 10);
	_createTest(3, null, 1, 10, 12);
	_createTest(3, 0, -5, 10);
	_createTest(3, -10, -5, 10);

	_createTest(5, 1, -2, 3);

	function _createTest(size: number, sum: number, min?: number, max?: number, expected_sum?: number)
	{
		expected_sum = typeof expected_sum === 'number' ? expected_sum : sum;

		test(
			`dfSumFloat(${size}, ${sum}, ${min}, ${max}) => ${typeof expected_sum === 'number' ? expected_sum : 'unknow'}`,
			() =>
			{
				const d = dfRandSumFloat(rnd, size, sum, min, max);

				let cache = {} as {
					[k: string]: number[],
				};

				for (let i = 0; i < 10000; ++i)
				{
					const v = d();

					cache[toKey(v)] = v;
				}

				const vs = Object.values(cache);

				console.log(vs.length, vs[0], num_array_sum(vs[0]));

				let check_range = typeof min === 'number' && typeof max === 'number';

				vs
					.forEach(function (v)
					{
						//console.log(v, sum);

						if (typeof expected_sum === 'number')
						{
							const sum = num_array_sum(v);

							assertCloseToWithDelta(sum, expected_sum, delta);
						}

						assert.strictEqual(v.length, size);

						if (check_range)
						{
							v.forEach(n =>
							{
								assert.ok(n >= min, `${n} should be >= ${min}`);
								assert.ok(n <= max, `${n} should be <= ${max}`);
							})
						}
					})
				;

				assert.ok(vs.length > 0, `should produce at least one result`)
				;
			},
		);
	}

});

describe(`fractionDigits`, () =>
{
	const fractionDigits = 5;

	_createTest(3, undefined, undefined, undefined, 1);
	_createTest(3, 21);
	_createTest(3, -21);
	_createTest(3, null, 1, 6, 8);
	_createTest(3, null, -6, -1, -13);
	_createTest(3, 10, 1, 10);
	_createTest(3, null, 1, 10, 12);
	_createTest(3, 0, -5, 10);
	_createTest(3, -10, -5, 10);

	_createTest(5, 1, -2, 3);

	function _createTest(size: number, sum: number, min?: number, max?: number, expected_sum?: number)
	{
		expected_sum = typeof expected_sum === 'number' ? expected_sum : sum;

		test(
			`dfSumFloat(${size}, ${sum}, ${min}, ${max}, fractionDigits = ${fractionDigits}) => ${typeof expected_sum === 'number'
				? expected_sum
				: 'unknow'}`,
			() =>
			{
				const d = dfRandSumFloat(rnd, size, sum, min, max, fractionDigits);

				let cache = {} as {
					[k: string]: number[],
				};

				for (let i = 0; i < 10000; ++i)
				{
					const v = d();

					cache[toKey(v)] = v;
				}

				const vs = Object.values(cache);

				console.log(vs.length, vs[0], num_array_sum(vs[0]));

				let check_range = typeof min === 'number' && typeof max === 'number';

				vs
					.forEach(function (v)
					{
						const sum = num_array_sum(v);

						if (typeof expected_sum === 'number')
						{
							assertCloseToWithDelta(sum, expected_sum, delta);
						}

						//console.log(v, sum);

						v.forEach(n =>
						{
							assert.deepStrictEqual(fixZero(n), fixZero(toFixedNumber(n, fractionDigits)));
						});

						assert.strictEqual(v.length, size);

						if (check_range)
						{
							v.forEach(n =>
							{
								assert.ok(n >= min, `${n} should be >= ${min}`);
								assert.ok(n <= max, `${n} should be <= ${max}`);
							})
						}
					})
				;

				assert.ok(vs.length > 0, `should produce at least one result`)
				;
			},
		);
	}

});

function toKey(v: number[])
{
	return v.join(',')
}
