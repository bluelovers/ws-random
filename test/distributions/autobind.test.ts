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
import random from '../..'
import seedrandom = require('seedrandom');

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
	describe(`core-decorators<@autobind>`, () =>
	{

		[
			'next',
			'random',
		].forEach((method) => {

			it(`.${method}`, function ()
			{
				let fn = random[method];

				expect(fn).is.an.function();
				expect(fn).to.deep.equal(random[method])
				expect(fn()).is.an.number();
			});

		});

		it(`.seed`, function ()
		{
			let fn = random.seed;

			expect(fn).is.an.function();
			expect(fn).to.deep.equal(random.seed)
			expect(fn()).is.deep.equal(random);
		});

	});

});
