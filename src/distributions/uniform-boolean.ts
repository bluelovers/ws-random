import { Random } from '../random';
import RNG from '../rng'
import { ow } from '../util/ow'

export default (random: Random, likelihood: number = 0.5) =>
{
	ow(likelihood, ow.number.gt(0).lt(1))

	return () =>
	{
		return (random.next() >= likelihood)
	}
}
// @ts-ignore
Object.freeze(exports)
