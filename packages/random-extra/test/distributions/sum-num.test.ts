/**
 * Created by user on 2018/11/16/016.
 */

import { SUM_DELTA } from '@lazy-random/shared-lib';
import { fixZero } from 'num-is-zero';
import random from '../../'
import checkTypesMatchers from '../jest/type';
import { toFixedNumber } from '@lazy-num/to-fixed-number';
import { num_array_sum } from '@lazy-num/sum';

expect.extend({
	toBeCloseToWithDelta: checkTypesMatchers.toBeCloseToWithDelta,
})

const delta = SUM_DELTA;

// @ts-ignore
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

		it(
			`dfSumInt(${size}, ${sum}, ${min}, ${max}) => ${typeof expected_sum === 'number' ? expected_sum : 'unknow'}`,
			() =>
			{
				const d = random.dfSumInt(size, sum, min, max);

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

							expect(sum).toBeCloseToWithDelta(expected_sum, delta);
						}

						expect(v).toHaveLength(size);

						if (check_range)
						{
							v.forEach(n => {
								expect(n).toBeGreaterThanOrEqual(min)
								expect(n).toBeLessThanOrEqual(max)
							})
						}
					})
				;

				expect(vs.length).toBeGreaterThan(0)
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

		it(
			`dfSumFloat(${size}, ${sum}, ${min}, ${max}) => ${typeof expected_sum === 'number' ? expected_sum : 'unknow'}`,
			() =>
			{
				const d = random.dfSumFloat(size, sum, min, max);

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

							expect(sum).toBeCloseToWithDelta(expected_sum, delta);
						}

						expect(v).toHaveLength(size);

						if (check_range)
						{
							v.forEach(n => {
								expect(n).toBeGreaterThanOrEqual(min)
								expect(n).toBeLessThanOrEqual(max)
							})
						}
					})
				;

				expect(vs.length).toBeGreaterThan(0)
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

		it(
			`dfSumFloat(${size}, ${sum}, ${min}, ${max}, fractionDigits = ${fractionDigits}) => ${typeof expected_sum === 'number'
				? expected_sum
				: 'unknow'}`,
			() =>
			{
				const d = random.dfSumFloat(size, sum, min, max, fractionDigits);

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
							expect(sum).toBeCloseToWithDelta(expected_sum, delta);
						}

						//console.log(v, sum);

						v.forEach(n =>
						{
							expect(fixZero(n)).toEqual(fixZero(toFixedNumber(n, fractionDigits)));
						});

						expect(v).toHaveLength(size);

						if (check_range)
						{
							v.forEach(n => {
								expect(n).toBeGreaterThanOrEqual(min)
								expect(n).toBeLessThanOrEqual(max)
							})
						}
					})
				;

				expect(vs.length).toBeGreaterThan(0)
				;
			},
		);
	}

});

function toKey(v: number[])
{
	return v.join(',')
}
