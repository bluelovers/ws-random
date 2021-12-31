import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfBernoulli } from '../src/index';

test('bernoulli() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfBernoulli(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		expect(typeof v).toBe('number')
	}
})
