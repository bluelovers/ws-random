import { array_unique } from 'array-hyper-unique';
import { Multinomial } from 'lib-r-math.js';
import { fixZero } from 'num-is-zero';
import { expect } from '@lazy-random/expect';
import { toFixedNumber } from '@lazy-num/to-fixed-number';
import { fakeLibRMathRng } from '@lazy-random/fake-lib-r-math-rng';
import { get_prob, get_prob_float } from '@lazy-random/util-probabilities';
import { num_array_sum, sum_1_to_n } from '@lazy-num/sum';
import { float, randIndex } from '@lazy-random/util-distributions';
import { isUnset } from '@lazy-random/shared-lib';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { dfUniformFloat } from '@lazy-random/df-uniform';

export interface ISumNumParameterBase
{
	//fnFirst?: (min?: number, max?: number) => number,
	//fnNext?: (...args: Parameters<typeof UtilDistributions.int>) => number,

	//chk_sum?: boolean,
	//noUnique?: boolean,

	//chkSize?(data: ISumNumParameter): boolean | void,

	//intMode?: boolean,

	//verifyFn?(data: ISumNumParameter)

	limit?: number,
	fractionDigits?: number,
}

export interface ISumNumParameter extends ISumNumParameterBase
{
	random: IRNGLike,
	size: number,
	min?: number,
	max?: number,
	sum?: number,
}

export interface ISumNumParameterWuthCache extends ISumNumParameter
{

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

	// @ts-ignore
	expect(size).finite.integer.gt(1);

	const sum_1_to_size = sum_1_to_n(size);

	sum = isUnset(sum) ? sum_1_to_size : sum;

	// @ts-ignore
	expect(sum).is.finite.integer();

	min = isUnset(min) ? (sum > 0 ? 0 : sum) : min;
	max = isUnset(max) ? Math.abs(sum) : max;

	// @ts-ignore
	expect(min).is.finite.integer();
	// @ts-ignore
	expect(max).is.finite.integer();

	//let n_sum = Math.abs(sum - size * min);
	let n_sum = sum - size * min;
	let maxv = max - min;

	expect(n_sum).gte(0);

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
	const prob = get_prob(size, maxv);

	expect(prob).array.lengthOf(size);

	/**
	 * make rmultinom use with random.next
	 */
	const rmultinomFn = Multinomial(fakeLibRMathRng(() => random.next())).rmultinom;

	/**
	 * low value for speed up, but more chance fail
	 */
	const n_len = argv.limit || 5 || n_sum;
	/**
	 * rebase number
	 */
	let n_diff: number = min;

	const rmultinomCreateFn = (n_len: number) =>
	{
		return (rmultinomFn(n_len, n_sum, prob) as number[][])
			.reduce((a, value) =>
			{
				let i = value.length;
				let b_sum = 0;
				let bool = false;
				let unique_len = 0;

				while (i--)
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

		let arr = array_unique(rmultinomCreateFn(len).map(v =>
		{

			v.value = v.value.map(fixZero);

			return v;
		}));

		if (arr.length)
		{
			let i = Math.min(cache_max, arr.length);

			while (i--)
			{
				cache.push(arr[i].value)
			}

			cache = array_unique(cache.map(v => v.sort()))
		}

		expect(cache, `invalid argv (size=${size}, sum=${sum}, min=${min}, max=${max})`)
			.array
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

			ret_b = ret_b.map(fixZero);

			if (bool_toplevel && c_len < cache_max)
			{
				cache.push(ret_b);
			}
		}
		else if (c_len)
		{
			let i = randIndex(random, c_len);

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

export function coreFnRandSumFloat(argv: ISumNumParameterWuthCache): () => number[]
{
	let {
		random,
		size,
		sum,
		min,
		max,
		fractionDigits,
	} = argv;

	// @ts-ignore
	expect(size).is.finite.integer.gt(1);

	if (isUnset(sum) && typeof min === 'number' && typeof max === 'number')
	{
		sum = (size - 1) * min + max;

		//console.log(sum, min, max);
	}

	sum = isUnset(sum) ? 1.0 : sum;

	min = isUnset(min) ? (sum > 0 ? 0 : sum) : min;
	max = isUnset(max) ? Math.abs(sum) : max;

	// @ts-ignore
	expect(min).is.finite.number();
	// @ts-ignore
	expect(max).is.finite.number();
	// @ts-ignore
	expect(sum).is.finite.number();

	sum += 0.0;

	const n_sum = sum - size * min;
	const maxv = max - min;

	if (sum > 0)
	{
		expect(sum).gt(min)
	}

	expect(n_sum).gte(0);

	let fnFirst: () => number;

	if (!isUnset(fractionDigits))
	{
		// @ts-ignore
		expect(fractionDigits).finite.integer.gt(0);
	}

	{
		/**
		 * get_prob_float(3, 10)
		 * // => [ 4.444444444444445, 3.3333333333333335, 2.222222222222222 ]
		 */
		const prob = get_prob_float(size, maxv);

		/**
		 * array_sum(prob.slice(0, -1))
		 * // => 7.777777777777779
		 */
		const prob_slice_sum = num_array_sum(prob.slice(0, -1));

		fnFirst = dfUniformFloat(random, 0, prob_slice_sum);
	}

	const fnNext = float;

	return () =>
	{
		let ret_b: number[];
		let bool_toplevel: boolean;

		LABEL_TOP: do
		{
			const ret_a: number[] = [];

			let total = n_sum;
			let total2 = 0.0;

			let i = size - 1.0;
			let n10: number;
			let n11: number;

			let n00 = fnFirst();
			let n01 = fixZero(n00 + min);

			if (fractionDigits)
			{
				n01 = toFixedNumber(n01, fractionDigits)
			}

			if (n01 < min || n01 > max)
			{
				continue LABEL_TOP
			}

			let t0 = total - n00;
			let t1 = (t0 + min);

			if (t1 < min)
			{
				continue LABEL_TOP
			}

			total2 += n01;

			ret_a.push(n01);
			total = t0;

			let n_prev = n01;

			LABEL_SUB: while (i > 1)
			{
				n10 = fnNext(random, 0, total);

				let t0 = total - n10;
				let t1 = (t0 + min);

				if (t1 < min)
				{
					continue LABEL_TOP
				}

				n11 = fixZero(n10 + min);

				if (fractionDigits)
				{
					n11 = toFixedNumber(n11, fractionDigits)
				}

				if (n11 < min || n11 > max || n11 === n_prev)
				{
					continue LABEL_SUB
				}

				total2 += n11;

				ret_a.push(n11);
				total = t0;
				i--;

				n_prev = n11
			}

			t1 = fixZero(sum - total2);

			if (fractionDigits)
			{
				t1 = toFixedNumber(t1, fractionDigits)
			}

			if (t1 < min || t1 > max || t1 === n01 || t1 === n_prev)
			{
				continue LABEL_TOP
			}

			ret_a.push(t1);
			bool_toplevel = true;

			ret_b = ret_a;
		}
		while (!bool_toplevel);

		/*
		if (!bool_toplevel)
		{
			throw new Error(`invalid argv (size=${size}, sum=${sum}, min=${min}, max=${max})`)
		}
		*/

		return ret_b;
	}
}
