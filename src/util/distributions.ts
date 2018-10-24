import { Random } from '../random';

export function randIndex(random: Random, len: number)
{
	return Math.floor(random.next() * len)
}

// @ts-ignore
Object.freeze(exports)
