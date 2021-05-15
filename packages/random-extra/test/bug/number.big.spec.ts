import random from '../..'
import seedrandom from 'seedrandom'

describe(`large ints`, () =>
{
	it(`random.uniformInt(min, max) with large max`, () =>
	{
		const r = random
		const min = 0
		const max = 14206147658
		for (let i = 0; i < 100000; ++i)
		{
			const d = r.int(min, max)
			expect(d).toBeGreaterThanOrEqual(min)
			expect(d).toBeLessThanOrEqual(max)
			expect(d).toStrictEqual(Math.floor(d))
		}

	});
});
