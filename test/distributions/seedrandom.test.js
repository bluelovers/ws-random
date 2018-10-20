// @allowJs: true
// @checkJs: true
import test from 'ava'
import seedrandom from 'seedrandom'
import random from '../..'
import RNGSeedRandom from '../../src/generators/seedrandom';
import inDelta from '../_in-delta';
import { expect } from 'chai'

test('float check', (t) =>
{
	expect(0.9).to.not.eql(0.8)
	expect(0.999).to.not.eql(0.998)
	expect(0.999).to.eql(0.999)
	expect(0.9).to.eql(0.9)

	expect(0.9282578795792454).to.not.deep.eql(0.9282578795792454 + 2 - 1 - 1);
	expect(0.9282578795792454).to.not.deep.eql(0.9282578795792453);

	t.true(true)
})

test(`'hello.' 0.9282578795792454`, (t) =>
{
	let val = [
		random.newUse(seedrandom('hello.')),
		random.newUse('seedrandom', 'hello.', null),
		random.newUse(RNGSeedRandom.create('hello.', null))
	].reduce(function (pre, rnd, idx)
	{
		let value = rnd.float()

		if (pre !== null)
		{
			expect(value).to.deep.eql(pre);
			expect(value).to.be.closeTo(pre, pre);
			expect(value).to.be.closeTo(pre+1-1, pre+1-1);
		}

		return value
	}, 0.9282578795792454)

	expect(val).to.deep.eql(0.9282578795792454);

	t.true(true)
})
