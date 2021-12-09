import { RNG } from '@lazy-random/rng-abstract'
import { cloneClass } from '../util';
import { _MathRandom } from '@lazy-random/original-math-random';

export class RNGMathRandom extends RNG
{
	override get name()
	{
		return 'math-random'
	}

	public override get seedable()
	{
		return false
	}

	next()
	{
		return _MathRandom()
	}

	override seed(seed?, opts?, ...argv)
	{
		// intentionally empty
	}

	override clone(seed?, opts?, ...argv): RNGMathRandom
	{
		return cloneClass(RNGMathRandom, this, seed, opts, ...argv)
	}
}

export default RNGMathRandom


