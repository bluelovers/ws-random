import { Random } from '../random';
import RNG from '../rng'

// @ts-ignore
export default (random: Random, ...args: Parameters<typeof random.dfNormal>) =>
{
	const normal = random.dfNormal(...args)

	return () =>
	{
		return Math.exp(normal())
	}
}

