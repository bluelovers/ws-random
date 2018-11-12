import random from '../random';
import { Random } from '../random';
import uniformFloat from './uniform';
import ow from '../util/ow'
import { swapAlgorithm } from '../util/array';
import { UtilDistributions } from '../util/distributions';

export default (random: Random, size: number, min: number, max?: number) =>
{
	if (max === undefined)
	{
		max = min;
		min = 1
	}

	ow(min, ow.number);
	ow(max, ow.number.gt(min));
	ow(size, ow.number.gt(1));
	ow(max - min, ow.number.gt(size));
	ow(max / size, ow.number.gte(min));

	const fn = uniformFloat(random, min, max);
	const fn2 = UtilDistributions.float;

	const chk = function (ret: number[])
	{
		return ret
			.filter(function (n, idx)
			{
				return n >= min
				&& n <= max
				&& idx === ret.indexOf(n)
			})
			.length !== size
		;
	};

	return () =>
	{
		let ret: number[] = [];
		let bool: boolean;

		do
		{
			ret[0] = fn();

			let n = max - ret[0];

			if (n < min)
			{
				bool = true;
				continue;
			}

			if (n === min)
			{
				ret[1] = n;
			}
			else
			{
				ret[1] = fn2(random, min, n);
			}

			ret[2] = max - ret[1] - ret[0];
			bool = chk(ret)
		}
		while(bool);

		return ret
	}
}

// @ts-ignore
Object.freeze(exports)
