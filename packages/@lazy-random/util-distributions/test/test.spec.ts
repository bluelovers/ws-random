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

type IResults = Record<ITSTypeAndStringLiteral<number>, boolean>;

describe('test.spec', () =>
{
	const testLimit = 1000;

	const rnd = newRngMathRandom();

	test('dummy', { skip: true }, () => {});

	test('randIndex', (t) =>
	{
		const size = 5;
		const results: IResults = {};
		let actual = 0;
		for (let i = 0; i < testLimit; i++)
		{
			actual = randIndex(rnd, size);

			results[actual] ??= true;

			if (actual < 0 || actual >= size)
			{
				break;
			}
		}

		assert.ok(actual >= 0 && actual < size, `randIndex(${size}) => ${actual} out of range`);
		t.assert.snapshot(results);
	});

	test('randIndexWithRange', (t) =>
	{
		const min = 1;
		const max = 5;
		const results: IResults = {};
		let actual = 0;
		for (let i = 0; i < testLimit; i++)
		{
			actual = randIndexWithRange(rnd, min, max);

			results[actual] ??= true;

			if (actual < min || actual >= max)
			{
				break;
			}
		}

		assert.ok(actual >= min && actual < max, `randIndexWithRange(${min}, ${max}) => ${actual} out of range`);
		t.assert.snapshot(results);
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
