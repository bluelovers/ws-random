import { Random } from '../random';
import { RNG } from '@lazy-random/rng-abstract'
import { expect } from '@lazy-random/expect';

export default (random: Random, likelihood: number = 0.5) =>
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

