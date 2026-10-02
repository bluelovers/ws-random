/**
 * Created by user on 2018/11/16/016.
 *
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 由 jest 測試改寫為 `node:test` + `node:assert/strict`
 * `expectInDelta()` 原本為空呼叫，改為以 `assert.ok()` 實際斷言
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import inDelta from 'num-in-delta';
import { dfItemByWeight } from '../src/index';
import { newRngMathRandom, newRngSeedRandom } from '@lazy-random/util-test';

describe(`ItemByWeight`, () =>
{

	/**
	 * test demo copy from oprogramador/random-weighted-item
	 *
	 * @see https://github.com/oprogramador/random-weighted-item/blob/master/src/tests/getRandomItem.js
	 */
	test('returns random weighted item by index', () =>
	{
		let rnd = newRngMathRandom()
		const array = ['a', 'b', 'c', 'd']
		const getWeight = (value, index) => +index + 1

		const fn = dfItemByWeight(rnd, array, { getWeight })

		/*
	{ sum: 10,
		plist: [ 0.1, 0.30000000000000004, 0.6000000000000001, 1 ],
		vlist:
		 [ [ [ '0', 'a' ] ],
		 [ [ '1', 'b' ] ],
		 [ [ '2', 'c' ] ],
		 [ [ '3', 'd' ] ] ] }
		 */

		rnd.next = () => 0.01;
		assert.strictEqual(fn()[1], 'a');

		rnd.next = () => 0.1;
		assert.strictEqual(fn()[1], 'a');

		rnd.next = () => 0.2;
		assert.strictEqual(fn()[1], 'b');

		rnd.next = () => 0.3;
		assert.strictEqual(fn()[1], 'b');

		rnd.next = () => 0.4;
		assert.strictEqual(fn()[1], 'c');

		rnd.next = () => 0.5;
		assert.strictEqual(fn()[1], 'c');

		rnd.next = () => 0.6;
		assert.strictEqual(fn()[1], 'c');

		rnd.next = () => 0.7;
		assert.strictEqual(fn()[1], 'd');

		rnd.next = () => 0.8;
		assert.strictEqual(fn()[1], 'd');

		rnd.next = () => 0.9;
		assert.strictEqual(fn()[1], 'd');

	})

	test('returns random weighted item by value', () =>
	{
		let rnd = newRngMathRandom()
		const array = [3, 7, 1, 4, 2]

		const fn = dfItemByWeight(rnd, array)

		/*
	{ sum: 17,
		plist:
		 [ 0.058823529411764705,
		 0.1764705882352941,
		 0.3529411764705882,
		 0.588235294117647,
		 0.9999999999999999 ],
		vlist:
		 [ [ [ '2', 1 ] ],
		 [ [ '4', 2 ] ],
		 [ [ '0', 3 ] ],
		 [ [ '3', 4 ] ],
		 [ [ '1', 7 ] ] ] }
		 */

		rnd.next = () => 0.01;
		assert.strictEqual(fn()[1], 1);

		rnd.next = () => 0.1;
		assert.strictEqual(fn()[1], 2);

		rnd.next = () => 0.2;
		assert.strictEqual(fn()[1], 3);

		rnd.next = () => 0.3;
		assert.strictEqual(fn()[1], 3);

		rnd.next = () => 0.4;
		assert.strictEqual(fn()[1], 4);

		rnd.next = () => 0.5;
		assert.strictEqual(fn()[1], 4);

		rnd.next = () => 0.6;
		assert.strictEqual(fn()[1], 7);

		rnd.next = () => 0.7;
		assert.strictEqual(fn()[1], 7);

		rnd.next = () => 0.8;
		assert.strictEqual(fn()[1], 7);

		rnd.next = () => 0.9;
		assert.strictEqual(fn()[1], 7);

	})

	test('returns random weighted item by prop.w', () =>
	{
		let rnd = newRngMathRandom()
		const obj = {
			a: {
				w: 1,
			},
			b: {
				w: 2,
			},
			c: {
				w: 3,
			},
			d: {
				w: 4,
			},
		}
		const getWeight = (value, index) => value.w

		const fn = dfItemByWeight(rnd, obj, { getWeight })

		/*
	{ sum: 10,
		plist: [ 0.1, 0.30000000000000004, 0.6000000000000001, 1 ],
		vlist:
		 [ [ [ 'a', { w: 1 } ] ],
		 [ [ 'b', { w: 2 } ] ],
		 [ [ 'c', { w: 3 } ] ],
		 [ [ 'd', { w: 4 } ] ] ] }
		 */

		rnd.next = () => 0.01;
		assert.strictEqual(fn()[0], 'a');
		assert.deepStrictEqual(fn()[1], obj['a']);

		rnd.next = () => 0.1;
		assert.strictEqual(fn()[0], 'a');
		assert.deepStrictEqual(fn()[1], obj['a']);

		rnd.next = () => 0.2;
		assert.strictEqual(fn()[0], 'b');
		assert.deepStrictEqual(fn()[1], obj['b']);

		rnd.next = () => 0.3;
		assert.strictEqual(fn()[0], 'b');
		assert.deepStrictEqual(fn()[1], obj['b']);

		rnd.next = () => 0.4;
		assert.strictEqual(fn()[0], 'c');
		assert.deepStrictEqual(fn()[1], obj['c']);

		rnd.next = () => 0.5;
		assert.strictEqual(fn()[0], 'c');
		assert.deepStrictEqual(fn()[1], obj['c']);

		rnd.next = () => 0.6;
		assert.strictEqual(fn()[0], 'c');
		assert.deepStrictEqual(fn()[1], obj['c']);

		rnd.next = () => 0.7;
		assert.strictEqual(fn()[0], 'd');
		assert.deepStrictEqual(fn()[1], obj['d']);

		rnd.next = () => 0.8;
		assert.strictEqual(fn()[0], 'd');
		assert.deepStrictEqual(fn()[1], obj['d']);

		rnd.next = () => 0.9;
		assert.strictEqual(fn()[0], 'd');
		assert.deepStrictEqual(fn()[1], obj['d']);

	})

	test('allow has same weight', () =>
	{
		let rnd = newRngMathRandom()
		const obj = {
			a: {
				w: 5,
			},
			b: {
				w: 5,
			},
			c: {
				w: 1,
			},
		}
		const getWeight = (value, index) => value.w

		const fn = dfItemByWeight(rnd, obj, { getWeight })

		let rnd2 = newRngMathRandom()

		rnd.next = () =>
		{
			return rnd2.float(0.1, 1)
		}

		let cache = {}

		for (let i = 0; i < 10000; i++)
		{
			let ret = fn()

			cache[ret[0]] = (cache[ret[0]] || 0) + 1
		}

		let ks = Object.keys(cache)

		assert.strictEqual(ks.length, 2)
		assert.ok(ks.includes('a'), `ks should contain 'a': [${ks}]`)
		assert.ok(ks.includes('b'), `ks should contain 'b': [${ks}]`)

		//console.log(cache);

	})

	test('random weighted item in expect percentage +/- 0.05', () =>
	{
		let rnd = newRngMathRandom()
		const arr = [1, 3, 2, 4, 1, 1, 4, 3, 2]

		const fn = dfItemByWeight(rnd, arr, {
			getWeight: null,
			shuffle: true,
			disableSort: true,
		})

		let cache = {} as {
			[k: string]: number,
		}
		let cache2 = {} as {
			[k: string]: {
				key: string,
				count: number,
				percentage: number,
				data,
			}
		};

		const total = 10000

		for (let i = 0; i < total; i++)
		{
			let ret = fn()

			cache[ret[0]] = (cache[ret[0]] || 0) + 1
			cache2[ret[0]] = {
				key: ret[0],
				count: cache[ret[0]],
				percentage: cache[ret[0]] / total,
				data: ret,
			}
		}

		console.dir(cache2, {
			depth: 5,
			colors: true,
		});

		Object.values(cache2)
			.forEach(function (data)
			{
				assert.strictEqual(data.key, data.data[0])
				assert.strictEqual(arr[data.key], data.data[1])
				assert.ok(inDelta(data.percentage, data.data[2], 0.05),
					`${data.key}: percentage ${data.percentage} not in delta of ${data.data[2]} ± 0.05`)
			})
		;

	})

	test('[seedrandom] random weighted item in expect percentage +/- 0.05', () =>
	{
		let rnd = newRngSeedRandom()
		const arr = [1, 3, 2, 4, 1, 1, 4, 3, 2]

		const fn = dfItemByWeight(rnd, arr, {
			getWeight: null,
			shuffle: true,
			disableSort: true,
		})

		let cache = {} as {
			[k: string]: number,
		}
		let cache2 = {} as {
			[k: string]: {
				key: string,
				count: number,
				percentage: number,
				data,
			}
		};

		const total = 10000

		for (let i = 0; i < total; i++)
		{
			let ret = fn()

			cache[ret[0]] = (cache[ret[0]] || 0) + 1
			cache2[ret[0]] = {
				key: ret[0],
				count: cache[ret[0]],
				percentage: cache[ret[0]] / total,
				data: ret,
			}
		}

		/*
		console.dir(cache2, {
			depth: 5,
			colors: true,
		});
		*/

		Object.values(cache2)
			.forEach(function (data)
			{
				assert.strictEqual(data.key, data.data[0])
				assert.strictEqual(arr[data.key], data.data[1])
				assert.ok(inDelta(data.percentage, data.data[2], 0.05),
					`${data.key}: percentage ${data.percentage} not in delta of ${data.data[2]} ± 0.05`)
			})
		;

	})

});
