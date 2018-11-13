import random from '../random';
import { Random } from '../random';
import uniformInt from './uniform-int';
import { ow } from '../util/ow'
import { swapAlgorithm } from '../util/array';
import { randIndex as _randIndex } from '../util/distributions';

export default (random: Random) =>
{
	const randIndex = (len: number) =>
	{
		return _randIndex(random, len)
	}

	return <T extends Array<unknown>>(arr: T, overwrite?: boolean, fn = randIndex) =>
	{
		return swapAlgorithm(arr, overwrite, fn || randIndex)
	}
}

// @ts-ignore
Object.freeze(exports)
