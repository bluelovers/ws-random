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
import seedrandomOrigin = require('seedrandom');
import RNGSeedRandom from '../../lib/generators/seedrandom';
import { tryRequire } from '../../src/util/req';

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
	describe(`'hello.' 0.9282578795792454`, () =>
	{
		let seed = 'hello.';
		const expected = 0.9282578795792454;

		const count = 10000;
		let val: number;

		// @ts-ignore
		it(`all seedrandom(seed) should has same value`, function ()
		{
			val = [
				random.newUse(seedrandomOrigin('hello.')),
				random.newUse('seedrandom', 'hello.', null),
				random.newUse(RNGSeedRandom.create('hello.', null))
			].reduce(function (pre, rnd, idx)
			{
				let value = rnd.float()

				if (pre !== null)
				{
					expect(value).to.deep.eql(pre);
					expect(value).to.be.closeTo(pre, 0.000001);
					expect(value).to.be.closeTo(pre+1-1, pre+1-1);
				}

				return value
			}, expected)
		});

		it(`rnd.float() = ${expected}`, function ()
		{
			expect(val).to.deep.eql(expected);
		});

	});

	describe(`test sub seedrandom`, () =>
	{
		const subs = [
			'alea', 'tychei', 'xor128', 'xor4096', 'xorshift7', 'xorwow'
		];

		const methods = ['quick', 'int32', 'double'];

		subs.forEach(function (libName)
		{
			it(`RNGSeedRandom.createLib('${libName}', seed, opts)`, () =>
			{
				let seed = 'hello.';
				let opts = null;
				const r = RNGSeedRandom.createLib(libName, seed, opts);

				// @ts-ignore
				const _seedrandom = r._seedrandom;

				let s = _seedrandom(seed, opts);

				//console.log(libName, s.quick(), r.next());

				expect(s).to.have.all.keys(methods);
				expect(r.next()).to.not.be.NaN;

				expect(r.next()).to.float.gt(0).lt(1)

				expect(_seedrandom).to.deep.equal(tryRequire('seedrandom')[libName])

				expect(_seedrandom).is.function();
			})
		});

		subs.forEach(function (libName)
		{
			it(`random.newUse('seedrandom', seed, opts, '${libName}')`, () =>
			{
				let seed = 'hello.';
				let opts = null;
				const r = random.newUse('seedrandom', seed, opts, libName);

				// @ts-ignore
				const _seedrandom = r.rng._seedrandom;

				let s = _seedrandom(seed, opts);

				//console.log(libName, s.quick(), r.next());

				expect(s).to.have.all.keys(methods);
				expect(r.next()).to.not.be.NaN;

				expect(r.next()).to.float.gt(0).lt(1)

				expect(_seedrandom).to.deep.equal(tryRequire('seedrandom')[libName])

				expect(_seedrandom).is.function();
			})
		});

	})

});
