//@noUnusedParameters:false
/// <reference types="node" />

/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * 並以 `t.assert.snapshot()` 保留原有的快照斷言
 * 更新快照 / Update snapshots: `node --test --test-update-snapshots test/array-index.spec.ts`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { dfArrayIndex } from '../src/index';
import { newRngMathRandom } from '@lazy-random/util-test';
import type { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { dfArrayIndexOne } from '../src/array-index-one';

type IResults = Record<ITSTypeAndStringLiteral<number>, boolean>;

describe(`array-index`, () =>
{
	const testLimit = 1000;

	const rnd = newRngMathRandom();

	test(`dummy`, { skip: true }, () => {});

	describe(`dfArrayIndex`, () =>
	{

		test(`always return same size`, () =>
		{
			const size = 2;
			let arr = [1, 2, 3, 4] as const;

			const fn = dfArrayIndex(rnd, arr, size);

			let actual: number[] = [];

			for (let i = 0; i < testLimit; i++)
			{
				actual = fn();

				if (actual.length !== size)
				{
					break;
				}
			}

			assert.strictEqual(actual.length, size)
		});

		test(`end > start + 1`, () =>
		{
			let arr = [1, 2, 3, 4] as const;

			assert.throws(() => dfArrayIndex(rnd, arr, 3, 4));
			assert.doesNotThrow(() => dfArrayIndex(rnd, arr, 3, 3));

			assert.throws(() => dfArrayIndex(rnd, arr, 3, 2, 3));
			assert.throws(() => dfArrayIndex(rnd, arr, 3, 3, 4));

			assert.doesNotThrow(() => dfArrayIndex(rnd, arr, 3, 3));
			assert.doesNotThrow(() => dfArrayIndex(rnd, arr, 3, 3, 5));

		});

	});

	test(`dfArrayIndexOne`, (t) =>
	{
		let min = 1;
		let max = 5;
		let arr = [1, 2, 3, 4] as const;
		let results: IResults = {};
		let actual = 0;

		const fn = dfArrayIndexOne(rnd, arr, min, max);

		for (let i = 0; i < testLimit; i++)
		{
			actual = fn();

			results[actual] ??= true;

			if (actual < min || actual >= max)
			{
				break;
			}
		}

		assert.ok(actual > 0, `actual ${actual} should be > 0`);
		assert.ok(actual >= min, `actual ${actual} should be >= ${min}`);
		assert.ok(actual < max, `actual ${actual} should be < ${max}`);
		t.assert.snapshot(results);

	});

})
