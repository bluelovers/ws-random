import { expect } from '@lazy-random/expect';
import { dfUniformByte } from './byte';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfUniformBytes(random: IRNGLike, size: number, toStr: true): () => string[]
export function dfUniformBytes(random: IRNGLike, size?: number, toStr?: false): () => number[]
export function dfUniformBytes(random: IRNGLike, size?: number, toStr?: boolean): (() => string[]) | (() => number[])
export function dfUniformBytes(random: IRNGLike, size: number = 1, toStr?: boolean)
{
	expect(size).integer.gt(0);
	const fn = dfUniformByte(random, toStr);

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

export default dfUniformBytes
