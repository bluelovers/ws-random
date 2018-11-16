import expect from '../util/ow';

import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, min?: number, max?: number) =>
{
	if (max === undefined)
	{
		max = (min === undefined ? 1 : min)
		min = 0
	}

	expect(min).number();
	expect(max).number.gt(min);

	//ow(min, ow.number)
	//ow(max, ow.number.gt(min))

	return (): number =>
	{
		return random.next() * (max - min) + min
	}
}
// @ts-ignore
Object.freeze(exports)
