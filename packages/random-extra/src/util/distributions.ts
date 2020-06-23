import { Random } from '../random';

export function randIndex(random: Random, len: number)
{
	return Math.floor(random.next() * len)
}

export function float(random: Random, min: number, max: number)
{
	return random.next() * (max - min) + min;
}

export function int(random: Random, min: number, max: number)
{
	return Math.floor(float(random, min, max + 1));
}

export const UtilDistributions = exports as typeof import('./distributions')

export default UtilDistributions;
