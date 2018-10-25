import RNG from '../rng'
import { _MathRandom, cloneClass } from '../util';

export class RNGMathRandom extends RNG
{
	get name()
	{
		return 'math-random2'
	}

	public get seedable()
	{
		return false
	}

	next()
	{
		return _MathRandom()
	}

	seed(seed?, opts?, ...argv)
	{
		// intentionally empty
	}

	clone(seed?, opts?, ...argv): RNGMathRandom
	{
		return cloneClass(RNGMathRandom, this, seed, opts, ...argv)
	}
}

export default RNGMathRandom

// @ts-ignore
Object.freeze(exports)
