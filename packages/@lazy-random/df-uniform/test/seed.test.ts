import { dfUniformFloat } from '../src/index';
import { newRngSeedRandom, newRngFactory } from '@lazy-random/util-test';
import seedrandom from 'seedrandom';

test('random.newUse witth a seed is consistent', () =>
{
	const d = dfUniformFloat(newRngFactory(seedrandom('ZjExZDczNWQxY2NlZjUzYmRiZWU0ZGIz')))
	const o = []
	for (let i = 0; i < 100; ++i)
	{
		const v = d()
		o.push(v)
	}

	expect(o).toMatchSnapshot()
})

test('random.newUse witth a seed is consistent 2', () =>
{
	const d = dfUniformFloat(newRngSeedRandom())
	const o = []
	for (let i = 0; i < 100; ++i)
	{
		const v = d()
		o.push(v)
	}

	expect(o).toMatchSnapshot()
})
