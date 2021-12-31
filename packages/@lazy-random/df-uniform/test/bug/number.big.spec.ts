import { newRngMathRandom } from '@lazy-random/util-test';
import { dfUniformInt } from '../../src/index';

describe(`large ints`, () =>
{
	const rnd = newRngMathRandom();

	it(`random.uniformInt(min, max) with large max`, () =>
	{
		const min = 0
		const max = 14206147658
		for (let i = 0; i < 100000; ++i)
		{
			const d = dfUniformInt(rnd, min, max)();
			expect(d).toBeGreaterThanOrEqual(min)
			expect(d).toBeLessThanOrEqual(max)
			expect(d).toStrictEqual(Math.floor(d))
		}

	});
});
