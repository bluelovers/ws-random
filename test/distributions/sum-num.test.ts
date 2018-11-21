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

		it(`dfSumInt(3)`, function ()
		{
			const size = 3;
			const expected_sum = 6;

			const d = random.dfSumInt(size);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);
					expect(v).length(size);
				})
			;
		});

		it(`dfSumInt(3, sum = 21)`, function ()
		{
			const size = 3;
			const expected_sum = 21;

			const d = random.dfSumInt(size, expected_sum);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);
					expect(v).length(size);
				})
			;
		});

		it(`dfSumInt(3, sum = -21)`, function ()
		{
			const size = 3;
			const expected_sum = -21;

			const d = random.dfSumInt(size, expected_sum);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			//console.log(vs);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);
					expect(v).length(size);
				})
			;
		});

		it(`dfSumInt(3, null, 1, 6)`, function ()
		{
			const size = 3;
			const expected_sum = 6;

			const min = 1;
			const max = 6;
			const evs = [1, 2, 3];

			const d = random.dfSumInt(size, null, min, max);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);

					//expect(v).to.have.members(evs);
					expect(v).length(size);
				})
			;
		});

		it(`dfSumInt(3, null, 0, 6)`, function ()
		{
			const size = 3;
			const expected_sum = 6;

			const min = 0;
			const max = 6;

			const d = random.dfSumInt(size, null, min, max);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);
					expect(v).length(size);
				})
			;
		});

		_createTest(2, 5)
		_createTest(6, 13, -8, 15)
		_createTest(6, -13, -8, 15)
		_createTest(6, 0, -8, 15)
		_createTest(6, -14, -13, 15)

		function _createTest(size: number, sum: number, min?: number, max?: number)
		{
			it(`dfSumInt(${size}, ${sum}, ${min}, ${max})`, function ()
			{
				const expected_sum = sum;

				const d = random.dfSumInt(size, expected_sum, min, max);

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
						const sum = v.reduce((a, b) => a + b);

						//console.log(v, sum);
						expect(sum).closeTo(expected_sum, 0.01);
						expect(v).length(size);
					})
				;
			});
		}

	});

	describe(`random float number list by expected sum`, () =>
	{

		it(`dfSumFloat(3)`, function ()
		{
			const size = 3;
			const min = 1;
			const max = 6;

			const expected_sum = 1;

			const d = random.dfSumFloat(size);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);

					expect(v).length(size);
				})
			;
		});

		it(`dfSumFloat(3, sum = 21)`, function ()
		{
			const size = 3;
			const min = 1;
			const max = 6;

			const expected_sum = 21;

			const d = random.dfSumFloat(size, expected_sum);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);

					expect(v).length(size);
				})
			;
		});

		it(`dfSumFloat(3, sum = -21)`, function ()
		{
			const size = 3;

			const expected_sum = -21;

			const d = random.dfSumFloat(size, expected_sum);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);

					expect(v).length(size);
				})
			;
		});

		it(`dfSumFloat(3, null, 1, 6)`, function ()
		{
			const size = 3;
			const min = 1;
			const max = 6;

			const expected_sum = 8;

			const d = random.dfSumFloat(size, null, min, max);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);
					expect(v).length(size);
				})
			;
		});

		it(`dfSumFloat(3, null, -6, -1)`, function ()
		{
			const size = 3;
			const min = -6;
			const max = -1;

			const expected_sum = -13;

			const d = random.dfSumFloat(size, null, min, max);

			let cache = {} as {
				[k: string]: number[],
			};

			for (let i = 0; i < 10000; ++i)
			{
				const v = d();

				cache[String(v)] = v;
			}

			const vs = Object.values(cache);

			vs
				.forEach(function (v)
				{
					const sum = v.reduce((a, b) => a + b);
					expect(sum).closeTo(expected_sum, 0.01);
					expect(v).length(size);
				})
			;
		});

	});

});
