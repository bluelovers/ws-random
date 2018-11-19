import libRmath = require('lib-r-math.js');
import { Random, random } from '../../random';
import RNG from '../../rng';
import { array_sum, get_prob, sum_1_to_n } from '../../util/math';

import { array_unique } from 'array-hyper-unique'

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

let rng = new LibRmathRngWithRandom()

export function fakeLibRmathRng(fn: (...argv) => number)
{
	return {
		unif_rand(n?: number)
		{
			if (n > 1)
			{
				let a = [];
				while (n--)
				{
					a[n] = fn()
				}
				return a;
			}

			return fn()
		},
	} as libRmath.IRNG
}

let ret = libRmath.Multinomial(fakeLibRmathRng(random.next));

console.log(fakeLibRmathRng(random.next).unif_rand(2));

function randsum(size: number, sum: number, min?: number, max?: number)
{
	min = min || (sum > 0 ? 0 : sum);
	max = typeof max != 'number' ? Math.abs(sum) : max;

	let n = Math.min(Math.abs(sum - size * min), 15);
	let maxv = max - min;

	1 && console.log({
		size,
		sum,
		min,
		max,
		n,
		maxv,
	});

	let arr = (ret.rmultinom(n, size, get_prob(size, maxv)) as number[][])
		.map(value =>
		{
			return {
				value,
				unique_len: array_unique(value).length,
			}
		})
		.sort((a, b) => b.unique_len - a.unique_len)
	;

	let ret_a: number[]
	let ret_b: number[]

	let bool = arr.some(function (a, index)
	{
		ret_a = a.value;
		ret_b = a.value.slice();

		let bool: boolean;

		let n_diff = sum > 0 ? sum - maxv : sum + maxv;

		if (!bool && a.unique_len != size)
		{
			bool = _array_rebase(ret_b, n_diff, min, max, true);
		}

		if (!bool)
		{
			bool = _array_rebase(ret_b, n_diff, min, max, false);
		}

		n_diff = min;

		if (!bool && a.unique_len != size)
		{
			bool = _array_rebase(ret_b, n_diff, min, max, true);
		}

		if (!bool)
		{
			bool = _array_rebase(ret_b, n_diff, min, max, false);
		}

		let b_sum = array_sum(ret_b)

		if (b_sum !== sum && Math.abs(b_sum) === Math.abs(sum))
		{
			let a_sum = 0;
			let a = [];

			for (let i = 0; i < ret_b.length; i++)
			{
				let n = 0 - ret_b[i]
				if (n < min || n > max)
				{
					break;
				}
				a[i] = n;
				a_sum += n;
			}

			if (a.length === size)
			{
				ret_b = a;
				b_sum = a_sum
			}
		}

		//console.log(bool, index, b_sum, ret_b, n_diff, ret_a);

		return bool && b_sum === sum;
	});

	1 && console.log({
		//n_diff,
		bool,
		ret_a,
		a_sum: array_sum(ret_a),
		ret_b,
		b_sum: array_sum(ret_b),
	});

	if (!bool)
	{
		throw new Error()
	}

	return ret_b;
}

let b = randsum(2, 5)

console.log(b, array_sum(b));

b = randsum(6, 13, -8, 15)

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
				ret_b[i] = n;
				bool = true;
				break;
			}
		}
	}
	return bool;
}
