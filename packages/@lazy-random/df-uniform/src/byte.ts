import { expect } from '@lazy-random/expect';
import uniformInt from './uniform-int';
import { stringifyByte } from '@lazy-random/shared-lib';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function uniformByte(random: IRNGLike, toStr: true): () => string
export function uniformByte(random: IRNGLike, toStr?: false): () => number
export function uniformByte(random: IRNGLike, toStr?: boolean): (() => string) | (() => number)
export function uniformByte(random: IRNGLike, toStr?: boolean)
{
	let fn = uniformInt(random, 0, 255);

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

export default uniformByte

