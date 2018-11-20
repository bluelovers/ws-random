import { array_unique } from 'array-hyper-unique';
import { libRmath, fakeLibRmathRng } from '../../for3rd/lib-r-math/util';
import { Random } from '../../random';
import { isUnset, array_unique_unsafe } from '../../util';
import { UtilDistributions } from '../../util/distributions';
import * as UtilMath from '../../util/math';
import { get_prob, sum_1_to_n } from '../../util/math';
import { expect } from '../../util/ow';

export default coreFn2

export interface ISumNumParameterBase
{
	random: Random,

	size: number,

	fnFirst?: (min?: number, max?: number) => number,
	fnNext?: (...args: Parameters<typeof UtilDistributions.int>) => number,

	chk_sum?: boolean,
	noUnique?: boolean,

	chkSize?(data: ISumNumParameter): boolean | void,

	intMode?: boolean,

	verifyFn?(data: ISumNumParameter)

	limit?: number,
}

export interface ISumNumParameter extends ISumNumParameterBase
{
	min?: number,
	max?: number,
	sum?: number,
}

export interface ISumNumParameterWuthCache extends ISumNumParameter
{

}

export function coreFn2({
	random,
	size,
	min,
	max,
	fnFirst,
	fnNext,
	chk_sum,
	noUnique,
	sum,
	chkSize,
	intMode,
}: ISumNumParameter)
{
	expect(size).integer.gt(1);

	let abs2 = sum_1_to_n(size);

	if (typeof sum === 'undefined' || sum === null)
	{
		sum = abs2
	}

	expect(sum).number();
	//let abs1 = Math.abs(sum);

	if (typeof min === 'undefined' || min === null)
	{
		if (sum > 0)
		{
			min = 0;
		}
		else
		{
			min = Math.min(sum - Math.floor(abs2 / 2), 0)
		}
	}

	if (typeof max === 'undefined' || max === null)
	{
		if (sum > 0)
		{
			max = sum;
		}
		else
		{
			max = Math.max(sum + Math.floor(abs2 / 2), 0)
		}
	}

	expect(min).number();
	expect(max).number.gt(min);

	if (min >= 0)
	{
		expect(sum).gt(min);
	}

	if (sum < 0)
	{
		expect(min).lt(sum);
	}

	chk_sum = !!chk_sum;
	noUnique = !!noUnique;
	const doUnique = !noUnique;

	if (!fnFirst)
	{
		fnFirst = (min, max) => fnNext(random, min, max)
	}

	if (chkSize)
	{
		chkSize({
			random,
			size,
			min,
			max,
			fnFirst,
			fnNext,
			chk_sum,
			noUnique,
			sum,
			chkSize,
		})
	}

	return () =>
	{
		let ret: number[] = [];
		let bool: boolean;

		LABEL_TOP: do
		{
			let total = sum;
			let i = size - 1;
			let n: number;

			let prev: number;

			prev = ret[i] = fnFirst(min, max);

			LABEL_SUB: while (i > 1)
			{
				let j = i;

				n = total - ret[j];

				if (n <= min)
				{
					bool = true;
					//console.log(ret);
					continue LABEL_TOP;
				}
				else if (n > max)
				{
					n = max;
				}

				let cur = fnNext(random, min, n);

				if (doUnique && prev === cur)
				{
					bool = true;
					//console.log(ret);
					continue LABEL_SUB;
				}

				total -= ret[j--];
				prev = ret[j] = cur;

				i = j;
			}

			let cur = total - ret[i];
			if (
				cur > max
				|| cur < min
				|| doUnique && prev === cur
			)
			{
				bool = true;
				//console.log(ret);
				continue LABEL_TOP;
			}

			ret[0] = cur;
			//console.log(ret);
			bool = chk(ret, size, sum, min, max, noUnique);
		}
		while (bool)

		return ret
	}

}

/**
 * @deprecated
 */
export function coreFn1({
	random,
	size,
	min,
	max,
	fnFirst,
	fnNext,
	chk_sum,
	noUnique,
}: ISumNumParameter)
{
	chk_sum = !!chk_sum;
	noUnique = !!noUnique;

	return () =>
	{
		let ret: number[] = [];
		let bool: boolean;

		LABEL_TOP: do
		{
			let sum = max;
			let i = size - 1;
			let n: number;

			ret[i] = fnFirst();

			LABEL_SUB: while (i > 1)
			{
				n = sum - ret[i];

				if (n < min || chk_sum && n < (UtilMath.sum_1_to_n(i) + min))
				{
					bool = true;
					continue LABEL_TOP;
				}

				sum -= ret[i--];

				ret[i] = fnNext(random, min, n);
			}

			ret[0] = sum - ret[i];

			bool = chk(ret, size, sum, min, max, noUnique)
		}
		while (bool);

		return ret
	}
}

