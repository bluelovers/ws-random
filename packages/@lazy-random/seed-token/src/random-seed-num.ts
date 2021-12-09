import { MATH_POW_2_32 } from '@lazy-random/shared-lib';
import { _MathRandom } from '@lazy-random/original-math-random';

export function randomSeedNum(): number
{
	return (_MathRandom() * MATH_POW_2_32) + _MathRandom()
}
