import { IArrayInput02 } from '@lazy-random/shared-lib';
import { arrayRandIndexByLength } from '@lazy-random/array-rand-index';

export function swapAlgorithm<T extends IArrayInput02<any>>(arr: T,
	overwrite?: boolean,
	fn: (n: number, ...argv: any[]) => number = arrayRandIndexByLength,
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
	fn: (n: number, ...argv: any[]) => number = arrayRandIndexByLength,
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
