import expect from '../util/ow'
import { Random } from '../random';
import uniformFloat from './uniform';

export default (random: Random, min?: number, max?: number) =>
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

