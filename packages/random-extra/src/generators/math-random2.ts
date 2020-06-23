import RNG from '../rng'
import RNGFunction from './function';
import { _MathRandom } from '../util';

export class RNGMathRandom2 extends RNGFunction<typeof _MathRandom>
{
	constructor(seed: typeof _MathRandom = _MathRandom, opts?, ...argv)
	{
		super(seed || _MathRandom, opts, ...argv)
	}

	get name()
	{
		return 'math-random2'
	}
}

export default RNGMathRandom2


