import { fixZero } from '../util/math';
import expect from '../util/ow'
import { Random } from '../random';
import RNG from '../rng'

/**
 * https://zh.wikipedia.org/wiki/%E6%AD%90%E6%96%87%E2%80%93%E8%B3%80%E7%88%BE%E5%88%86%E4%BD%88
 * https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
export default (random: Random, n: number) =>
{
	expect(n).integer.gte(0)
	n = fixZero(n)

	if (n === 0)
	{
		return () => 0
	}

	return (): number =>
	{
		let i = n
		let sum = 0

		while (i--)
		{
			sum += random.next()
		}

		return sum
	}
}

