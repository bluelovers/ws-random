import ow from 'ow-lite'
import { Random } from '../random';
import RNG from '../rng'

/**
 * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
export default (random: Random, n: number) =>
{
	ow(n, ow.number.integer.gte(0))

	return () =>
	{
		let sum = 0
		for (let i = 0; i < n; ++i)
		{
			sum += random.next()
		}

		return sum
	}
}
// @ts-ignore
Object.freeze(exports)
