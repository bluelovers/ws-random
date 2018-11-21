import random from '../random';
import { Random } from '../random';
import * as UtilMath from '../util/math';
import _sumNumCore, { coreFnRandSumFloat, ISumNumParameterWuthCache } from './internal/sum-num';
import uniformFloat from './uniform';

import { swapAlgorithm } from '../util/array';
import { UtilDistributions } from '../util/distributions';
import uniformInt from './uniform-int';
import { expect, assert } from '../util/ow'

/**
 * @todo support max <= 0
 * @fixme bug when min < 0
 */
export default (random: Random, size: number, sum?: number, min?: number, max?: number, noUnique?: boolean) =>
{
	// @ts-ignore
	//expect(min).number();
	//expect(max, 'current only support max > 0').gt(min).gt(0);
	// @ts-ignore
	//expect(size).integer.gt(1);
	//expect(max / size, 'max / size').gt(min);

	return coreFnRandSumFloat({
		random,
		size,
		sum,
		min,
		max,
	})
}

// @ts-ignore
Object.freeze(exports)
