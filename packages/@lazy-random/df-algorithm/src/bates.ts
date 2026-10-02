import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { dfIrwinHall } from './irwin-hall'

/**
 * 貝茲分佈 (Bates Distribution)：回傳 n 個均勻分佈樣本的平均值
 * Bates distribution: returns the average of n uniform samples.
 *
 * 透過 Irwin–Hall 分佈的總和除以 n 取得平均，結果落在 [0, 1)；
 * n = 1 時退化為均勻分佈 (Uniform Distribution)。
 * The Irwin–Hall sum is divided by n to produce the mean, which falls in
 * [0, 1); with n = 1 it degenerates to a uniform distribution.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param n 均勻樣本數，需為正整數 (Positive Integer)
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個 [0, 1) 的值
 */
export function dfBates(random: IRNGLike, n: number = 1)
{
	//ow(n, ow.number.integer.positive)
	/*
	 * 參數驗證放在建立期而非取樣期：n 不合法就直接失敗，
	 * 避免錯誤參數一路延到第一次取樣才爆出來。
	 * Validate eagerly at build time instead of sampling time, so an
	 * invalid n fails fast rather than at the first sample.
	 */
	expect(n).integer.gt(0)

	/*
	 * 固定的 Irwin–Hall 取樣器只建立一次，回傳的閉包 (Closure) 直接重複使用。
	 * Build the fixed Irwin–Hall sampler once; the returned closure reuses it.
	 */
	const irwinHall = dfIrwinHall(random, n)

	return () =>
	{
		/*
		 * 除以 n 把總和轉為平均值，使結果落回 [0, 1)
		 * Divide the sum by n to turn the total back into a mean in [0, 1).
		 */
		return irwinHall() / n
	}
}
