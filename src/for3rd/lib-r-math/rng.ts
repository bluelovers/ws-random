import libRmath = require('lib-r-math.js');
import { Random, random } from '../../random';
import RNG from '../../rng';

export class LibRmathRngWithRandom extends libRmath.IRNG
{
	protected __random: Random;
	protected __seed;

	constructor(_seed?: number, rng?: Random | RNG | any)
	{
		super(_seed);
		this.use(rng, _seed)
	}

	protected get _name()
	{
		return 'Random<' + this.__random.rng.name + '>';
	}

	get seed()
	{
		return this.__seed
	}

	set seed(_seed)
	{
		this.__random.seed(this.__seed = _seed)
	}

	use(rng?: Random | RNG | any, _seed?)
	{
		if (rng)
		{
			if (rng instanceof RNG)
			{
				rng = new Random(rng)
			}
			else if (rng === 'seedrandom')
			{
				rng = random.newUse('seedrandom', _seed, {
					entropy: false,
				})
			}
			else if (!(rng instanceof Random))
			{
				rng = random.newUse(rng)
			}
		}

		this.__random = rng || this.__random || random;

		if (typeof _seed !== 'undefined')
		{
			this.seed = _seed
		}
	}

	_setup() {}

	internal_unif_rand()
	{
		return this.__random.next()
	}
}

/*

let b;

b = randsum(2, 5)

console.log(b, array_sum(b));

console.log('----------');

b = randsum(6, 13, -8, 15)

console.log(b, array_sum(b));

console.log('----------');

b = randsum(6, -13, -8, 15)

console.log(b, array_sum(b));

b = randsum(6, 0, -8, 15)

console.log(b, array_sum(b));

b = randsum(6, -14, -13, 15)

console.log(b, array_sum(b));

//b = randsum(6, 13, 14, 15)
//
//console.log(b, array_sum(b));

b = randsum(6, -12, -13, -1)

console.log(b, array_sum(b));

export function _array_rebase(ret_b: number[], n_diff: number, min: number, max: number, indexOf?: boolean)
{
	let bool: boolean;
	for (let i = ret_b.length - 1; i >= 0; i--)
	{
		let v = ret_b[i];

		if (!indexOf || ret_b.indexOf(v) !== i)
		{
			let n = v + n_diff;

			if (n >= min && n <= max)
			{
				bool = true;
				ret_b[i] = n;
			}
			else
			{
				bool = false;
				break;
			}
		}
	}
	return bool;
}

*/
