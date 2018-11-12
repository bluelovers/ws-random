import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, ...args: number[]) =>
{
	const normal = random.dfNormal(...args)

	return () =>
	{
		return Math.exp(normal())
	}
}
// @ts-ignore
Object.freeze(exports)
