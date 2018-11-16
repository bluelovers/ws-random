import random from '../random';
import { Random } from '../random';
import * as UtilMath from '../util/math';
import _sumNumCore from './internal/sum-num';
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

	return _sumNumCore({
		random,
		size,
		sum,
		min,
		max,
		//fn: uniformFloat(random, min, max / (max / size)),
		fn2: UtilDistributions.float,
		chk_sum: null,
		noUnique,
	})
}

// @ts-ignore
Object.freeze(exports)
