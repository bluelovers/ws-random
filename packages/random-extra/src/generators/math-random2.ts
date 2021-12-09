import { RNG } from '@lazy-random/rng-abstract'
import RNGFunction from './function';
import { _MathRandom } from '@lazy-random/original-math-random';

export class RNGMathRandom2 extends RNGFunction<typeof _MathRandom>
{
	constructor(seed: typeof _MathRandom = _MathRandom, opts?, ...argv)
	{
		super(seed || _MathRandom, opts, ...argv)
	}

	override get name()
	{
		return 'math-random2'
	}
}

export default RNGMathRandom2


