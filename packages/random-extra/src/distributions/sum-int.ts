import random from '../random';
import { Random } from '../random';
import { coreFnRandSumInt } from './internal/sum-num';
import uniformInt from './uniform-int';
import { expect, assert } from '../util/ow'
import { swapAlgorithm } from '../util/array';
import { UtilDistributions } from '../util/distributions';
import * as UtilMath from '../util/math';
import { ISumNumParameter } from './internal/sum-num';

export default (random: Random, size: number, sum?: number, min?: number, max?: number, limit?: number) =>
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


