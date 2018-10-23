import random from '../random';
import { Random } from '../random';
import uniformInt from './uniform-int';
import ow from 'ow-lite'
import { swapAlgorithm } from '../util/array';

export default (random: Random) =>
{
	const randIndex = (len: number) =>
	{
		return Math.floor(random.next() * len)
	}

	return <T extends Array<unknown>>(arr: T, overwrite?: boolean, fn = randIndex) =>
	{
		return swapAlgorithm(arr, overwrite, fn || randIndex)
	}
}

// @ts-ignore
Object.freeze(exports)
