import random from '../random';
import { Random } from '../random';
import * as UtilMath from '../util/math';
import { coreFnRandSumFloat, ISumNumParameterWuthCache } from './internal/sum-num';
import uniformFloat from './uniform';

import { swapAlgorithm } from '../util/array';
import { UtilDistributions } from '../util/distributions';
import uniformInt from './uniform-int';
import { expect, assert } from '../util/ow'

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

// @ts-ignore
Object.freeze(exports)
