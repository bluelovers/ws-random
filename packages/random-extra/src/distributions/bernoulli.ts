import { expect } from '@lazy-random/expect';

import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, p = 0.5) =>
{
	//ow(p, ow.number.gte(0).lte(1))
	expect(p).number.gte(0).lte(1)

	return () =>
	{
		return Math.floor(random.next() + p)
	}
}

