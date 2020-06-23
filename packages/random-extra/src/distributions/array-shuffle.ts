import { ITSArrayLikeWriteable } from 'ts-type';
import random from '../random';
import { Random } from '../random';
import { IArrayInput02, TypedArray } from '../type';
import uniformInt from './uniform-int';

import { swapAlgorithm, swapAlgorithm2 } from '../util/array';
import { randIndex as _randIndex } from '../util/distributions';

function arrayShuffle<T extends ITSArrayLikeWriteable<any> | TypedArray | Buffer>(random: Random, arr: T, overwrite?: boolean): () => T
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

arrayShuffle.memoizable = false;

export default arrayShuffle;


