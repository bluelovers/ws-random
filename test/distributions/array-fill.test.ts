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
import random from '../..'

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
		const fn = random.dfArrayFill();

		const tests = [
			['Array', new Array(10)],
			['Uint8Array', new Uint8Array(10)],
			['Buffer', Buffer.alloc(10)],
		];

		tests.forEach(function (arr)
		{
			it(`${arr[0]}`, function ()
			{
				// @ts-ignore
				let ret = fn(arr[1]);

				expect(ret).have.lengthOf(10);
			});
		});
	});

});
