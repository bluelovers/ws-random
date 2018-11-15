import random from '../random';
import { Random } from '../random';
import uniformInt from './uniform-int';
import { ow, expect, assert } from '../util/ow'
import { swapAlgorithm } from '../util/array';
import { UtilDistributions } from '../util/distributions';
import * as UtilMath from '../util/math';

import _sumNumCore from './internal/sum-num';

/**
 * @todo support max < 1
 * @fixme bug when min < 0
 */
export default (random: Random, size: number, min: number, max?: number, noUnique?: boolean) =>
{
	if (max === undefined)
	{
		max = min;
		min = 0
	}

	//ow(min, ow.number.integer, 'min');
	//ow(max, ow.number.integer.gt(min), 'max');
	//ow(size, ow.number.integer.gt(1), 'size');

	// @ts-ignore
	expect(min).to.be.an.integer();
	// @ts-ignore
	expect(max, 'current only support max > 1').to.be.an.integer.gt(min).gt(1);
	// @ts-ignore
	expect(size).to.be.an.integer.gt(1);

	expect(Math.abs(max - min), 'max - min').gte(Math.max(size, UtilMath.sum_1_to_n(size) - Math.abs(min)));
	expect(max / size, 'max / size').gte(min);

	return _sumNumCore({
		random,
		size,
		min,
		max,
		fn: uniformInt(random, min, max),
		fn2: UtilDistributions.int,
		chk_sum: true,
		noUnique,
	})
}

// @ts-ignore
Object.freeze(exports)
