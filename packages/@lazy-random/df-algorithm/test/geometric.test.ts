/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfGeometric } from '../src/index';

test('geometric() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfGeometric(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		assert.strictEqual(typeof v, 'number')
	}
})
