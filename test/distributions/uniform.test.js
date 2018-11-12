// @allowJs: true
// @checkJs: true
import test from 'ava'
import seedrandom from 'seedrandom'

import inDelta from '../_in-delta'
import random from '../..'
import { expect } from 'chai'

test('random.uniform() is in [0, 1)', (t) =>
{
	const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
	const d = r.dfUniform()
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		t.true(v >= 0)
		t.true(v < 1)
	}
})

test('random.uniform() has mean 0.5', (t) =>
{
	const r = random.clone(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
	const d = r.dfUniform()
	let sum = 0

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		sum += v
	}

	const mean = sum / 10000
	t.true(inDelta(mean, 0.5, 0.05))
})

test('random.uniform(max) returns numbers in [0, max)', (t) =>
{
	const r = random.clone(seedrandom('ODEzYWI1MjQ2NGEwYWExOTRlZTJjYmI4'))
	const d = r.dfUniform(42)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		t.true(v >= 0)
		t.true(v < 42)
	}
})

test('random.uniform(max) has mean max / 2', (t) =>
{
	const r = random.clone(seedrandom('NjcwNjY0MDdiNTEzMmE4Y2I0ZWYxYzNl'))
	const d = r.dfUniform(42)
	let sum = 0

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		sum += v
	}

	const mean = sum / 10000
	t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(min, max) returns numbers in [min, max)', (t) =>
{
	const r = random.clone(seedrandom('NWI0ZWQ0MDBkMGFmZGZkZGU1YjEwMThk'))
	const d = r.dfUniform(10, 42)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		t.true(v >= 10)
		t.true(v < 42)
	}
})

test('random.uniform(min, max) has mean (min + max) / 2', (t) =>
{
	const r = random.clone(seedrandom('M2M2ZGFiZDdkOGUzMjkwOTM1MzQwMWRm'))
	const d = r.dfUniform(10, 42)
	let sum = 0

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		sum += v
	}

	const mean = sum / 10000
	t.true(inDelta(mean, 26, 0.5))
})

test('random.uniformInt(1, 2) is in [1, 2]', (t) =>
{
	const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
	const d = r.dfUniformInt(1, 2)

	let cache = {}

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()

		cache[v] = v
	}

	let arr = Object.keys(cache).map(function (k)
	{
		return cache[k]
	})
	arr.sort(function (a, b)
	{
		return a - b
	})

	expect(arr).to.deep.equal([1, 2])

	t.true(arr.length === 2)
})

test('random.uniformInt(-1, 1) is in [-1, 0, 1]', (t) =>
{
	const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
	const d = r.dfUniformInt(-1, 1)

	let cache = {}

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()

		cache[v] = v
	}

	let arr = Object.keys(cache).map(function (k)
	{
		return cache[k]
	})
	arr.sort(function (a, b)
	{
		return a - b
	})

	expect(arr).to.deep.equal([-1, 0, 1])

	t.true(arr.length === 3)
})
