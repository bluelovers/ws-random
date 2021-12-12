import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfGeometric(random: IRNGLike, p = 0.5)
{
	//ow(p, ow.number.gt(0).lte(1))
	expect(p).number.gt(0).lte(1)

	const invLogP = 1.0 / Math.log(1.0 - p)

	return () =>
	{
		return Math.floor(1 + Math.log(random.next()) * invLogP)
	}
}

