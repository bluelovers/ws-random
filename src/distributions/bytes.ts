import { Random } from '../random';
import expect from '../util/ow';
import uniformByte from './uniform-byte';

export default function uniformBytes(random: Random, size: number, toStr: true): () => string[]
export default function uniformBytes(random: Random, size: number, toStr?: false): () => number[]
export default function uniformBytes(random: Random, size: number, toStr?: boolean): (() => string[]) | (() => number[])
export default function uniformBytes(random: Random, size: number, toStr?: boolean)
{
	expect(size).integer.gt(0)

	const fn = uniformByte(random, toStr)

	return () =>
	{
		let arr = []
		for (let i = 0; i < size; i++)
		{
			arr.push(fn())
		}
		return arr
	}
}

// @ts-ignore
Object.freeze(exports)
