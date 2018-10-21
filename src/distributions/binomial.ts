import ow from 'ow-lite'
import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, n: number = 1, p: number = 0.5) =>
{
	ow(n, ow.number.positive.integer)
	ow(p, ow.number.gte(0).lte(1))

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
