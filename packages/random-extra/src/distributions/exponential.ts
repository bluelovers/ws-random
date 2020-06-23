import expect from '../util/ow';

import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, lambda = 1) =>
{
	//ow(lambda, ow.number.positive)
	expect(lambda).number.gt(0)

	return () =>
	{
		return -Math.log(1 - random.next()) / lambda
	}
}

