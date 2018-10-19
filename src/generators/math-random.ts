import RNG, { _MathRandom } from '../rng'

export class RNGMathRandom extends RNG
{
	get name()
	{
		return 'default'
	}

	next()
	{
		return _MathRandom()
	}

	seed(seed?, opts?)
	{
		// intentionally empty
	}

	clone()
	{
		return new RNGMathRandom()
	}
}

export default RNGMathRandom

// @ts-ignore
Object.freeze(exports)
