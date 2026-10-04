/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * `expect.extend(checkTypesMatchers)` / `toBeOneOf()` 以 `assert.ok(Array.includes())` 取代
 * Rewritten from jest to `node:test` + `node:assert/strict`
 *
 * ## 快照 / Snapshot
 *
 * 第一個測試記下「出現過哪些值」，第二個記下兩批值的**數量**與來源；
 * `return another when out of limit` 刻意不記具體值 — 哪 3 個取自亂數，
 * 寫進快照只會讓每次執行都改寫。
 * The first test records which values appeared; the second records the
 * *counts* and provenance of the two batches.
 * `return another when out of limit` deliberately omits the specific values —
 * which 3 come from the RNG, and putting them in the snapshot would rewrite it
 * on every run.
 *
 * 快照可被 `--test-update-snapshots` 自動改寫，因此後面另接
 * `t.assert.partialDeepStrictEqual()` 固定不變量。
 * A snapshot can be rewritten by `--test-update-snapshots`, so a
 * `t.assert.partialDeepStrictEqual()` follows it to pin the invariants.
 *
 * 快照檔 / Snapshot file: `test/array-unique.spec.ts.snapshot`
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/array-unique.spec.ts`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { dfArrayUnique } from '../src/index';
import { newRngMathRandom } from '@lazy-random/util-test';

describe(`dfArrayUnique`, () =>
{
	const count = 10000;
	const rnd = newRngMathRandom();

	test(`dfArrayUnique`, (t) =>
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

		/**
		 * 快照記錄「出現過哪些值」與「是否全來自 arr」，
		 * 兩者都能被 `--test-update-snapshots` 改寫，因此另行以斷言固定。
		 * The snapshot records which values appeared and whether they all came
		 * from `arr`; both can be rewritten by `--test-update-snapshots`, so they
		 * are pinned separately by an assertion.
		 */
		const values = Object.values(cache).sort((a, b) => a - b);

		const snapshot = {
			'出現的值': values,
			'全部來自 arr': values.every((v) => arr.includes(v)),
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'出現的值': [1, 2, 3, 4],
			'全部來自 arr': true,
		});
	});

	test(`return another when out of limit`, (t) =>
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

		/**
		 * 兩批值的**數量**與來源可確定，但具體是哪幾個值取決於亂數，
		 * 因此快照只記數量與布林，避免每次執行都改寫。
		 * The two batches' *counts* and provenance are deterministic, while which
		 * specific values appear depends on the RNG — so the snapshot records
		 * only counts and booleans, avoiding a rewrite on every run.
		 */
		const inLimit = Object.values(cache);
		const after = Object.values(cache2);

		const snapshot = {
			'前 limit 次': {
				'值數量': inLimit.length,
				'全部來自 arr': inLimit.every((v) => arr.includes(v) && !arr2.includes(v)),
			},
			'之後': {
				'值數量': after.length,
				'全部來自 arr2': after.every((v) => arr2.includes(v) && !arr.includes(v)),
			},
		};

		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			'前 limit 次': {
				'值數量': 3,
				'全部來自 arr': true,
			},
			'之後': {
				'值數量': 3,
				'全部來自 arr2': true,
			},
		});
	});

});
