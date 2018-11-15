/**
 * Created by user on 2018/11/16/016.
 */

/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from '../_local-dev';

// @ts-ignore
import { ITest } from 'mocha';
//import random from '../..'
import seedrandom = require('seedrandom');
import { Random, random } from '../../src/random'

function getDefaultArgv(method)
{
	let argv = []
	let dfArgv = []

	switch (method)
	{
		case 'arrayIndex':
		case 'arrayItem':
		case 'arrayShuffle':
		case 'arrayUnique':
		case 'dfArrayIndex':
		case 'dfArrayItem':
		case 'dfArrayShuffle':
		case 'dfArrayUnique':
			argv = [[11, 22, 33, 44, 55]];
			dfArgv = argv.slice();
			break;
		case 'itemByWeight':
		case 'dfItemByWeight':
			argv = [[1, 2, 1, 3, 3, 4, 1.5]];
			break;
		case 'sumInt':
		case 'sumFloat':
		case 'dfSumInt':
		case 'dfSumFloat':
			argv = [3, -5, 52];
			break
	}

	return {
		argv,
		dfArgv,
	}
}

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	const r = random;

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	let ks = Object
		.getOwnPropertyNames(Object.getPrototypeOf(random))
		.filter(function (v)
		{
			return !([
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
				'seedable',
			].includes(v) || v.indexOf('_') === 0)
		})
		.reduce(function (a, method)
		{

			let Argv = getDefaultArgv(method)

			try
			{
				let ret = random[method](...Argv.argv)

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
			crash: [],
		})

	Object.keys(ks).forEach(function (cat)
	{

		describe(`${cat}`, () =>
		{

			ks[cat].forEach(function (method)
			{

				it(`[${cat}] .${method}()`, () =>
				{
					let Argv = getDefaultArgv(method)

					let ret = random[method](...Argv.argv)
					let type1 = typeof ret;
					let is_df = method.indexOf('df') === 0;
					let val;

					expect(cat).not.equal('crash')

					if (is_df)
					{
						expect(type1).to.be.eq('function')
					}

					if (type1 === 'function')
					{
						expect(is_df, `${method} ${type1}`).to.be.eq(true)
					}

					if (type1 === 'function')
					{
						val = ret(...Argv.dfArgv)
					}
					else
					{
						val = ret
					}

					let type = typeof val;

					expect(type).to.be.not.a('function');
					expect(type).to.be.not.an('undefined');
					expect(val).to.be.not.a('null');
				})
			})
		})

	});

});
