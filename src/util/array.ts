import { array_unique } from 'array-hyper-unique';

/**
 * Created by user on 2018/10/24/024.
 */
import { _MathRandom } from '../util';

export function swapAlgorithm<T extends unknown>(arr: T[],
	overwrite?: boolean,
	fn: (n: number, ...argv) => number = randIndex,
)
{
	let len: number = arr.length;
	let ret = (overwrite ? arr : arr.slice());

	while (len > 0)
	{
		let idx: number = fn(len--)
		let cache = ret[len]
		ret[len] = ret[idx]
		ret[idx] = cache
	}

	return ret
}

export function randIndex(len: number, ...argv)
{
	return Math.floor(_MathRandom() * len)
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

// @ts-ignore
Object.freeze(exports)
