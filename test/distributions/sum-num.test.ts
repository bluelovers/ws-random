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

	// @ts-ignore
	describe(`random integer number list by expected sum`, () =>
	{

		_createTest(3, 6);
		_createTest(3, 21);
		_createTest(3, -21);
		_createTest(3, null, 1, 6, 6);
		_createTest(3, null, 0, 6, 6);
		_createTest(2, 5)
		_createTest(6, 13, -8, 15)
		_createTest(6, -13, -8, 15)
		_createTest(6, 0, -8, 15)
		_createTest(6, -14, -13, 15)

		function _createTest(size: number, sum: number, min?: number, max?: number, expected_sum?: number)
		{
			expected_sum = typeof expected_sum === 'number' ? expected_sum : sum;

			it(`dfSumInt(${size}, ${sum}, ${min}, ${max}) => ${typeof expected_sum === 'number' ? expected_sum : 'unknow'}`, function ()
			{
				const d = random.dfSumInt(size, sum, min, max);

				let cache = {} as {
					[k: string]: number[],
				};

				for (let i = 0; i < 10000; ++i)
				{
					const v = d();

					cache[String(v)] = v;
					break;
				}

				const vs = Object.values(cache);

				vs
					.forEach(function (v)
					{
						//console.log(v, sum);

						if (typeof expected_sum === 'number')
						{
							const sum = v.reduce((a, b) => a + b);

							expect(sum).closeTo(expected_sum, 0.01);
						}

						expect(v).array.lengthOf(size);
					})
				;

				expect(vs).array
					.lengthOf.gt(0)
				;
			});
		}

	});

	describe(`random float number list by expected sum`, () =>
	{

		_createTest(3, undefined,undefined,undefined,1);
		_createTest(3, 21);
		_createTest(3, -21);
		_createTest(3, null, 1, 6, 8);
		_createTest(3, null, -6, -1, -13);
		_createTest(3, 10, 1, 10);
		_createTest(3, null, 1, 10, 12);
		_createTest(3, 0, -5, 10);
		_createTest(3, -10, -5, 10);

		function _createTest(size: number, sum: number, min?: number, max?: number, expected_sum?: number)
		{
			expected_sum = typeof expected_sum === 'number' ? expected_sum : sum;

			it(`dfSumFloat(${size}, ${sum}, ${min}, ${max}) => ${typeof expected_sum === 'number' ? expected_sum : 'unknow'}`, function ()
			{
				const d = random.dfSumFloat(size, sum, min, max);

				let cache = {} as {
					[k: string]: number[],
				};

				for (let i = 0; i < 10000; ++i)
				{
					const v = d();

					cache[String(v)] = v;
					break;
				}

				const vs = Object.values(cache);

				vs
					.forEach(function (v)
					{
						//console.log(v, sum);

						if (typeof expected_sum === 'number')
						{
							const sum = v.reduce((a, b) => a + b);

							expect(sum).closeTo(expected_sum, 0.01);
						}

						expect(v).array.lengthOf(size);
					})
				;

				expect(vs).array
					.lengthOf.gt(0)
				;
			});
		}

	});

});
