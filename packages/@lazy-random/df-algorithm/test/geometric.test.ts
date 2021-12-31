import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfGeometric } from '../src/index';

test('geometric() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfGeometric(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		expect(typeof v).toBe('number')
	}
})
