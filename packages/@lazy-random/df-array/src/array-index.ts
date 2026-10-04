import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { _handleStartEnd } from './util/options';
import { _createIndexSampler } from './array-index-one';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 回傳陣列的索引清單 (Index List)
 * return index list form array
 *
 * 以工廠 (Factory) 形式回傳取樣函式 (Sampler)；每次呼叫產生一組
 * 不重複的索引，屬於不放回抽樣 (Sampling Without Replacement)。
 * Returns a sampler factory; each call yields a set of distinct indexes,
 * i.e. sampling without replacement.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 目標陣列，需有 length > 0
 * @param size 要取得的索引數，需為正整數 (Positive Integer)，預設 1
 * @param start 起始索引（含），負值會被歸零，預設 0
 * @param end 結束索引（不含），預設為陣列長度
 * @returns 取樣函式，每次呼叫回傳 number[] 索引清單
 */
export function dfArrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(random: IRNGLike, arr: T, size: number = 1, start: number = 0, end?: number)
{
	/*
	 * 建立期先驗證 size 與陣列長度；陣列為空時無法產生任何索引，
	 * 與其讓取樣期回傳空結果，不如立刻拋出錯誤。
	 * Validate size and the array length up front; an empty array cannot
	 * yield any index, so fail immediately instead of sampling emptily.
	 */
	expect(size, `size`).integer.gt(0);
	expect(arr.length, `arr.length`).integer.gt(0);

	/*
	 * 只做一次區間正規化與驗證，取樣器與「實際可取數量」都從同一份 range 派生。
	 * 過去這裡會連做兩次：一次藏在 dfArrayIndexOne() 內、一次在這裡 disableCheck
	 * 重算，兩者只是「剛好」相同；一旦日後只改其中一邊，取樣器的區間與
	 * size_runtime 就會各自為政 —— 輕則迴圈抽不滿、重則回傳越界索引，
	 * 沿著 dfArrayItem 的 arr[idx] 變成 undefined。
	 *
	 * Normalise and validate the range exactly once; both the sampler and the
	 * runnable count derive from that one range. It used to be normalised
	 * twice — once hidden inside dfArrayIndexOne() and once here with
	 * disableCheck — where the two merely *happened* to agree. Change either
	 * side later and the sampler's range and size_runtime drift apart: at best
	 * the loop never fills, at worst it returns an out-of-range index that
	 * turns into undefined via dfArrayItem's arr[idx].
	 */
	const range = _handleStartEnd(arr, start, end);

	/*
	 * 取樣器建立在已驗證的區間上，內部不再重複做區間驗證 —
	 * 這正是「上層把關、底層不重複驗證」的分層。
	 * The sampler is built on the already-validated range and re-checks nothing —
	 * the layering where the upper layer guards and the lower layer does not
	 * re-validate.
	 */
	const fn = _createIndexSampler(random, range.start, range.end);

	/*
	 * 實際可取數量取 start/end 區間長度、陣列長度與 size 的最小值：
	 * 需求超過可用範圍時縮小規模，而不是讓迴圈多跑無意義的嘗試。
	 * 三個來源在這裡都已驗證（區間非空、length > 0、size > 0），
	 * 故下限必為 1，不需再夾一次。
	 *
	 * The runnable size is the minimum of the [start, end) span, the array
	 * length and size: shrink an oversized request instead of letting the loop
	 * burn pointless attempts. All three inputs are already validated here
	 * (non-empty range, length > 0, size > 0), so the lower bound is necessarily
	 * 1 and no extra clamping is needed.
	 */
	let size_runtime = Math.min((range.end - range.start), range.len, size);

	expect(size_runtime, `size_runtime(${size_runtime})`).lte(size).gt(0)

	size = size_runtime;

	return () =>
	{
		/**
		 * reset size_runtime
		 */
		size_runtime = size;

		let ids: number[] = [];
		let prev: number;

		/*
		 * 以 do...while 配合 LABEL_TOP 重試：單一索引取樣可能重複，
		 * 透過 continue LABEL_TOP 立刻重抽，湊滿 size 個不重複索引為止。
		 * do...while with LABEL_TOP retries: a single draw may repeat, so
		 * `continue LABEL_TOP` redraws until size distinct indexes are
		 * collected.
		 *
		 * 邊界情況 (Edge Case)：prev 永遠是 ids 的最後一筆，
		 * 先用它比對可快速擋下「與上一次相同」的重抽，
		 * 只有通過時才需走較慢的 ids.includes() 全域檢查。
		 * The prev check plus ids.includes() first rejects "same as the last
		 * draw" cheaply and only falls back to the slower full ids.includes()
		 * scan when needed.
		 */
		LABEL_TOP: do
		{
			let i = fn()

			/*
			 * 抽到重複索引就整輪重來，不消耗剩餘配額
			 * Redrawing a duplicate restarts the iteration without consuming the quota.
			 */
			if (prev === i || ids.includes(i))
			{
				continue LABEL_TOP;
			}

			ids.push(prev = i);
			--size_runtime;
		}
		while (size_runtime > 0);

		return ids;
	}
}

export default dfArrayIndex
