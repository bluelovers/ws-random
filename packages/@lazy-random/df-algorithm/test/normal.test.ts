import inDelta from 'num-in-delta'
import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfNormal } from '../src/index';

test('normal() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfNormal(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		expect(typeof v).toBe('number')
	}
})

test('normal(120) has mean 120', () =>
{
	const r = newRngSeedRandom()
	const d = dfNormal(r, 120)
	let sum = 0

	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		sum += v
	}

	const mean = sum / 10000
	expect(inDelta(mean, 120, 0.5)).toBe(true)
})
