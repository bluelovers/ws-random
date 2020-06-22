import expect from '../util/ow';

import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, mu = 0, sigma = 1) =>
{
	//ow(mu, ow.number)
	//ow(sigma, ow.number)

	expect(mu).number();
	expect(sigma).number();

	return () =>
	{
		let x: number, y: number, r: number

		do
		{
			x = random.next() * 2 - 1
			y = random.next() * 2 - 1
			r = x * x + y * y
		}
		while (!r || r > 1)

		return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r)
	}
}
// @ts-ignore
Object.freeze(exports)
