import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfBinomial } from '../src/index';

test('binomial() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfBinomial(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		expect(typeof v).toBe('number')
	}
})
