import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfPareto(random: IRNGLike, alpha: number = 1)
{
	//ow(alpha, ow.number.gt(0))
	expect(alpha).gt(0);
	const invAlpha = 1.0 / alpha

	return () =>
	{
		return 1.0 / Math.pow(1.0 - random.next(), invAlpha)
	}
}

