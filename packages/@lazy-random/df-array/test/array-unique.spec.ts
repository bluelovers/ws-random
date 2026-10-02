/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * `expect.extend(checkTypesMatchers)` / `toBeOneOf()` 以 `assert.ok(Array.includes())` 取代
 * Rewritten from jest to `node:test` + `node:assert/strict`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { dfArrayUnique } from '../src/index';
import { newRngMathRandom } from '@lazy-random/util-test';

describe(`dfArrayUnique`, () =>
{
	const count = 10000;
	const rnd = newRngMathRandom();

	test(`dfArrayUnique`, () =>
	{
		let arr = [1, 2, 3, 4];

		const d = dfArrayUnique(rnd, arr, 3, true);

		let cache: Record<number, number> = {}

		for (let i = 0; i < count; ++i)
		{
			const v = d();

			cache[v] = v;
		}

		Object.values(cache)
			.forEach(function (v)
			{
				assert.ok(arr.includes(v), `${v} should be one of [${arr}]`);
			})
		;
	});

	test(`return another when out of limit`, () =>
	{
		let arr = [1, 2, 3, 4];
		let limit = 3;

		let arr2 = [7, 8, 9]

		const d = dfArrayUnique(rnd, arr, limit, true, null, function ()
		{
			return arr2
		});

		let cache: Record<number, number> = {}
		let cache2: Record<number, number> = {}

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
				assert.ok(arr.includes(v), `${v} should be one of [${arr}]`);
				assert.ok(!arr2.includes(v), `${v} should not be one of [${arr2}]`);
			})
		;
		Object.values(cache2)
			.forEach(function (v)
			{
				assert.ok(arr2.includes(v), `${v} should be one of [${arr2}]`);
				assert.ok(!arr.includes(v), `${v} should not be one of [${arr}]`);
			})
		;
	});

});
