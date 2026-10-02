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

/**
 * 固定總和抽樣函式的共用參數 (Shared Parameters) 基底介面
 * Base interface of shared parameters for fixed-sum sampling functions
 */
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

/**
 * 固定總和抽樣函式 (Fixed-sum Sampling Function) 的輸入參數
 * Input parameters for fixed-sum sampling functions
 */
export interface ISumNumParameter extends ISumNumParameterBase
{
	random: IRNGLike,
	size: number,
	min?: number,
	max?: number,
	sum?: number,
}

/**
 * 內部使用、可附加快取 (Cache) 的參數型別，目前與 ISumNumParameter 結構相同
 * Parameter type used internally that may carry a cache; currently identical in shape to ISumNumParameter
 */
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

	/**
	 * 驗證 size 必須為大於 1 的有限整數，否則後續的機率分攤無法定義
	 * Validate that size is a finite integer > 1; otherwise the probability split is undefined
	 */
	// @ts-ignore
	expect(size).finite.integer.gt(1);

	const sum_1_to_size = sum_1_to_n(size);

	/**
	 * 未指定總和時，以 1+2+...+size 作為預設總和，確保在預設 min/max 下必有可行解
	 * Default to 1+2+...+size when sum is unset, so a solution exists under default min/max
	 */
	sum = isUnset(sum) ? sum_1_to_size : sum;

	// @ts-ignore
	expect(sum).is.finite.integer();

	/**
	 * min/max 未指定時依總和正負推導：正總和從 0 起、負總和從 sum 起，上限取總和絕對值
	 * When min/max are unset, derive them from the sign of sum: start at 0 for positive sum,
	 * at sum for negative sum, and use the absolute value of sum as the upper bound
	 */
	min = isUnset(min) ? (sum > 0 ? 0 : sum) : min;
	max = isUnset(max) ? Math.abs(sum) : max;

	// @ts-ignore
	expect(min).is.finite.integer();
	// @ts-ignore
	expect(max).is.finite.integer();

	//let n_sum = Math.abs(sum - size * min);
	/**
	 * n_sum 為扣除每個元素最小值後仍需分攤的總量；maxv 為單一元素可變動的區間大小
	 * n_sum is the total still to distribute after subtracting min from each element;
	 * maxv is the mutable range size of a single element
	 */
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

	/**
	 * 正總和時要求 sum 必須大於 min，否則即使每個元素都取最小值也湊不出總和
	 * For a positive sum, require sum > min; otherwise even all-min elements cannot reach the total
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
	 *
	 * 依 size 與 maxv 計算每一項被選中的機率權重 (Probability Weight)，供多項分佈抽樣使用
	 * Compute per-category probability weights from size and maxv for the multinomial sampling
	 */
	const prob = get_prob(size, maxv);

	expect(prob).array.lengthOf(size);

	/**
	 * make rmultinom use with random.next
	 */
	const rmultinomFn = Multinomial(fakeLibRMathRng(() => random.next())).rmultinom;

	/**
	 * low value for speed up, but more chance fail
	 *
	 * TODO: `|| n_sum` 永遠不會被求值（因為左側的 `5` 恆為真值），疑似應為
	 * `argv.limit || n_sum || 5` 或其他組合；僅記錄不修改邏輯
	 * TODO: `|| n_sum` is never evaluated because the literal `5` on its left is always
	 * truthy; possibly should be `argv.limit || n_sum || 5` or another order.
	 * Recorded only, logic left untouched
	 */
	const n_len = argv.limit || 5 || n_sum;
	/**
	 * rebase number
	 */
	let n_diff: number = min;

	/**
	 * 以多項分佈 (Multinomial Distribution) 產生一組候選值，逐項加上 n_diff 還原到
	 * [min, max] 區間，並只保留「總和恰好等於 sum」的組合；
	 * 最後依去重後的元素數量排序，讓去重度最高的結果優先被採用
	 * Produce candidates via the multinomial distribution, shift each item by n_diff back
	 * into [min, max], keep only combinations whose total equals sum, then sort by the count
	 * of distinct elements so the most unique result is preferred
	 */
	const rmultinomCreateFn = (n_len: number) =>
	{
		return (rmultinomFn(n_len, n_sum, prob) as number[][])
			.reduce((a, value) =>
			{
				let i = value.length;
				let b_sum = 0;
				let bool = false;
				let unique_len = 0;

				/**
				 * 由尾端逐項還原並驗證邊界 (Boundary Check)：
				 * 任一項超出 [min, max] 即整組作廢（bool = false 並中斷），
				 * 同時累計 b_sum 供事後比對總和；unique_len 則統計去重後的元素數
				 * Restore and boundary-check item by item from the tail: any value outside
				 * [min, max] discards the whole candidate (bool = false and break), while b_sum
				 * accumulates the total for later comparison and unique_len counts distinct values
				 */
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

				/**
				 * 只有「邊界檢查全數通過」且「總和恰好等於 sum」的組合才算有效樣本
				 * Only combinations that pass every boundary check and sum exactly to `sum` count as valid samples
				 */
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
	/**
	 * 建立後備快取 (Fallback Cache)：先用較大的 len=200 抽樣一批可行解，
	 * 之後若即時抽樣失敗可從中隨機取值，避免呼叫端直接拋錯；
	 * 快取上限 cache_max 等候選解經排序去重後，最壞情況仍可能為空，
	 * 故以 expect 確保至少存在一組可行解，否則代表輸入參數無解
	 * Build a fallback cache: pre-sample a batch with len=200 so later live-sampling
	 * failures can fall back to a random cached value instead of throwing;
	 * after sorting/dedup the candidates are capped at cache_max but may still be empty
	 * in the worst case, so expect() guarantees at least one feasible solution exists,
	 * otherwise the input parameters are unsolvable
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

	/**
	 * 回傳可反覆呼叫的產生器 (Generator)：
	 * 優先使用即時抽樣的結果，並在快取未滿時收納新樣本；
	 * 即時抽樣失敗時改由快取隨機回退；兩者皆失敗才拋錯
	 * Return a reusable generator: prefer the freshly sampled result and store new samples
	 * while the cache is not full; fall back to a random cached value when live sampling
	 * fails; throw only when both paths fail
	 */
	return () =>
	{
		let arr = rmultinomCreateFn(n_len);

		let ret_b: number[];
		let bool_toplevel: boolean;

		let c_len = cache.length;

		/**
		 * 即時抽樣有結果時採用之，並在快取未滿時收納（fixZero 用於消除浮點殘差 0 的情況）
		 * When live sampling yields results, use them and store into the cache while it is
		 * not full (fixZero removes floating-point leftovers such as -0)
		 */
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

		/**
		 * 邊界情況 (Boundary Case)：抽樣失敗且快取也為空時無解可回，必須拋錯提醒調整參數
		 * Boundary case: when sampling fails and the cache is empty there is no feasible
		 * value to return, so throw to tell the caller to adjust the parameters
		 */
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

	/**
	 * 未指定總和但給定 min/max 時，以「其餘 size-1 項全取 min、最後一項取 max」
	 * 反推總和，作為符合該範圍的合理預設值
	 * When sum is unset but min/max are given, infer it as "all remaining size-1 items at
	 * min and the last item at max", a sensible default that fits the given range
	 */
	if (isUnset(sum) && typeof min === 'number' && typeof max === 'number')
	{
		sum = (size - 1) * min + max;

		//console.log(sum, min, max);
	}

	/**
	 * 未指定總和時以 1.0 為預設總和；min/max 推導規則與整數版一致
	 * Default to 1.0 when sum is unset; min/max follow the same derivation as the int version
	 */
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

	/**
	 * n_sum 為扣除每個元素最小值後仍需分攤的總量；maxv 為單一元素可變動的區間大小
	 * n_sum is the total still to distribute after subtracting min from each element;
	 * maxv is the mutable range size of a single element
	 */
	const n_sum = sum - size * min;
	const maxv = max - min;

	/**
	 * 正總和時要求 sum 必須大於 min，否則即使每個元素都取最小值也湊不出總和
	 * For a positive sum, require sum > min; otherwise even all-min elements cannot reach the total
	 */
	if (sum > 0)
	{
		expect(sum).gt(min)
	}

	expect(n_sum).gte(0);

	let fnFirst: () => number;

	/**
	 * 若指定小數位數，先驗證必須為大於 0 的整數，避免後續 toFixedNumber 產生無效值
	 * When a fraction digit count is given, validate it is an integer > 0 up-front to keep
	 * toFixedNumber from producing invalid values later
	 */
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

		/**
		 * 第一個元素改用均勻分佈 (Uniform Distribution) 抽樣於 [0, prob_slice_sum)，
		 * 使首項先行佔用部分總額，後續元素再逐項瓜分剩餘額度
		 * Sample the first element from a uniform distribution over [0, prob_slice_sum) so it
		 * consumes part of the total first; remaining elements then split what is left
		 */
		fnFirst = dfUniformFloat(random, 0, prob_slice_sum);
	}

	/**
	 * 後續元素改由 float() 逐項在剩餘總額 [0, total] 內抽樣
	 * Subsequent elements are drawn one by one within the remaining total [0, total] by float()
	 */
	const fnNext = float;

	/**
	 * 回傳可反覆呼叫的產生器 (Generator)：
	 * 外層 LABEL_TOP do-while 負責整組重抽，直到取得一組通過所有邊界與總和檢定的數列
	 * Return a reusable generator: the outer LABEL_TOP do-while restarts the whole draw until
	 * a sequence passes every boundary and total-sum check
	 */
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

			/**
			 * 首項邊界檢定 (Boundary Check)：n01 落在 [min, max] 外即整組重抽
			 * First-item boundary check: if n01 falls outside [min, max], redraw the whole set
			 */
			if (n01 < min || n01 > max)
			{
				continue LABEL_TOP
			}

			/**
			 * 扣除首項後，剩餘總額（含各項 min）不足以湊出總和時也整組重抽
			 * After subtracting the first item, redraw everything when the remaining total
			 * (including each item's min) is not enough to reach the target sum
			 */
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

			/**
			 * 中間項抽樣迴圈 (Sub Sampling Loop)：逐項在剩餘總額內抽樣；
			 * 剩餘額不足（t1 < min）代表整組無望，跳回 LABEL_TOP 全部重抽；
			 * 只有單項超界或與前一項重複（n11 === n_prev）才僅重抽本項，
			 * 以保留已抽中的前段結果、提高成功率
			 * Mid-item sampling loop: draw each item within the remaining total;
			 * insufficient remainder (t1 < min) makes the whole set hopeless so jump back to
			 * LABEL_TOP to redraw everything, while only an out-of-range value or a repeat of
			 * the previous item (n11 === n_prev) retries just this item, keeping earlier
			 * accepted items to raise the success rate
			 */
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

			/**
			 * 尾項以「總和 - 已累計」補齊，使整組總和恰好等於 sum；
			 * 若尾項超出 [min, max] 或與首項／前一項重複，則整組重抽
			 * The final item is filled with "sum - accumulated" so the total matches sum exactly;
			 * if it falls outside [min, max] or repeats the first/previous item, redraw the set
			 */
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
