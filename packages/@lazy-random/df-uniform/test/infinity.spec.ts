/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * Rewritten from jest to `node:test` + `node:assert/strict`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { dfUniformFloat } from '../src/index';
import { newRngMathRandom } from '@lazy-random/util-test';

describe(`Infinity`, () =>
{
	let rng = newRngMathRandom();

	test(`dfUniformFloat:max=Infinity`, () =>
	{
		assert.throws(() => dfUniformFloat(rng, 0, Infinity)());
	});

})
