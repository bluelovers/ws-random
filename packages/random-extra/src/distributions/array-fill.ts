import { ITSArrayLikeWriteable, TypedArray } from 'ts-type';
import { IArrayInput02 } from '../type';
import uniformInt from './uniform-int';
import { Random } from '../random';
import expect from '../util/ow';
import uniformByte from './byte';
import uniform from './uniform';
import { isUnset } from '../util/assers';

export default function arrayFill(random: Random, min?: number, max?: number, float?: boolean)
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

;
