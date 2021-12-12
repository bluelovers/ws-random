import { ITSArrayLikeWriteable } from 'ts-type/lib/generic';
import { TypedArray } from 'typedarray-dts';
import { swapAlgorithm2 } from '@lazy-random/array-algorithm';
import { randIndex as _randIndex } from '@lazy-random/util-distributions';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfArrayShuffle<T extends ITSArrayLikeWriteable<any> | TypedArray | Buffer>(random: IRNGLike, arr: T, overwrite?: boolean): () => T
{
	const randIndex = (len: number) =>
	{
		return _randIndex(random, len)
	};

	if (!overwrite)
	{
		let cloneArrayLike: (arr: T) => T;

		if (Buffer.isBuffer(arr))
		{
			// @ts-ignore
			cloneArrayLike = (arr) =>
			{
				// @ts-ignore
				return Buffer.from(arr)
			};
		}
		else
		{
			cloneArrayLike = (arr) =>
			{
				// @ts-ignore
				return arr.slice()
			};
		}

		return (): T =>
		{
			return swapAlgorithm2(cloneArrayLike(arr), true, randIndex)
		}
	}

	return (): T =>
	{
		return swapAlgorithm2(arr, true, randIndex)
	}
}

dfArrayShuffle.memoizable = false;

export default dfArrayShuffle;


