/**
 * Created by user on 2021/12/11.
 */

import { cloneClass } from '@lazy-random/clone-class';
import { _MathRandom } from '@lazy-random/original-math-random';
import { RNGCore } from '@lazy-random/rng-abstract-core';

export class RNGMathRandom extends RNGCore
{
	override get name()
	{
		return 'math-random';
	}

	public override get seedable()
	{
		return false;
	}

	next()
	{
		return _MathRandom();
	}

	override clone(seed?, opts?, ...argv): RNGMathRandom
	{
		return cloneClass(RNGMathRandom, this, seed, opts, ...argv);
	}
}

export default RNGMathRandom;
