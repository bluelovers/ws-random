/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * Rewritten from jest to `node:test` + `node:assert/strict`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { newRngMathRandom } from '@lazy-random/util-test';
import { dfUniformInt } from '../../src/index';

describe(`large ints`, () =>
{
	const rnd = newRngMathRandom();

	test(`random.uniformInt(min, max) with large max`, () =>
	{
		const min = 0
		const max = 14206147658
		for (let i = 0; i < 100000; ++i)
		{
			const d = dfUniformInt(rnd, min, max)();
			assert.ok(d >= min, `${d} should be >= ${min}`);
			assert.ok(d <= max, `${d} should be <= ${max}`);
			assert.strictEqual(d, Math.floor(d));
		}

	});
});
