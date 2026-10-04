import { IRNGLike } from '@lazy-random/rng-abstract-core';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { _handleStartEnd } from './util/options';
import { randIndexWithRange } from '@lazy-random/util-distributions';

/**
 * 由「已驗證的」半開區間 `[start, end)` 建立單一索引取樣器，不做任何區間驗證
 * Build a single-index sampler from an already-validated half-open `[start, end)`, performing no range checks
 *
 * 這是底層 core：前置條件 `0 <= start < end <= length` 由 `_handleStartEnd()`
 * 把關，本函式不再重複驗證。`dfArrayIndex()` 也直接吃這個 core，
 * 讓「取樣器的區間」與「可用數量」出自同一份正規化的結果。
 * This is the lower core: the `0 <= start < end <= length` precondition is
 * guarded by `_handleStartEnd()` and is not re-checked here. `dfArrayIndex()`
 * consumes the same core, so the sampler's range and its runnable count come
 * from one normalisation instead of two.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param start 起始索引（含），已驗證 / inclusive start index, already validated
 * @param end 結束索引（不含），已驗證 / exclusive end index, already validated
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個索引 / a sampler returning one index per call
 */
export function _createIndexSampler(random: IRNGLike, start: number, end: number)
{
	/*
	 * 區間只有一個候選索引時直接回傳常數函式，
	 * 省下每次呼叫都要產生、比較亂數的開銷。
	 * When the range holds exactly one candidate, return a constant
	 * sampler so no random number has to be drawn on each call.
	 */
	if (start === end - 1)
	{
		return () => start
	}

	return () =>
	{
		/*
		 * 交給 randIndexWithRange() 於半開區間 [start, end) 取整數索引。
		 *
		 * 這裡不能改用 int()：int() 是含端點的 [start, end]，而區間契約是
		 * 半開的 [start, end)，兩者差一個位置。當 end === arr.length
		 * （也就是 start/end 都不傳的預設情形）時，int() 會抽中 arr.length，
		 * 呼叫端拿 arr[index] 就會得到 undefined —— 少量呼叫不容易發現，
		 * 大量取樣下幾乎必然出現。
		 *
		 * Draw an integer index within the half-open [start, end) via
		 * randIndexWithRange().
		 *
		 * int() must not be used here: it covers the inclusive [start, end] while
		 * the contract is the half-open [start, end) — the two differ by one
		 * position. When end === arr.length (the default when neither bound is
		 * passed) int() can draw arr.length, and the caller reading arr[index]
		 * gets undefined: rare in a handful of calls, but practically guaranteed
		 * under heavy sampling.
		 */
		return randIndexWithRange(random, start, end)
	}
}

/**
 * 回傳陣列的單一索引值 (Index Number)
 * return index number form array
 *
 * 每次呼叫回傳 [start, end) 內的一個隨機索引，允許重複；
 * 與 dfArrayIndex 的不重複取樣不同。
 * Each call returns one random index in [start, end) and repeats are
 * allowed, unlike the distinct sampling of dfArrayIndex.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 目標陣列
 * @param start 起始索引（含），負值會被歸零，預設 0
 * @param end 結束索引（不含），預設為陣列長度
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個索引
 */
export function dfArrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(random: IRNGLike,
	arr: T,
	start: number = 0,
	end?: number
)
{
	/*
	 * 唯一一次的正規化與驗證：負值歸零、end 預設為陣列長度，
	 * 並確保區間至少含一個候選索引；通過後才交給 core。
	 * The single normalisation and validation: clamp negatives to 0, default end
	 * to the array length, and guarantee the range holds at least one candidate;
	 * only then does it hand off to the core.
	 */
	({
		start,
		end,
	} = _handleStartEnd(arr, start, end));

	return _createIndexSampler(random, start, end);
}

export default dfArrayIndexOne
