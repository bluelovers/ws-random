import ow from 'ow-lite'
import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, n) =>
{
	ow(n, ow.number.integer.greaterThanOrEqual(0))

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
