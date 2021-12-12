import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfExponential(random: IRNGLike, lambda = 1)
{
	//ow(lambda, ow.number.positive)
	expect(lambda).number.gt(0)

	return () =>
	{
		return -Math.log(1 - random.next()) / lambda
	}
}

