import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfExponential } from '../src/index';

test('exponential() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfExponential(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		expect(typeof v).toBe('number')
	}
})
