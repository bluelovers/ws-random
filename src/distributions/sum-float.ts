import random from '../random';
import { Random } from '../random';
import * as UtilMath from '../util/math';
import _sumNumCore from './internal/sum-num';
import uniformFloat from './uniform';
//import { ow } from '../util/ow'
import { swapAlgorithm } from '../util/array';
import { UtilDistributions } from '../util/distributions';
import uniformInt from './uniform-int';
import { ow, expect, assert } from '../util/ow'

export default (random: Random, size: number, min: number, max?: number) =>
{
	if (max === undefined)
	{
		max = min;
		min = 0
	}

	// @ts-ignore
	expect(min).number();
	expect(max).gt(min);
	// @ts-ignore
	expect(size).integer.gt(1);
	expect(max / size, 'max / size').gt(min);

	return _sumNumCore(
		random,
		size,
		min,
		max,
		uniformFloat(random, min, max / (max / size)),
		UtilDistributions.float,
	)
}

// @ts-ignore
Object.freeze(exports)
