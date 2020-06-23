import RNG from '../rng'
import { cloneClass } from '../util';
import { _MathRandom } from '../util/_random';

export class RNGMathRandom extends RNG
{
	get name()
	{
		return 'math-random'
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


