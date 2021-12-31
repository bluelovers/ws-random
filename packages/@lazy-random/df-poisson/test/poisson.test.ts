import { newRngSeedRandom } from '@lazy-random/util-test';
import dfPoisson from '../src/index';

test('poisson() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfPoisson(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		expect(typeof v).toBe('number')
	}
})
