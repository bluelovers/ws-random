/// <reference types="jest-extended" />
import { checkTypesMatchers } from 'random-extra/test/jest/type';
import { dfArrayUnique } from '../src/index';
import { newRngMathRandom } from '@lazy-random/util-test';

expect.extend(checkTypesMatchers);

// @ts-ignore
describe(`dfArrayUnique`, () =>
{
	const count = 10000;
	const rnd = newRngMathRandom();

	// @ts-ignore
	it(`dfArrayUnique`, () =>
	{
		let arr = [1, 2, 3, 4];

		const d = dfArrayUnique(rnd, arr, 3, true);

		let cache = {}

		for (let i = 0; i < count; ++i)
		{
			const v = d();

			cache[v] = v;
		}

		Object.values(cache)
			.forEach(function (v)
			{
				// @ts-ignore
				expect(v).toBeOneOf(arr)
			})
		;
	});

	it(`return another when out of limit`, () =>
	{
		let arr = [1, 2, 3, 4];
		let limit = 3;

		let arr2 = [7, 8, 9]

		const d = dfArrayUnique(rnd, arr, limit, true, null, function ()
		{
			return arr2
		});

		let cache = {}
		let cache2 = {}

		for (let i = 0; i < 10000; ++i)
		{
			const v = d()

			if (i >= limit)
			{
				cache2[v] = v;
			}
			else
			{
				cache[v] = v;
			}
		}

		Object.values(cache)
			.forEach(function (v)
			{
				// @ts-ignore
				expect(v).toBeOneOf(arr)
				// @ts-ignore
				expect(v).not.toBeOneOf(arr2)
			})
		;
		Object.values(cache2)
			.forEach(function (v)
			{
				// @ts-ignore
				expect(v).toBeOneOf(arr2)
				// @ts-ignore
				expect(v).not.toBeOneOf(arr)
			})
		;
	});

});
