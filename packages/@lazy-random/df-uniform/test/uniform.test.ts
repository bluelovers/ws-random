//import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
//
//expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

//declare global {
//	namespace jest {
//		type Iterable = number | number[] | { [k: string]: Iterable };
//		interface Matchers<R> {
//			toBeDeepCloseTo: (
//				received: Iterable,
//				expected: Iterable,
//				decimals?: number,
//			) => R;
//			toMatchCloseTo: (
//				received: Iterable,
//				expected: Iterable,
//				decimals?: number,
//			) => R;
//		}
//	}
//}

import { toBeCloseWith as toBeCloseToWithDelta } from 'jest-num-close-with';
import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfUniformFloat } from '../src/index';

declare global
{

	namespace jest
	{

		interface Matchers<R>
		{
			/**
			 * check actual number is expected number ± delta
			 */
			toBeCloseToWithDelta(expected: number, delta?: number, numDigits?: number): R;
		}

	}

}

expect.extend({
	toBeCloseToWithDelta,
})

const r = newRngSeedRandom();

// @ts-ignore
describe(`random.uniform()`, () =>
{
	const d = dfUniformFloat(r);

	const delta = 0.05;

	let min = 1;
	let max = 0;
	let sum = 0;

	const count = 10000;

	for (let i = 0; i < count; ++i)
	{
		const v = d();

		min = Math.min(min, v);
		max = Math.max(max, v);

		sum += v;
	}

	// @ts-ignore
	it(`random.uniform() is in [0, 1)`, () =>
	{
		expect(min).toBeGreaterThan(0);
		expect(max).toBeLessThan(1);
	});

	it(`random.uniform() has mean 0.5 \u00B1 ${delta}`, () =>
	{
		const mean = sum / count;
		const expected = 0.5;

		expect(mean).toBeCloseToWithDelta(expected, delta);
	});

});

describe(`random.uniform(max)`, () =>
{
	const input_max = 42;
	const d = dfUniformFloat(r, input_max);

	const delta = 0.5;

	let min = input_max;
	let max = 0;
	let sum = 0;

	const count = 10000;

	for (let i = 0; i < count; ++i)
	{
		const v = d();

		min = Math.min(min, v);
		max = Math.max(max, v);

		sum += v;
	}

	// @ts-ignore
	it(`random.uniform(max) returns numbers in [0, max)`, () =>
	{
		expect(min).toBeGreaterThan(0);
		expect(max).toBeLessThan(input_max);
	});

	it(`random.uniform(max) has mean max / 2 \u00B1 ${delta}`, () =>
	{
		const mean = sum / count;
		const expected = input_max / 2;

		console.dir({
			mean,
			expected,
			delta,
		})

		expect(mean).toBeCloseToWithDelta(expected, delta)
	});

});

describe(`random.uniform(min, max)`, () =>
{
	const input_min = 10;
	const input_max = 42;
	const d = dfUniformFloat(r, input_min, input_max);

	const delta = 0.5;

	let min = input_max;
	let max = 0;
	let sum = 0;

	const count = 10000;

	for (let i = 0; i < count; ++i)
	{
		const v = d();

		min = Math.min(min, v);
		max = Math.max(max, v);

		sum += v;
	}

	// @ts-ignore
	it(`random.uniform(min, max) returns numbers in [min, max]`, () =>
	{
		expect(min).toBeGreaterThan(input_min);
		expect(max).toBeLessThan(input_max);
	});

	it(`random.uniform(min, max) has mean max / 2 \u00B1 ${delta}`, () =>
	{
		const mean = sum / count;
		const expected = (input_min + input_max) / 2;

		console.dir({
			mean,
			expected,
			delta,
		})

		expect(mean).toBeCloseToWithDelta(expected, delta);
	});

});

