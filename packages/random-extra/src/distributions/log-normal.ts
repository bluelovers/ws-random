import { Random } from '../random';
import { RNG } from '@lazy-random/rng-abstract'

// @ts-ignore
export default (random: Random, ...args: Parameters<typeof random.dfNormal>) =>
{
	const normal = random.dfNormal(...args)

	return () =>
	{
		return Math.exp(normal())
	}
}

