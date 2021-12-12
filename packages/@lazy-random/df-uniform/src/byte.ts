import { expect } from '@lazy-random/expect';
import { dfUniformInt } from './uniform-int';
import { stringifyByte } from '@lazy-random/shared-lib';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfUniformByte(random: IRNGLike, toStr: true): () => string
export function dfUniformByte(random: IRNGLike, toStr?: false): () => number
export function dfUniformByte(random: IRNGLike, toStr?: boolean): (() => string) | (() => number)
export function dfUniformByte(random: IRNGLike, toStr?: boolean)
{
	let fn = dfUniformInt(random, 0, 255);

	if (typeof toStr !== 'undefined')
	{
		expect(toStr).is.boolean();
	}

	if (toStr)
	{
		return () => stringifyByte(fn())
	}

	return fn
}

export default dfUniformByte

