import { _MathRandom } from '@lazy-random/original-math-random';

export function arrayRandIndexByLength(len: number, ...argv: any[])
{
	return Math.floor(_MathRandom() * len)
}

export function arrayRandIndex(array: any[], ...argv: any[])
{
	return arrayRandIndexByLength(array.length)
}

export default arrayRandIndex
