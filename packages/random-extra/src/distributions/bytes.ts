import { Random } from '../random';
import expect from '../util/ow';
import uniformByte from './byte';

export default function uniformBytes(random: Random, size: number, toStr: true): () => string[]
export default function uniformBytes(random: Random, size: number, toStr?: false): () => number[]
export default function uniformBytes(random: Random, size: number, toStr?: boolean): (() => string[]) | (() => number[])
export default function uniformBytes(random: Random, size: number, toStr?: boolean)
{
	expect(size).integer.gt(0);
	const fn = uniformByte(random, toStr);

	return () =>
	{
		let i = size;
		let arr = [];
		while (i--)
		{
			arr[i] = fn()
		}
		return arr
	}
}

// @ts-ignore
Object.freeze(exports)
