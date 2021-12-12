import { coreFnRandSumFloat, ISumNumParameterWuthCache } from './internal/sum-num';
import { IRNGLike } from '@lazy-random/rng-abstract';

export default (random: IRNGLike, size: number, sum?: number, min?: number, max?: number, fractionDigits?: number) =>
{
	return coreFnRandSumFloat({
		random,
		size,
		sum,
		min,
		max,
		fractionDigits,
	})
}


