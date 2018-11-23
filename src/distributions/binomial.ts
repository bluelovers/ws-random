import expect from '../util/ow';

import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, n: number = 1, p: number = 0.5) =>
{
	expect(n).integer.gt(0)
	expect(p).number.gte(0).lte(1)

	return () =>
	{
		let i = 0
		let x = 0

		while (i++ < n)
		{
			// @ts-ignore
			x += (random.next() < p)
		}

		return x
	}
}
// @ts-ignore
Object.freeze(exports)
