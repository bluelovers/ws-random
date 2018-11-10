import ow from '../util/ow'
import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, p = 0.5) =>
{
	ow(p, ow.number.gte(0).lte(1))

	return () =>
	{
		return (random.next() + p) | 0
	}
}
// @ts-ignore
Object.freeze(exports)
