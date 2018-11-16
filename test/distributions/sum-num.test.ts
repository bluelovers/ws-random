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
	describe(`random number list by expected sum`, () =>
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

		it(`dfSumInt(3, null, 1, 6)`, function ()
		{
			const size = 3;
			const expected_sum = 6;

			const min = 1;
			const max = 6;
			const evs = [ 1, 2, 3 ];

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

					expect(v).to.have.members(evs);
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

		it(`dfSumFloat(3)`, function ()
		{
			const size = 3;
			const min = 1;
			const max = 6;

			const expected_sum = 6;

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

		it(`dfSumFloat(3, null, 1, 6)`, function ()
		{
			const size = 3;
			const min = 1;
			const max = 6;

			const expected_sum = 6;

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
