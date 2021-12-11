import { ITSArrayLikeWriteable } from 'ts-type';
import random from '../random';
import { Random } from '../random';
import { TypedArray } from 'ts-type';
import uniformInt from './uniform-int';

import { IArrayInput02 } from '@lazy-random/shared-lib';
import { swapAlgorithm, swapAlgorithm2 } from '@lazy-random/array-algorithm';
import { randIndex as _randIndex } from '@lazy-random/util-distributions';

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


