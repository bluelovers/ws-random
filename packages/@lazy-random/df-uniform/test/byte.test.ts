/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * Rewritten from jest to `node:test` + `node:assert/strict`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { newRngMathRandom } from '@lazy-random/util-test';
import { dfUniformByte, dfUniformBytes } from '../src/index';

const rnd = newRngMathRandom();

describe(`byte`, () =>
{
	test(`random.byte(): number`, () =>
	{
		let ret = dfUniformByte(rnd)();

		assert.match(ret.toString(), /^\d+$/)
		assert.ok(ret >= 0, `${ret} should be >= 0`);
		assert.ok(ret <= 255, `${ret} should be <= 255`);

	});

	test(`random.byte(toStr = true): string`, () =>
	{
		let ret = dfUniformByte(rnd, true)()

		assert.strictEqual(ret.length, 2);
	});
});

describe(`bytes`, () =>
{
	test(`random.bytes(): number[]`, () =>
	{
		let ret = dfUniformBytes(rnd, 1)()

		assert.ok(ret[0] >= 1, `${ret[0]} should be >= 1`);

		for (let i of ret)
		{
			assert.match(i.toString(), /^\d+$/)
			assert.ok(i >= 0, `${i} should be >= 0`);
			assert.ok(i <= 255, `${i} should be <= 255`);
		}

	});

	test(`random.bytes(size = 5): number[]`, () =>
	{
		let ret = dfUniformBytes(rnd, 5)()

		assert.strictEqual(ret.length, 5);

		for (let i of ret)
		{
			assert.match(i.toString(), /^\d+$/)
			assert.ok(i >= 0, `${i} should be >= 0`);
			assert.ok(i <= 255, `${i} should be <= 255`);
		}
	});

	test(`random.bytes(size = 5, toStr = true): string[]`, () =>
	{
		let ret = dfUniformBytes(rnd, 5, true)()

		assert.strictEqual(ret.length, 5);

		for (let i of ret)
		{
			assert.strictEqual(i.length, 2);
		}
	});
});
