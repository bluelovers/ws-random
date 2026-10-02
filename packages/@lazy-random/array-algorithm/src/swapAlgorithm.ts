import { IArrayInput02 } from '@lazy-random/shared-lib';
import { arrayRandIndexByLength } from '@lazy-random/array-rand-index';

/**
 * 以交換方式打亂陣列順序的洗牌 (Shuffle) 演算法
 * Shuffle an array by swapping elements (Fisher–Yates style)
 *
 * 由陣列尾端往前迭代，每次以 fn 取得一個隨機索引並與目前位置交換；
 * 因此預設行為不會改寫原陣列，除非傳入 overwrite = true。
 * Iterate from the end towards the start, swapping the current position with a random
 * index produced by fn; the original array is left untouched unless overwrite = true.
 *
 * @param arr 要打亂的陣列 / the array to shuffle
 * @param overwrite true 時就地修改 (In-Place) 原陣列，false 時先複製一份 / modify in place when true, otherwise operate on a copy
 * @param fn 產生隨機索引的函式，輸入上界 n、回傳 0 至 n-1 的索引 /
 * function producing a random index; receives the upper bound n and returns an index in 0..n-1
 * @returns 打亂後的陣列；overwrite 為 false 時是原陣列的副本 (Copy) /
 * the shuffled array; a copy of the input when overwrite is false
 */
export function swapAlgorithm<T extends IArrayInput02<any>>(arr: T,
	overwrite?: boolean,
	fn: (n: number, ...argv: any[]) => number = arrayRandIndexByLength,
)
{
	let i: number = arr.length;
	// @ts-ignore
	let ret = (overwrite ? arr : arr.slice());

	/**
	 * 尾端往前迭代（i 由長度遞減至 0），
	 * 讓每次交換的候選範圍隨之縮小，確保所有位置都被處理過一次。
	 * Iterate backwards (i counts down from the length to 0) so the candidate range
	 * shrinks each round, guaranteeing every position is visited exactly once.
	 */
	while (i)
	{
		let idx: number = fn(i--);

		/**
		 * 隨機索引剛好等於目前位置時交換沒有意義，直接跳過以省下一次暫存搬移。
		 * Skip the swap when the random index equals the current position,
		 * avoiding a pointless three-step move through the cache variable.
		 */
		if (i === idx) continue;

		let cache = ret[i];
		ret[i] = ret[idx];
		ret[idx] = cache;

		//console.log(i, idx, ret);
	}

	return ret
}

/**
 * swapAlgorithm 的變體 (Variant)：以完整長度取樣並在原地重試，降低元素留在原位的機率
 * A variant of swapAlgorithm that samples with the full length and re-draws in place,
 * reducing the chance that an element stays at its original position
 *
 * 與 swapAlgorithm 的差異：idx 一律以 len 為上界取樣；若 idx 恰等於目前索引 i，
 * 依 i 位於前半段或後半段，改以 fn(len) 或 fn(i) 重新取樣一次。
 * Difference from swapAlgorithm: idx is always sampled with len as the upper bound; when it
 * lands on the current index i, it is re-drawn once with fn(len) or fn(i) depending on the half.
 *
 * @param arr 要打亂的陣列 / the array to shuffle
 * @param overwrite true 時就地修改 (In-Place) 原陣列，false 時先複製一份 / modify in place when true, otherwise operate on a copy
 * @param fn 產生隨機索引的函式，輸入上界 n、回傳 0 至 n-1 的索引 /
 * function producing a random index; receives the upper bound n and returns an index in 0..n-1
 * @returns 打亂後的陣列 / the shuffled array
 */
export function swapAlgorithm2<T extends IArrayInput02<any>>(arr: T,
	overwrite?: boolean,
	fn: (n: number, ...argv: any[]) => number = arrayRandIndexByLength,
): T
{
	let i: number = arr.length;
	// @ts-ignore
	let ret = (overwrite ? arr : arr.slice());
	let len = i;
	/**
	 * 目前索引 i 是否落在陣列前半段（i < j，也就是迭代的後段）：
	 * 前半段重新取樣時仍以完整長度 len 為上界；
	 * 後半段（i >= j，迭代的前段）則以目前索引 i 為上界，
	 * 讓交換目標傾向落在尚未處理的區間內。
	 * Whether the current index i lies in the first half of the array (i < j, i.e. the later
	 * stage of the iteration): the re-draw then still uses the full length len as the bound;
	 * in the second half (i >= j, the earlier stage) it uses i as the bound instead, so the
	 * swap target tends to stay within the not-yet-finalized range.
	 */
	let j = Math.ceil(len / 2);

	/**
	 * 尾端往前迭代；每輪先以 len 取樣，再視情況重取一次，
	 * 最後若 idx 仍等於 i 則跳過（與 swapAlgorithm 相同）。
	 * Iterate from the end; each round samples with len, optionally re-draws once,
	 * and skips the swap if idx still equals i (same as swapAlgorithm).
	 */
	while (i)
	{
		let idx: number = fn(len);
		i--;

		/**
		 * idx 恰好落在目前索引：以前半段／後半段採不同的上界重新取樣，
		 * 避免重試仍用同一個範圍而再次撞回原位。
		 * The index landed on the current position: re-draw with a bound chosen from
		 * the half we are in, so the retry does not use the same range and hit the same spot again.
		 */
		if (idx === i)
		{
			if (i < j)
			{
				idx = fn(len)
			}
			else
			{
				idx = fn(i)
			}
		}

		if (i === idx) continue;

		let cache = ret[i];
		ret[i] = ret[idx];
		ret[idx] = cache;

		//console.log(i, idx, ret);
	}

	return ret
}
