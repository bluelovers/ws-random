import { array_unique } from 'array-hyper-unique';
import { ITSArrayLikeWriteable } from 'ts-type/generic';
import { IArrayInput02 } from '../type';

/**
 * Created by user on 2018/10/24/024.
 */
import { _MathRandom } from '../util';

export function swapAlgorithm<T extends IArrayInput02<any>>(arr: T,
	overwrite?: boolean,
	fn: (n: number, ...argv) => number = randIndex,
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
	fn: (n: number, ...argv) => number = randIndex,
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
