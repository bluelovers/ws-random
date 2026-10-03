//@noUnusedParameters:false
/// <reference types="node" />

/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * 並以 `t.assert.snapshot()` 保留原有的快照斷言
 * Rewritten from jest to `node:test` + `node:assert/strict`,
 * snapshots are kept via `t.assert.snapshot()`
 *
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/test.spec.ts`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { newRngMathRandom } from '@lazy-random/util-test';
import { int, randIndex, randIndexWithRange } from '../src/index';
import type { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { calcExpectedValuesByLength, calcExpectedValuesByRange, collectValues } from './expected-values';

type IResults = Record<ITSTypeAndStringLiteral<number>, boolean>;

describe('test.spec', () =>
{
	const testLimit = 1000;

	const rnd = newRngMathRandom();

	test('randIndex', (t) =>
	{
		const size = 5;

		const expected = calcExpectedValuesByLength(size);

		const snapshot = collectValues('randIndex', testLimit, expected, () => randIndex(rnd, size));

		assert.strictEqual(expected.size, size);
		t.assert.snapshot(snapshot);
		t.assert.partialDeepStrictEqual(snapshot, {
			expectedSize: size,
			missingValues: [],
			illegalValues: [],
		});
	});

	([

		{ min: 0, max: 4 },
		{ min: 0, max: 1 },

		{ min: 0, max: 5 },
		{ min: 1, max: 5 },
		{ min: 2, max: 5 },
		{ min: 3, max: 5 },
		{ min: 4, max: 5 },

	] as const).forEach(({ min, max }) =>
	{
		test(`randIndexWithRange [${min}, ${max}]`, (t) =>
		{
			const expected = calcExpectedValuesByRange(min, max);

			const snapshot = collectValues('randIndexWithRange', testLimit, expected, () => randIndexWithRange(rnd, min, max));

			const size = max - min;

			assert.strictEqual(expected.size, size);
			t.assert.snapshot(snapshot);
			t.assert.partialDeepStrictEqual(snapshot, {
				expectedSize: size,
				missingValues: [],
				illegalValues: [],
			});
		});
	});

	test('int', (t) =>
	{
		const min = 1;
		const max = 5;
		const results: IResults = {};
		let actual = 0;
		for (let i = 0; i < testLimit; i++)
		{
			actual = int(rnd, min, max);

			results[actual] ??= true;

			if (actual < min || actual > max)
			{
				break;
			}
		}

		assert.ok(actual >= min && actual <= max, `int(${min}, ${max}) => ${actual} out of range`);
		t.assert.snapshot(results);
	});

})
