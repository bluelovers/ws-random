/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * 並以 `t.assert.snapshot()` 保留原有的快照斷言
 * 快照檔 / Snapshot file: `test/seed.test.ts.snapshot`
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/seed.test.ts`
 */

import { test } from 'node:test';
import { dfUniformFloat } from '../src/index';
import { newRngSeedRandom, newRngFactory } from '@lazy-random/util-test';
import seedrandom from 'seedrandom';

test('random.newUse witth a seed is consistent', (t) =>
{
	const d = dfUniformFloat(newRngFactory(seedrandom('ZjExZDczNWQxY2NlZjUzYmRiZWU0ZGIz')))
	const o = []
	for (let i = 0; i < 100; ++i)
	{
		const v = d()
		o.push(v)
	}

	t.assert.snapshot(o)
})

test('random.newUse witth a seed is consistent 2', (t) =>
{
	const d = dfUniformFloat(newRngSeedRandom())
	const o = []
	for (let i = 0; i < 100; ++i)
	{
		const v = d()
		o.push(v)
	}

	t.assert.snapshot(o)
})
