import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfIrwinHall } from '../src/index';

test('irwinHall() produces numbers', () =>
{
	const r = newRngSeedRandom()
	const d = dfIrwinHall(r)
	for (let i = 0; i < 10000; ++i)
	{
		const v = d()
		expect(typeof v).toBe('number')
	}
})
