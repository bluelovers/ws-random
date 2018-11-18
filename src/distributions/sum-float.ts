import random from '../random';
import { Random } from '../random';
import * as UtilMath from '../util/math';
import _sumNumCore, { ISumNumParameterWuthCache } from './internal/sum-num';
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

	if (sum > 0)
	{
		if (!max && !min)
		{
			max = sum;
			min = 0
		}
	}
	else if (sum < 0)
	{
		if (!max && !min)
		{
			max = 0;
			min = sum
		}
	}

	return _sumNumCore({
		random,
		size,
		sum,
		min,
		max,
		//fnFirst: uniformFloat(random, min, max / (max / size)),
		fnNext: UtilDistributions.float,
		chk_sum: null,
		noUnique,
		verifyFn(argv: ISumNumParameterWuthCache)
		{
			if (!argv.fnFirst)
			{
				let n = (argv.max - argv.min);
				let n2 = (n / (n / argv.size))
				let n3 = Math.abs(n2) + argv.min;

				if (argv.sum < 0)
				{
					n3 = argv.max - Math.abs(n2)
				}

				if (n3 > argv.max || n3 < argv.min)
				{
					argv.fnFirst = uniformFloat(random, argv.min, argv.max)
				}
				else
				{
					let n5 = (argv.max + argv.min) / 2;

					//console.log(n5, n3);

					if (n3 > n5)
					{
						argv.fnFirst = uniformFloat(random, n5, argv.max)
					}
					else
					{
						argv.fnFirst = uniformFloat(random, argv.min, n5)
					}
				}
			}

		},
	})
}

// @ts-ignore
Object.freeze(exports)
