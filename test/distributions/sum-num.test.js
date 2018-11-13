// @allowJs: true
// @checkJs: true
import test from 'ava'
import seedrandom from 'seedrandom'
import sumFloat from '../../src/distributions/sum-float';

import inDelta from '../_in-delta'
import random from '../..'
import { expect } from 'chai'

test('dfSumInt(3, 1, 6)', (t) =>
{
	const size = 3;
	const min = 1;
	const max = 6;
	const evs = [ 1, 2, 3 ];

	const d = random.dfSumInt(size, min, max);

	let cache = {}

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
			expect(sum).closeTo(max, 0.01);

			expect(v).to.have.members(evs);
		})
	;

	t.true(true)
});

test('dfSumFloat(3, 1, 6)', (t) =>
{
	const size = 3;
	const min = 1;
	const max = 6;


	const d = random.dfSumFloat(size, min, max);

	let cache = {}

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
			expect(sum).closeTo(max, 0.01);

		})
	;

	t.true(true)
});
