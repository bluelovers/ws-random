import { Random } from '../../random';
import { UtilDistributions } from '../../util/distributions';
import * as UtilMath from '../../util/math';

export default function ({
	random,
	size,
	min,
	max,
	fn,
	fn2,
	chk_sum,
	noUnique,
} : {
	random: Random,
	size: number,
	min: number,
	max: number,
	fn: () => number,
	fn2: (...args: Parameters<typeof UtilDistributions.int>) => number,
	chk_sum?: boolean,
	noUnique?: boolean,
})
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

			bool = chk(ret, size, min, max, noUnique)
		}
		while(bool);

		return ret
	}
}

function chk(
	ret: number[],
	size: number,
	min: number,
	max: number,
	noUnique: boolean,
)
{
	return ret
		.filter(function (n, idx)
		{
			return n >= min
				&& n <= max
				&& (noUnique || idx === ret.indexOf(n))
		})
		.length !== size
		;
}
