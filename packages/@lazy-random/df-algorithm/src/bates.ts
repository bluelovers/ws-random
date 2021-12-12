import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { dfIrwinHall } from './irwin-hall'

export function dfBates(random: IRNGLike, n: number = 1)
{
	//ow(n, ow.number.integer.positive)
	expect(n).integer.gt(0)

	const irwinHall = dfIrwinHall(random, n)

	return () =>
	{
		return irwinHall() / n
	}
}
