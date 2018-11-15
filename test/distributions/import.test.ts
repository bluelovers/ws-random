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
	describe(`import`, () =>
	{

		it(`import default`, function ()
		{
			let r = require('../..').default;

			expect(r).is.instanceof((Random));
			expect(r).to.deep.equal(random)
		});

		it(`require`, function ()
		{
			let r = require('../..');

			expect(r).is.instanceof((Random));
			expect(r).to.deep.equal(random)
		});

		it(`random = random.default`, function ()
		{
			let r = require('../..');

			expect(r.default).is.instanceof((Random));
			expect(r.default).to.deep.equal(random)
		});

	});

});
