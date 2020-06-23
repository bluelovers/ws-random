import { _MathRandom } from './_random';
import { MATH_POW_2_32 } from './const';

export function randomSeedNum(): number
{
	return (_MathRandom() * MATH_POW_2_32) + _MathRandom()
}
