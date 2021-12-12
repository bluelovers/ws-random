import { coreFnRandSumInt } from './internal/sum-num';
import { IRNGLike } from '@lazy-random/rng-abstract';

export default (random: IRNGLike, size: number, sum?: number, min?: number, max?: number, limit?: number) =>
{
	return coreFnRandSumInt({
		random,
		size,
		sum,
		min,
		max,
		limit,
	})
}


