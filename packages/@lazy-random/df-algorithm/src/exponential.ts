import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 指數分佈 (Exponential Distribution)：以反函數法 (Inverse Transform) 取樣
 * Exponential distribution sampled via inverse transform.
 *
 * 常用於模擬事件間的等待時間 (Waiting Time)，參數 lambda (λ) 為率參數。
 * Commonly used to model waiting times between events; lambda (λ) is the
 * rate parameter.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param lambda 率參數 (Rate Parameter)，需 > 0，預設 1
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個非負實數
 */
export function dfExponential(random: IRNGLike, lambda = 1)
{
	//ow(lambda, ow.number.positive)
	/*
	 * lambda ≤ 0 時反函數公式無意義（對數除以 0 或負數會反轉分佈方向），
	 * 因此在建立期就拒絕。
	 * The inverse formula is meaningless when lambda ≤ 0 (division by zero or
	 * a negative rate would invert the distribution), so reject it eagerly.
	 */
	expect(lambda).number.gt(0)

	return () =>
	{
		/*
		 * 使用 1 - next() 而非直接取 next()：當亂數為 0 時
		 * log(1) = 0 得到 0，可避開 log(0) 產生 -Infinity 的邊界情況。
		 * Using 1 - next() instead of next() directly: when the draw is 0,
		 * log(1) = 0 yields 0, avoiding the log(0) → -Infinity edge case.
		 */
		return -Math.log(1 - random.next()) / lambda
	}
}

