import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfBates } from '../src/index';

test('bates() produces numbers', () =>
{
	const r = newRngSeedRandom();
	const fn = dfBates(r);
	for (let i = 0; i < 10000; ++i)
	{
		const v = fn();
		expect(typeof v).toBe('number');
	}
})
