import random from '../random';
import { Random } from '../random';
import uniformInt from './uniform-int';
import { ow, expect, assert } from '../util/ow'
import { swapAlgorithm } from '../util/array';
import { UtilDistributions } from '../util/distributions';
import * as UtilMath from '../util/math';

import _sumNumCore from './internal/sum-num';

export default (random: Random, size: number, min: number, max?: number) =>
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
	expect(max).to.be.an.integer.gt(min);
	// @ts-ignore
	expect(size).to.be.an.integer.gt(1);

	expect(max - min, 'max - min').gte(Math.max(size, UtilMath.sum_1_to_n(size)));
	expect(max / size, 'max / size').gte(min);

	return _sumNumCore(
		random,
		size,
		min,
		max,
		uniformInt(random, min, max),
		UtilDistributions.int,
		true,
	)
}

// @ts-ignore
Object.freeze(exports)
