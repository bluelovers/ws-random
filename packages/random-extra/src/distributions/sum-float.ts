import random from '../random';
import { Random } from '../random';
import * as UtilMath from '../util/math';
import { coreFnRandSumFloat, ISumNumParameterWuthCache } from './internal/sum-num';
import { uniformFloat } from '@lazy-random/df-uniform';

import { uniformInt } from '@lazy-random/df-uniform';
import { expect } from '@lazy-random/expect';
import { swapAlgorithm } from '@lazy-random/array-algorithm';

export default (random: Random, size: number, sum?: number, min?: number, max?: number, fractionDigits?: number) =>
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


