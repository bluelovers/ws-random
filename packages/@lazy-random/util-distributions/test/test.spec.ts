//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import { newRngMathRandom } from '@lazy-random/util-test';
import { int, randIndex, randIndexWithRange } from '../src/index';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

beforeAll(async () =>
{

});

type IResults = Record<ITSTypeAndStringLiteral<number>, boolean>;

describe(basename(__filename, extname(__filename)), () =>
{
	const testLimit = 1000;

	const rnd = newRngMathRandom();

	test.skip(`dummy`, () => {});

	test(`randIndex`, () =>
	{
		let size = 5;
		let results: IResults = {};
		let actual: number;
		for (let i = 0; i < testLimit; i++)
		{
			actual = randIndex(rnd, size);

			results[actual] ??= true;

			if (actual < 0 || actual >= size)
			{
				break;
			}
		}

		expect(actual).toBeGreaterThan(0);
		expect(actual).toBeLessThan(size);
		expect(results).toMatchSnapshot();

	});

	test(`randIndexWithRange`, () =>
	{
		let min = 1;
		let max = 5;
		let results: IResults = {};
		let actual: number;
		for (let i = 0; i < testLimit; i++)
		{
			actual = randIndexWithRange(rnd, min, max);

			results[actual] ??= true;

			if (actual < min || actual >= max)
			{
				break;
			}
		}

		expect(actual).toBeGreaterThan(0);
		expect(actual).toBeLessThan(max);
		expect(results).toMatchSnapshot();

	});

	test(`int`, () =>
	{
		let min = 1;
		let max = 5;
		let results: IResults = {};
		let actual: number;
		for (let i = 0; i < testLimit; i++)
		{
			actual = int(rnd, min, max);

			results[actual] ??= true;

			if (actual < min || actual > max)
			{
				break;
			}
		}

		expect(actual).toBeGreaterThan(0);
		expect(actual).toBeLessThan(max);
		expect(results).toMatchSnapshot();

	});

})
