//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import { dfArrayFill, dfArrayIndex } from '../src/index';
import { newRngMathRandom, newRngSeedRandom } from '@lazy-random/util-test';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { dfArrayIndexOne } from '../src/array-index-one';

beforeAll(async () =>
{

});

type IResults = Record<ITSTypeAndStringLiteral<number>, boolean>;

describe(basename(__filename, extname(__filename)), () =>
{
	const testLimit = 1000;

	const rnd = newRngMathRandom();

	test.skip(`dummy`, () => {});

	describe(`dfArrayIndex`, () =>
	{

		test(`always return same size`, () =>
		{
			const size = 2;
			let arr = [1, 2, 3, 4] as const;

			const fn = dfArrayIndex(rnd, arr, size);

			let actual: number[];

			for (let i = 0; i < testLimit; i++)
			{
				actual = fn();

				if (actual.length !== size)
				{
					break;
				}
			}

			expect(actual).toHaveLength(size)
		});

		test(`end > start + 1`, () =>
		{
			let arr = [1, 2, 3, 4] as const;

			expect(() => dfArrayIndex(rnd, arr, 3, 4)).toThrow();
			expect(() => dfArrayIndex(rnd, arr, 3, 3)).not.toThrow();

			expect(() => dfArrayIndex(rnd, arr, 3, 2, 3)).toThrow();
			expect(() => dfArrayIndex(rnd, arr, 3, 3, 4)).toThrow();

			expect(() => dfArrayIndex(rnd, arr, 3, 3)).not.toThrow();
			expect(() => dfArrayIndex(rnd, arr, 3, 3, 5)).not.toThrow();

		});

	});

	test(`dfArrayIndexOne`, () =>
	{
		let min = 1;
		let max = 5;
		let arr = [1, 2, 3, 4] as const;
		let results: IResults = {};
		let actual: number;

		const fn = dfArrayIndexOne(rnd, arr, min, max);

		for (let i = 0; i < testLimit; i++)
		{
			actual = fn();

			results[actual] ??= true;

			if (actual < min || actual >= max)
			{
				break;
			}
		}

		expect(actual).toBeGreaterThan(0);
		expect(actual).toBeGreaterThanOrEqual(min);
		expect(actual).toBeLessThan(max);
		expect(results).toMatchSnapshot();

	});

})
