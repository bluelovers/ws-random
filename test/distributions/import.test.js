// @allowJs: true
// @checkJs: true
import test from 'ava'
import seedrandom from 'seedrandom'
//import random from '../..'
import { Random, random } from '../../src/random'
import RNGSeedRandom from '../../src/generators/seedrandom';
import inDelta from '../_in-delta';
import { expect } from 'chai'

test('import default', (t) =>
{
	let r = require('../..').default;

	t.true(r instanceof Random)
	t.true(r === random)
})

test('require', (t) =>
{
	let r = require('../..');

	t.true(r instanceof Random)
	t.true(r === random)
})

test('random = random.default', (t) =>
{
	let r = require('../..');

	t.true(random.default instanceof Random)
	t.true(random.default === random)
})
