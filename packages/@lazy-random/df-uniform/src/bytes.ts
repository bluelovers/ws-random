import { expect } from '@lazy-random/expect';
import uniformByte from './byte';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function uniformBytes(random: IRNGLike, size: number, toStr: true): () => string[]
export function uniformBytes(random: IRNGLike, size: number, toStr?: false): () => number[]
export function uniformBytes(random: IRNGLike, size: number, toStr?: boolean): (() => string[]) | (() => number[])
export function uniformBytes(random: IRNGLike, size: number, toStr?: boolean)
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

export default uniformBytes
