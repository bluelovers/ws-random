/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * 並以 `t.assert.snapshot()` 保留原有的快照斷言
 * 快照檔 / Snapshot file: `test/array-fill.test.ts.snapshot`
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/array-fill.test.ts`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfArrayFill } from '../src/index';

describe(`dfArrayFill`, () =>
{
	const fn = dfArrayFill(newRngSeedRandom());

	const tests = [
		['Array', new Array(10)],
		['Uint8Array', new Uint8Array(10)],
		['Buffer', Buffer.alloc(10)],
	] as const;

	tests.forEach(function (arr)
	{
		test(`${arr[0]}`, (t) =>
		{
			let ret = fn(arr[1]);

			assert.strictEqual(ret.length, 10);
			t.assert.snapshot(ret)
		});
	});
});
