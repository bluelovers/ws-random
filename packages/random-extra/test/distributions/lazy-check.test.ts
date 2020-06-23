import random from '../../'
import { isFloat } from '../../src/util/assers';

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
			argv = [3];
			break;
		case 'arrayFill':
			argv = [
				Array.from({
					length: 10,
				}),
			];
			break;
		case 'dfArrayFill':
			// @ts-ignore
			dfArgv = [
				Array.from({
					length: 10,
				}),
			];
			break;
	}

	return {
		argv,
		dfArgv,
	}
}

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

					if (isFloat(ret))
					{
						a.float.push(method)
					}
					else
					{
						a.number.push(method)
					}

					break;
				case 'boolean':
					a.boolean.push(method)
					break;
				case 'undefined':
					a.crash.push(method)
					break;
				case 'string':
					a.string.push(method)
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
		float: [],
		boolean: [],
		array: [],
		buffer: [],
		string: [],
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

				expect(cat).not.toBe('crash')

				if (is_df)
				{
					expect(type1).toBe('function')
				}

				if (type1 === 'function')
				{
					// ${method} ${type1}
					expect(is_df).toBe(true)
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

				expect(type).not.toBeFunction();
				expect(type).not.toBeUndefined();
				expect(val).not.toBeNull();
			})
		})
	})

});

