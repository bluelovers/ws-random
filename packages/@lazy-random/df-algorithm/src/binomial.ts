import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfBinomial(random: IRNGLike, n: number = 1, p: number = 0.5)
{
	expect(n).integer.gt(0)
	expect(p).number.gte(0).lte(1)

	return () =>
	{
		let i = n
		let x = 0

		while (i--)
		{
			if (random.next() < p)
			{
				x++
			}
		}

		return x
	}
}

