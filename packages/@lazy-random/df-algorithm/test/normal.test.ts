/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import inDelta from 'num-in-delta'
import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfNormal } from '../src/index';

test('normal() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfNormal(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		assert.strictEqual(typeof v, 'number')
	}
})

test('normal(120) has mean 120', () =>
{
	const r = newRngSeedRandom()
	const d = dfNormal(r, 120)
	let sum = 0

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		sum += v
	}

	const mean = sum / 10000
	assert.strictEqual(inDelta(mean, 120, 0.5), true, `mean ${mean} should be in 120 ± 0.5`)
})
