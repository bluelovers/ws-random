import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 幾何分佈 (Geometric Distribution)：回傳首次成功所需的試驗次數（含成功那次）
 * Geometric distribution: returns the number of trials needed for the first
 * success (including the successful trial itself).
 *
 * 以反函數法 (Inverse Transform) 取樣，結果為 ≥ 1 的整數，
 * 適合模擬「重複某動作直到成功」的次數。
 * Sampled with the inverse transform; the result is an integer ≥ 1, which
 * models repeating an action until the first success.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param p 成功機率，範圍 0 < p ≤ 1，預設 0.5
 * @returns 取樣函式 (Sampler)，每次呼叫回傳 ≥ 1 的整數
 */
export function dfGeometric(random: IRNGLike, p = 0.5)
{
	//ow(p, ow.number.gt(0).lte(1))
	/*
	 * p = 0 代表永遠不會成功、p > 1 則不是合法機率，
	 * 兩者都會讓公式中的 log(1 - p) 失去意義，故於建立期拒絕。
	 * p = 0 means success never happens and p > 1 is not a valid
	 * probability; either breaks log(1 - p), so both are rejected eagerly.
	 */
	expect(p).number.gt(0).lte(1)

	/*
	 * 預先算出 1 / log(1 - p)：這是固定的常數，
	 * 每次取樣重算會白白浪費一次對數運算。
	 * Precompute 1 / log(1 - p): it is a constant, so recomputing the
	 * logarithm on every sample would be wasted work.
	 */
	const invLogP = 1.0 / Math.log(1.0 - p)

	return () =>
	{
		/*
		 * 反函數公式 floor(1 + log(U) / log(1 - p))；U 接近 0 時對數為
		 * 很大的負數、除以同樣為負的 log(1 - p) 得到較大次數，符合長尾特性。
		 * 邊界情況 (Edge Case)：若 random.next() 回傳 0，log(0) 會得到
		 * -Infinity，最終回傳 Infinity；此時應視為 RNG 的極端取值而非錯誤。
		 * Inverse formula floor(1 + log(U) / log(1 - p)); a U near 0 gives a
		 * large negative logarithm which, divided by the also-negative
		 * log(1 - p), yields a larger trial count, matching the long tail.
		 * Edge case: if random.next() returns 0, log(0) is -Infinity and the
		 * result is Infinity; treat it as an extreme draw, not an error.
		 */
		return Math.floor(1 + Math.log(random.next()) * invLogP)
	}
}

