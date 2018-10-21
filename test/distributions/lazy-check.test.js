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

		try
		{
			let ret = random[method]()

			if (typeof ret === 'function')
			{
				a.distributions.push(method)
			}
			else
			{
				switch (typeof ret)
				{
					case 'number':
						a.number.push(method)
						break;
					case 'boolean':
						a.boolean.push(method)
						break;
					default:

						if (Array.isArray(ret))
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
			let ret = random[method]()
			let val;

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
		})
	})
})

