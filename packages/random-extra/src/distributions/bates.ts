import expect from '../util/ow';

import { Random } from '../random';
import RNG from '../rng'

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

