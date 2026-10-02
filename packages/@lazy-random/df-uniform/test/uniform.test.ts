/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * `toBeCloseToWithDelta` 以 `assertCloseToWithDelta()` 取代
 * Rewritten from jest to `node:test` + `node:assert/strict`,
 * `toBeCloseToWithDelta` is replaced by `assertCloseToWithDelta()`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfUniformFloat } from '../src/index';

/**
 * 檢查實際值是否為期望值 ± delta / check actual number is expected number ± delta
 */
function assertCloseToWithDelta(actual: number, expected: number, delta: number)
{
	assert.ok(Math.abs(actual - expected) <= delta,
		`Expected ${actual} to be within ${expected} ± ${delta}`,
	);
}

const r = newRngSeedRandom();

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

	test(`random.uniform() is in [0, 1)`, () =>
	{
		assert.ok(min > 0, `min ${min} should be > 0`);
		assert.ok(max < 1, `max ${max} should be < 1`);
	});

	test(`random.uniform() has mean 0.5 ± ${delta}`, () =>
	{
		const mean = sum / count;
		const expected = 0.5;

		assertCloseToWithDelta(mean, expected, delta);
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

	test(`random.uniform(max) returns numbers in [0, max)`, () =>
	{
		assert.ok(min > 0, `min ${min} should be > 0`);
		assert.ok(max < input_max, `max ${max} should be < ${input_max}`);
	});

	test(`random.uniform(max) has mean max / 2 ± ${delta}`, () =>
	{
		const mean = sum / count;
		const expected = input_max / 2;

		console.dir({
			mean,
			expected,
			delta,
		})

		assertCloseToWithDelta(mean, expected, delta);
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

	test(`random.uniform(min, max) returns numbers in [min, max]`, () =>
	{
		assert.ok(min > input_min, `min ${min} should be > ${input_min}`);
		assert.ok(max < input_max, `max ${max} should be < ${input_max}`);
	});

	test(`random.uniform(min, max) has mean max / 2 ± ${delta}`, () =>
	{
		const mean = sum / count;
		const expected = (input_min + input_max) / 2;

		console.dir({
			mean,
			expected,
			delta,
		})

		assertCloseToWithDelta(mean, expected, delta);
	});

});
