import random from '../random';
import { Random } from '../random';
import uniformInt from './uniform-int';
import { expect, assert } from '../util/ow'
import { swapAlgorithm } from '../util/array';
import { UtilDistributions } from '../util/distributions';
import * as UtilMath from '../util/math';

import _sumNumCore, { ISumNumParameter } from './internal/sum-num';

/**
 * @todo support max < 1
 * @fixme bug when min < 0
 */
export default (random: Random, size: number, sum?: number, min?: number, max?: number, noUnique?: boolean) =>
{
	if (typeof min !== 'undefined' && min !== null)
	{
		expect(min).to.be.an.integer();
	}

	if (typeof max !== 'undefined' && max !== null)
	{
		expect(max).to.be.an.integer();
	}

	//expect(Math.abs(max - min), 'max - min').gte(Math.max(size, UtilMath.sum_1_to_n(size) - Math.abs(min)));
	//expect(max / size, 'max / size').gte(min);

	return _sumNumCore({
		random,
		size,
		sum,
		min,
		max,
		//fn: uniformInt(random, min, max),
		fn2: UtilDistributions.int,
		chk_sum: true,
		noUnique,
		chkSize(data: ISumNumParameter)
		{
			if (!data.noUnique)
			{
				let n1 = Math.abs(data.max - data.min);
				let n2 = UtilMath.sum_1_to_n(data.size);

				let n3 = Math.max(data.size, n2 - Math.abs(data.min));

				let n4 = data.max / data.size;

				/*
				console.dir({
					n1,
					n2,
					n3,
					n4,
					size: data.size,
					sum: data.sum,
					max: data.max,
					min: data.min,
				});
				*/

				expect(n1, 'max - min').gte(n3);
				expect(n4, 'max / size').gte(data.min);
			}
		},
		intMode: true,
	})
}

// @ts-ignore
Object.freeze(exports)
