// @allowJs: true
// @checkJs: true
import test from 'ava'
import seedrandom from 'seedrandom'

import inDelta from '../_in-delta'
import random from '../..'
import { expect } from 'chai'

test('dfArrayUnique', (t) =>
{
	let arr = [1, 2, 3, 4];

	const d = random.dfArrayUnique(arr, 3, true);

	let cache = {}

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()

		cache[v] = v;
	}

	Object.values(cache)
		.forEach(function (v)
		{
			expect(v).to.be.oneOf(arr)
		})
	;

	t.true(true)
});

test('[dfArrayUnique] return another when out of limit', (t) =>
{
	let arr = [1, 2, 3, 4];
	let limit = 3;

	let arr2 = [7, 8, 9]

	const d = random.dfArrayUnique(arr, limit, true, null, function ()
	{
		return arr2
	});

	let cache = {}
	let cache2 = {}

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()

		if (i >= limit)
		{
			cache2[v] = v;
		}
		else
		{
			cache[v] = v;
		}
	}

	Object.values(cache)
	.forEach(function (v)
	{
		expect(v).to.be.oneOf(arr)
		expect(v).to.not.oneOf(arr2)
	})
;
	Object.values(cache2)
		.forEach(function (v)
		{
			expect(v).to.be.oneOf(arr2)
			expect(v).to.not.oneOf(arr)
		})
	;

	t.true(true)
});
