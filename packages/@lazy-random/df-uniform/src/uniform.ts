import { expect } from '@lazy-random/expect';
import { toFixedNumber } from '@lazy-num/to-fixed-number';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfUniformFloat(random: IRNGLike, min?: number, max?: number, fractionDigits?: number)
{
	if (max === undefined)
	{
		max = (min === undefined ? 1 : min)
		min = 0;
	}

	expect(min).number.finite;
	expect(max).number.finite.gt(min);

	let fn: () => number;

	if (min === 0 && max === 1)
	{
		fn = random.next
	}
	else if (min === 0)
	{
		fn = () =>
		{
			return random.next() * max
		}
	}
	else
	{
		fn = () =>
		{
			return random.next() * (max - min) + min
		}
	}

	if (fractionDigits !== undefined)
	{
		expect(fractionDigits).integer.gte(0);

		return (): number =>
		{
			return toFixedNumber(fn(), fractionDigits)
		}
	}

	return fn
}

export default dfUniformFloat
