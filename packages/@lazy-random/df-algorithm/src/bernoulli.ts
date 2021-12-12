import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfBernoulli(random: IRNGLike, p = 0.5)
{
	//ow(p, ow.number.gte(0).lte(1))
	expect(p).number.gte(0).lte(1)

	return () =>
	{
		return Math.floor(random.next() + p)
	}
}

