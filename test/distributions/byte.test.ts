/**
 * Created by user on 2018/11/16/016.
 */

/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />

import { stringifyByte } from '../../src/util/byte';
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
	describe(`byte`, () =>
	{
		it(`random.byte(): number`, function ()
		{
			let ret = random.byte()

			expect(ret).is.integer
				.gte(0)
				.lte(255)

		});

		it(`random.byte(toStr = true): string`, function ()
		{
			let ret = random.byte(true)

			expect(ret)
				//.is.a('string')
				.is.string
				.lengthOf(2)
			;
		});
	});

	describe(`bytes`, () =>
	{
		it(`random.bytes(): number[]`, function ()
		{
			let ret = random.bytes()

			expect(ret).is.array
				.lengthOf.gte(1)
			;

			for (let i in ret)
			{
				expect(ret[i]).is.integer
					.gte(0)
					.lte(255)
				;
			}

		});

		it(`random.bytes(size = 5): number[]`, function ()
		{
			let ret = random.bytes(5)

			expect(ret).is.array
				.lengthOf(5)
			;

			for (let i in ret)
			{
				expect(ret[i]).is.integer
					.gte(0)
					.lte(255)
				;
			}
		});

		it(`random.bytes(size = 5, toStr = true): string[]`, function ()
		{
			let ret = random.bytes(5, true)

			expect(ret).is.array
				.lengthOf(5)
			;

			for (let i in ret)
			{
				expect(ret[i]).is.string
					.lengthOf(2)
				;
			}
		});
	});

});
