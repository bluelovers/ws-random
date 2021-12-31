import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfPareto } from '../src/index';

test('pareto() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfPareto(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		expect(typeof v).toBe('number')
	}
})
