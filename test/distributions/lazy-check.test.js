// @allowJs: true
// @checkJs: true
import test from 'ava'
import seedrandom from 'seedrandom'
import random from '../..'
import RNGSeedRandom from '../../src/generators/seedrandom';
import inDelta from '../_in-delta';
import { expect } from 'chai'

let ks = Object
	.getOwnPropertyNames(Object.getPrototypeOf(random))
	.filter(function (v)
	{
		return ![
			'constructor',
			'rng',
			'clone',
			'use',
			'newUse',
			'cloneUse',
			'patch',
			'unpatch',
			'next',
			'_memoize',
			'reset',
			'_rng',
			'_cache',
			'seed',
		].includes(v)
	})
	.reduce(function (a, method)
	{

		let argv = []
		if (method === 'arrayIndex' || method === 'arrayItem' || method === 'arrayShuffle')
		{
			argv = [[11, 22, 33, 44, 55]]
		}

		try
		{
			let ret = random[method](...argv)

			let t2 = typeof ret

			switch (t2)
			{
				case 'function':
					a.distributions.push(method)
					break;
				case 'number':
					a.number.push(method)
					break;
				case 'boolean':
					a.boolean.push(method)
					break;
				case 'undefined':
					a.crash.push(method)
					break;
				default:

					if (Buffer.isBuffer(ret))
					{
						a.buffer.push(method)
					}
					else if (Array.isArray(ret))
					{
						a.array.push(method)
					}
					else
					{
						a.value.push(method)
					}

					break;
			}
		}
		catch (e)
		{
			a.crash.push(method)
		}

		return a
	}, {
		number: [],
		boolean: [],
		array: [],
		buffer: [],
		value: [],
		distributions: [],
		crash: []
	})

Object.keys(ks).forEach(function (cat)
{
	ks[cat].forEach(function (method)
	{

		test(`[${cat}] .${method}()`, (t) =>
		{
			let argv = []
			if (method === 'arrayIndex' || method === 'arrayItem' || method === 'arrayShuffle')
			{
				argv = [[11, 22, 33, 44, 55]]
			}

			let ret = random[method](...argv)
			let val;

			t.true(cat !== 'crash')

			if (typeof ret === 'function')
			{
				val = ret()
			}
			else
			{
				val = ret
			}

			let type = typeof val

			t.true(type !== 'function')
			t.true(type !== 'undefined')
			t.true(val !== null)
		})
	})
})

