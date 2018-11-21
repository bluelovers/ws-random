import { isUnset } from '../util';
import { toFixedNumber } from '../util/math';
import expect from '../util/ow';
import { Random } from '../random';

export default (random: Random, min?: number, max?: number, fractionDigits?: number) =>
{
	if (max === undefined)
	{
		max = (min === undefined ? 1 : min)
		min = 0;
	}

	expect(min).number();
	expect(max).number.gt(min);

	let fn = (): number =>
	{
		return random.next() * (max - min) + min
	};

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
// @ts-ignore
Object.freeze(exports)