export function chk(
	ret: number[],
	size: number,
	sum: number,
	min: number,
	max: number,
	noUnique: boolean,
)
{
	let total = 0;

	return ret
		.filter(function (n, idx)
		{
			total += n;

			return n >= min
				&& n <= max
				&& (noUnique || idx === ret.indexOf(n))
		})
		.length !== size && total === sum
		;
}

/**
 * not support unique, but will try make unique if can
 * thx @SeverinPappadeux for int version
 *
 * @see https://stackoverflow.com/questions/53279807/how-to-get-random-number-list-with-fixed-sum-and-size
 */
export function coreFnRandSumInt(argv: ISumNumParameterWuthCache)
{
	let {
		random,
		size,
		sum,
		min,
		max,
	} = argv;

	let sum_1_to_size = sum_1_to_n(size);

	sum = isUnset(sum) ? sum_1_to_size : sum;

	expect(sum).integer();

	min = isUnset(min) ? (sum > 0 ? 0 : sum) : min;
	max = isUnset(max) ? Math.abs(sum) : max;

	expect(min).integer();
	expect(max).integer();

	let n_sum = Math.abs(sum - size * min);
	let maxv = max - min;

	/*
	console.log({
		sum_1_to_size,
		size,
		sum,
		min,
		max,
		n_sum,
		maxv,
	});
	*/

	if (sum > 0)
	{
		expect(sum).gt(min)
	}

	/**
	 * pre-check
	 */
	//expect(maxv, `(max - min) should > sum_1_to_size`).gte(sum_1_to_size);

	/**
	 * probabilities
	 */
	let prob = get_prob(size, maxv);

	expect(prob).is.array.lengthOf(size);

	/**
	 * make rmultinom use with random.next
	 */
	let rmultinomFn = libRmath.Multinomial(fakeLibRmathRng(random.next)).rmultinom;

	/**
	 * low value for speed up, but more chance fail
	 */
	let n_len = argv.limit || 5 || n_sum;
	/**
	 * rebase number
	 */
	let n_diff: number = min;

	const rmultinomCreateFn = (n_len: number) => {
		return (rmultinomFn(n_len, n_sum, prob) as number[][])
			.reduce((a, value) =>
			{
				let i = value.length;
				let b_sum = 0;
				let bool = false;
				let unique_len = 0;

				while(i--)
				{
					let v = value[i];
					let n = v + n_diff;

					if (value.indexOf(v) === i)
					{
						unique_len++;
					}

					if (n >= min && n <= max)
					{
						bool = true;
						value[i] = n;

						b_sum += n
					}
					else
					{
						bool = false;
						break;
					}
				}

				if (bool && b_sum === sum)
				{
					let item = {
						value,
						unique_len,
						b_sum,
						bool,
					};

					a.push(item)
				}

				return a
			}, [] as {
				value: number[],
				unique_len: number,
				b_sum: number,
				bool: boolean,
			}[])
			.sort((a, b) => b.unique_len - a.unique_len)
			;
	};

	/**
	 * pre-make fail-back value
	 */
	const cache_max = 10;
	let cache: number[][] = [];

	{
		let len = 200;

		let arr = array_unique(rmultinomCreateFn(len));

		if (arr.length)
		{
			let i = Math.min(cache_max, arr.length);

			while(i--)
			{
				cache.push(arr[i].value)
			}

			cache = array_unique(cache.map(v => v.sort()))
		}

		expect(cache, `invalid argv (size=${size}, sum=${sum}, min=${min}, max=${max})`)
			.is.array
			.have.lengthOf.gt(0)
		;

		arr = undefined;

//		console.log(cache);
	}

	/**
	 * try reset memory
	 */
	argv = undefined;

	return () =>
	{
		let arr = rmultinomCreateFn(n_len);

		let ret_b: number[];
		let bool_toplevel: boolean;

		let c_len = cache.length;

		if (arr.length)
		{
			ret_b = arr[0].value;
			bool_toplevel = arr[0].bool;

			if (bool_toplevel && c_len < cache_max)
			{
				cache.push(ret_b);
			}
		}
		else if (c_len)
		{
			let i = UtilDistributions.randIndex(random, c_len);

			ret_b = cache[i];
			bool_toplevel = true;
		}

		if (!bool_toplevel || !ret_b)
		{
			throw new Error(`can't generator value by current input argv, or try set limit for high number`)
		}

		return ret_b;
	}
}

/**
 * back to original interval
 */
export function _array_rebase(ret_b: number[], n_diff: number, min: number, max: number)
{
	let b_sum = 0;

	let bool: boolean;

	let i = ret_b.length;

	while (i--)
	{
		let v = ret_b[i];
		let n = v + n_diff;

		if (n >= min && n <= max)
		{
			bool = true;
			ret_b[i] = n;

			b_sum += n
		}
		else
		{
			bool = false;
			break;
		}
	}

	return {
		bool,
		b_sum,
	};
}
