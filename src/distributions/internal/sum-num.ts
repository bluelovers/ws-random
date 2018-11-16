import { Random } from '../../random';
import { UtilDistributions } from '../../util/distributions';
import { sum_1_to_n } from '../../util/math';
import * as UtilMath from '../../util/math';
import { expect } from '../../util/ow';
import uniformInt from '../uniform-int';

export default coreFn2

export interface ISumNumParameterBase
{
	random: Random,

	size: number,

	fn?: (min?: number, max?: number) => number,
	fn2: (...args: Parameters<typeof UtilDistributions.int>) => number,

	chk_sum?: boolean,
	noUnique?: boolean,

	chkSize?(data: ISumNumParameter): boolean | void,

	intMode?: boolean,
}

export interface ISumNumParameter extends ISumNumParameterBase
{
	min?: number,
	max?: number,
	sum?: number,
}

export function coreFn2({
	random,
	size,
	min,
	max,
	fn,
	fn2,
	chk_sum,
	noUnique,
	sum,
	chkSize,
	intMode,
}: ISumNumParameter)
{
	expect(size).integer.gt(1);

	let abs2 = sum_1_to_n(size);

	if (typeof sum === 'undefined' || sum === null)
	{
		sum = abs2
	}

	expect(sum).number();
	//let abs1 = Math.abs(sum);

	if (typeof min === 'undefined' || min === null)
	{
		if (sum > 0)
		{
			min = 0;
		}
		else
		{
			min = sum - Math.floor(abs2 / 2)
		}
	}

	if (typeof max === 'undefined' || max === null)
	{
		if (sum > 0)
		{
			max = sum;
		}
		else
		{
			max = sum + Math.floor(abs2 / 2)
		}
	}

	expect(min).number();
	expect(max).number.gt(min);

	if (min >= 0)
	{
		expect(sum).gt(min);
	}

	if (sum < 0)
	{
		expect(min).lt(sum);
	}

	chk_sum = !!chk_sum;
	noUnique = !!noUnique;
	const doUnique = !noUnique;

	if (!fn)
	{
		fn = (min, max) => fn2(random, min, max)
	}

	if (chkSize)
	{
		chkSize({
			random,
			size,
			min,
			max,
			fn,
			fn2,
			chk_sum,
			noUnique,
			sum,
			chkSize,
		})
	}

	return () =>
	{
		let ret: number[] = [];
		let bool: boolean;

		LABEL_TOP: do
		{
			let total = sum;
			let i = size - 1;
			let n: number;

			let prev: number;

			prev = ret[i] = fn(min, max);

			LABEL_SUB: while (i > 1)
			{
				let j = i;

				n = total - ret[j];

				if (n <= min)
				{
					bool = true;
					//console.log(ret);
					continue LABEL_TOP;
				}
				else if (n > max)
				{
					n = max;
				}

				let cur = fn2(random, min, n);

				if (doUnique && prev === cur)
				{
					bool = true;
					//console.log(ret);
					continue LABEL_SUB;
				}

				total -= ret[j--];
				prev = ret[j] = cur;

				i = j;
			}

			let cur = total - ret[i];
			if (
				cur > max
				|| cur < min
				|| doUnique && prev === cur
			)
			{
				bool = true;
				//console.log(ret);
				continue LABEL_TOP;
			}

			ret[0] = cur;
			//console.log(ret);
			bool = chk(ret, size, sum, min, max, noUnique);
		}
		while (bool)

		return ret
	}

}

/**
 * @deprecated
 */
export function coreFn1({
	random,
	size,
	min,
	max,
	fn,
	fn2,
	chk_sum,
	noUnique,
}: ISumNumParameter)
{
	chk_sum = !!chk_sum;
	noUnique = !!noUnique;

	return () =>
	{
		let ret: number[] = [];
		let bool: boolean;

		LABEL_TOP: do
		{
			let sum = max;
			let i = size - 1;
			let n: number;

			ret[i] = fn();

			LABEL_SUB: while (i > 1)
			{
				n = sum - ret[i];

				if (n < min || chk_sum && n < (UtilMath.sum_1_to_n(i) + min))
				{
					bool = true;
					continue LABEL_TOP;
				}

				sum -= ret[i--];

				ret[i] = fn2(random, min, n);
			}

			ret[0] = sum - ret[i];

			bool = chk(ret, size, sum, min, max, noUnique)
		}
		while (bool);

		return ret
	}
}

export function chk(
	ret: number[],
	size: number,
	sum: number,
	min: number,
	max: number,
	noUnique: boolean,
)
{
	let total = 0;

	return ret
		.filter(function (n, idx)
		{
			total += n;

			return n >= min
				&& n <= max
				&& (noUnique || idx === ret.indexOf(n))
		})
		.length !== size && total === sum
		;
}
