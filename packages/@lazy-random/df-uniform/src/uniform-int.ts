import { expect } from '@lazy-random/expect';
import uniformFloat from './uniform';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function uniformInt(random: IRNGLike, min?: number, max?: number)
{
	if (max === undefined)
	{
		max = (min === undefined ? 1 : min)
		min = 0
	}

	expect(min).integer();
	expect(max).integer.gt(min);

	//ow(min, ow.number.integer)
	//ow(max, ow.number.integer.gt(min))

	let fn = uniformFloat(random, min, max + 1);

	return () =>
	{
		return Math.floor(fn())
	}
}

export default uniformInt
