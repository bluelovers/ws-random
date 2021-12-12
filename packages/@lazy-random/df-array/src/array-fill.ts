import { uniformFloat as uniform, uniformInt, uniformByte } from '@lazy-random/df-uniform';
import { expect } from '@lazy-random/expect';
import { IArrayInput02 } from '@lazy-random/shared-lib';
import { isUnset } from '@lazy-random/shared-lib';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function arrayFill(random: IRNGLike, min?: number, max?: number, float?: boolean)
{
	let fn: () => number;

	{
		let min_unset = isUnset(min);
		let max_unset = isUnset(max);

		if (max_unset && min_unset)
		{
			fn = uniformByte(random);
		}
		else if (float)
		{
			fn = uniform(random, min, max);
		}
		else
		{
			fn = uniformInt(random, min, max);
		}

		min = void 0;
		max = void 0;
	}

	expect(fn).is.function();

	return <T extends IArrayInput02<number>>(arr: T) =>
	{
		let i = arr.length;
		while (i--)
		{
			arr[i] = fn();
		}
		return arr
	}
}

export default arrayFill