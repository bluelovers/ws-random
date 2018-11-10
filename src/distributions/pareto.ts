import ow from '../util/ow'
import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, alpha: number) =>
{
	ow(alpha, ow.number.gt(0))
	const invAlpha = 1.0 / alpha

	return () =>
	{
		return 1.0 / Math.pow(1.0 - random.next(), invAlpha)
	}
}
// @ts-ignore
Object.freeze(exports)
