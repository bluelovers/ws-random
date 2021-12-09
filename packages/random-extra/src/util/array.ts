import { arrayRandIndexByLength } from '@lazy-random/array-rand-index';
import { IArrayInput02 } from '@lazy-random/shared-lib';

export function swapAlgorithm<T extends IArrayInput02<any>>(arr: T,
	overwrite?: boolean,
	fn: (n: number, ...argv) => number = arrayRandIndexByLength,
)
{
	let i: number = arr.length;
	// @ts-ignore
	let ret = (overwrite ? arr : arr.slice());

	while (i)
	{
		let idx: number = fn(i--);

		if (i === idx) continue;

		let cache = ret[i];
		ret[i] = ret[idx];
		ret[idx] = cache;

		//console.log(i, idx, ret);
	}

	return ret
}

export function swapAlgorithm2<T extends IArrayInput02<any>>(arr: T,
	overwrite?: boolean,
	fn: (n: number, ...argv) => number = arrayRandIndexByLength,
): T
{
	let i: number = arr.length;
	// @ts-ignore
	let ret = (overwrite ? arr : arr.slice());
	let len = i;
	let j = Math.ceil(len / 2);

	while (i)
	{
		let idx: number = fn(len);
		i--;

		if (idx === i)
		{
			if (i < j)
			{
				idx = fn(len)
			}
			else
			{
				idx = fn(i)
			}
		}

		if (i === idx) continue;

		let cache = ret[i];
		ret[i] = ret[idx];
		ret[idx] = cache;

		//console.log(i, idx, ret);
	}

	return ret
}

/**
 * back to original interval
 */
export function array_rebase(ret_b: number[], n_diff: number, min: number, max: number)
{
	let b_sum = 0;

	let bool: boolean;

	let i = ret_b.length;

	if (typeof min === 'number' || typeof max === 'number')
	{
		while (i--)
		{
			let v = ret_b[i];
			let n = v + n_diff;

			if (n >= min && n <= max)
			{
				bool = true;
				ret_b[i] = n;

				b_sum += n
			}
			else
			{
				bool = false;
				break;
			}
		}
	}
	else
	{
		while (i--)
		{
			let v = ret_b[i];
			let n = v + n_diff;

			ret_b[i] = n;

			b_sum += n
		}

		bool = true;
	}

	return {
		bool,
		b_sum,
	};
}


