/**
 * Created by user on 2018/11/16/016.
 */

/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />

import RNG from '../../src/rng';
import random, { Random } from '../../src/'
import seedrandomOrigin from 'seedrandom';
import RNGSeedRandom from '../../src/generators/seedrandom';
import { tryRequire } from '../../src/util/req';
import checkTypesMatchers from '../jest/type';

expect.extend(checkTypesMatchers);

// @ts-ignore
describe(`'hello.' 0.9282578795792454`, () =>
{
	let seed = 'hello.';
	const expected = 0.9282578795792454;

	const count = 10000;
	let val: number;

	it(`RNGSeedRandom`, () =>
	{
		expect(RNGSeedRandom.create('hello.', null)).toBeInstanceOf(RNG);
	});

	// @ts-ignore
	it(`all seedrandom(seed) should has same value`, () =>
	{
		val = [
			random.newUse(seedrandomOrigin('hello.')),
			random.newUse('seedrandom', 'hello.', null),
			random.newUse(RNGSeedRandom.create('hello.', null)),
		].reduce(function (pre, rnd, idx)
		{
			let value = rnd.float()

			if (pre !== null)
			{
				// idx.toString()
				expect(value).toEqual(pre);
				expect(value).toBeCloseToWithDelta(pre, 0.000001);
				expect(value).toBeCloseToWithDelta(pre + 1 - 1, pre + 1 - 1);
			}

			return value
		}, expected)
	});

	it(`rnd.float() = ${expected}`, () =>
	{
		expect(val).toEqual(expected);
	});

});

describe(`test sub seedrandom`, () =>
{
	const subs = [
		'alea', 'tychei', 'xor128', 'xor4096', 'xorshift7', 'xorwow',
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

			expect(s).toContainAllKeys(methods);
			expect(r.next()).not.toBeNaN();

			let v = r.next();

			expect(v).toBeFloat();
			expect(v).toBeGreaterThan(0)
			expect(v).toBeLessThan(1)

			expect(_seedrandom).toEqual(tryRequire('seedrandom')[libName])

			expect(_seedrandom).toBeInstanceOf(Function);
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

			expect(s).toContainAllKeys(methods);
			expect(r.next()).not.toBeNaN();

			let v = r.next();

			expect(v).toBeFloat();
			expect(v).toBeGreaterThan(0)
			expect(v).toBeLessThan(1)

			expect(_seedrandom).toEqual(tryRequire('seedrandom')[libName])

			expect(_seedrandom).toBeInstanceOf(Function);
		})
	});

})

