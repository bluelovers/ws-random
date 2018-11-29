import { ITSArrayLikeWriteable } from 'ts-type';
import random from '../random';
import { Random } from '../random';
import uniformInt from './uniform-int';

import { swapAlgorithm, swapAlgorithm2 } from '../util/array';
import { randIndex as _randIndex } from '../util/distributions';

export default <T extends ITSArrayLikeWriteable<any>>(random: Random, arr: T, overwrite?: boolean) =>
{
	const randIndex = (len: number) =>
	{
		return _randIndex(random, len)
	}

	return <T extends ITSArrayLikeWriteable<any>>(arr: T) =>
	{
		return swapAlgorithm2(arr, overwrite, randIndex)
	}
}

// @ts-ignore
Object.freeze(exports)
