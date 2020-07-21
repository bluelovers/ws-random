/**
 * Created by user on 2018/11/16/016.
 */

import random from '../../src'
import expectInDelta from 'num-in-delta';

describe(`ItemByWeight`, () =>
{

	/**
	 * test demo copy from oprogramador/random-weighted-item
	 *
	 * @see https://github.com/oprogramador/random-weighted-item/blob/master/src/tests/getRandomItem.js
	 */
	it('returns random weighted item by index', () =>
	{
		let rnd = random.clone()
		const array = ['a', 'b', 'c', 'd']
		const getWeight = (value, index) => +index + 1

		const fn = rnd.dfItemByWeight(array, { getWeight })

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
		expect(fn()[1]).toBe('a');

		rnd.next = () => 0.1;
		expect(fn()[1]).toBe('a');

		rnd.next = () => 0.2;
		expect(fn()[1]).toBe('b');

		rnd.next = () => 0.3;
		expect(fn()[1]).toBe('b');

		rnd.next = () => 0.4;
		expect(fn()[1]).toBe('c');

		rnd.next = () => 0.5;
		expect(fn()[1]).toBe('c');

		rnd.next = () => 0.6;
		expect(fn()[1]).toBe('c');

		rnd.next = () => 0.7;
		expect(fn()[1]).toBe('d');

		rnd.next = () => 0.8;
		expect(fn()[1]).toBe('d');

		rnd.next = () => 0.9;
		expect(fn()[1]).toBe('d');

	})

	it('returns random weighted item by value', () =>
	{
		let rnd = random.clone()
		const array = [3, 7, 1, 4, 2]

		const fn = rnd.dfItemByWeight(array)

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
		expect(fn()[1]).toBe(1);

		rnd.next = () => 0.1;
		expect(fn()[1]).toBe(2);

		rnd.next = () => 0.2;
		expect(fn()[1]).toBe(3);

		rnd.next = () => 0.3;
		expect(fn()[1]).toBe(3);

		rnd.next = () => 0.4;
		expect(fn()[1]).toBe(4);

		rnd.next = () => 0.5;
		expect(fn()[1]).toBe(4);

		rnd.next = () => 0.6;
		expect(fn()[1]).toBe(7);

		rnd.next = () => 0.7;
		expect(fn()[1]).toBe(7);

		rnd.next = () => 0.8;
		expect(fn()[1]).toBe(7);

		rnd.next = () => 0.9;
		expect(fn()[1]).toBe(7);

	})

	it('returns random weighted item by prop.w', () =>
	{
		let rnd = random.clone()
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

		const fn = rnd.dfItemByWeight(obj, { getWeight })

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
		expect(fn()[0]).toBe('a');
		expect(fn()[1]).toEqual(obj['a']);

		rnd.next = () => 0.1;
		expect(fn()[0]).toBe('a');
		expect(fn()[1]).toEqual(obj['a']);

		rnd.next = () => 0.2;
		expect(fn()[0]).toBe('b');
		expect(fn()[1]).toEqual(obj['b']);

		rnd.next = () => 0.3;
		expect(fn()[0]).toBe('b');
		expect(fn()[1]).toEqual(obj['b']);

		rnd.next = () => 0.4;
		expect(fn()[0]).toBe('c');
		expect(fn()[1]).toEqual(obj['c']);

		rnd.next = () => 0.5;
		expect(fn()[0]).toBe('c');
		expect(fn()[1]).toEqual(obj['c']);

		rnd.next = () => 0.6;
		expect(fn()[0]).toBe('c');
		expect(fn()[1]).toEqual(obj['c']);

		rnd.next = () => 0.7;
		expect(fn()[0]).toBe('d');
		expect(fn()[1]).toEqual(obj['d']);

		rnd.next = () => 0.8;
		expect(fn()[0]).toBe('d');
		expect(fn()[1]).toEqual(obj['d']);

		rnd.next = () => 0.9;
		expect(fn()[0]).toBe('d');
		expect(fn()[1]).toEqual(obj['d']);

	})

	it('allow has same weight', () =>
	{
		let rnd = random.clone()
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

		const fn = rnd.dfItemByWeight(obj, { getWeight })

		rnd.next = () =>
		{
			return random.float(0.1, 1)
		}

		let cache = {}

		for (let i = 0; i < 10000; i++)
		{
			let ret = fn()

			cache[ret[0]] = (cache[ret[0]] || 0) + 1
		}

		let ks = Object.keys(cache)

		expect(ks.length).toBe(2)
		expect(ks).toEqual(expect.arrayContaining(['a']))
		expect(ks).toEqual(expect.arrayContaining(['b']))

		//console.log(cache);

	})

	it('random weighted item in expect percentage +/- 0.05', () =>
	{
		let rnd = random.clone()
		const arr = [1, 3, 2, 4, 1, 1, 4, 3, 2]

		const fn = rnd.dfItemByWeight(arr, {
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
				expect(data.key).toBe(data.data[0])
				expect(arr[data.key]).toBe(data.data[1])
				expectInDelta(data.percentage, data.data[2], 0.05)
			})
		;

	})

	it('[seedrandom] random weighted item in expect percentage +/- 0.05', () =>
	{
		let rnd = random.newUse('seedrandom')
		const arr = [1, 3, 2, 4, 1, 1, 4, 3, 2]

		const fn = rnd.dfItemByWeight(arr, {
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
				expect(data.key).toBe(data.data[0])
				expect(arr[data.key]).toBe(data.data[1])
				expectInDelta(data.percentage, data.data[2], 0.05)
			})
		;

	})

});

