import { IRNGLike } from '@lazy-random/rng-abstract-core';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { _handleStartEnd } from './util/options';
import { int } from '@lazy-random/util-distributions';

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
	 * 先正規化 start/end：負值歸零、end 預設為陣列長度，
	 * 並確保區間至少含一個候選索引。
	 * Normalise start/end first: clamp negatives to 0, default end to the
	 * array length, and guarantee the range holds at least one candidate.
	 */
	({
		start,
		end,
	} = _handleStartEnd(arr, start, end));

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
		 * 其餘情況交給 int() 於 [start, end) 內取整數索引
		 * Otherwise let int() draw an integer index within [start, end).
		 */
		return int(random, start, end)
	}
}

export default dfArrayIndexOne
