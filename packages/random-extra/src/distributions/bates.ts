import { expect } from '@lazy-random/expect';

import { Random } from '../random';
import { RNG } from '@lazy-random/rng-abstract'

export default (random: Random, n: number = 1) =>
{
	//ow(n, ow.number.integer.positive)
	expect(n).integer.gt(0)

	const irwinHall = random.dfIrwinHall(n)

	return () =>
	{
		return irwinHall() / n
	}
}

