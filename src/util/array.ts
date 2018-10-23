/**
 * Created by user on 2018/10/24/024.
 */
import { _MathRandom } from '../util';

export function swapAlgorithm<T extends unknown>(arr: T[], overwrite?: boolean, fn: (n: number, ...argv) => number = randIndex)
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

// @ts-ignore
Object.freeze(exports)
