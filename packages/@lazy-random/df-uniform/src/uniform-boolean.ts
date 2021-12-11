import { IRNGLike } from '@lazy-random/rng-abstract'
import { expect } from '@lazy-random/expect';

export function uniformBoolean(random: IRNGLike, likelihood: number = 0.5)
{
	//ow(likelihood, ow.number.gt(0).lt(1))

	expect(likelihood).number
		.gt(0)
		.lt(1)
	;

	return () =>
	{
		return (random.next() >= likelihood)
	}
}

export default uniformBoolean
