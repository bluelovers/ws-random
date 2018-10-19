import RNG, { _MathRandom } from '../rng'
import RNGFunction from './function';

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

// @ts-ignore
Object.freeze(exports)
