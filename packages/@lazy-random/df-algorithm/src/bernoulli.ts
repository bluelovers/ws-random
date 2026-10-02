import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 伯努利分佈 (Bernoulli Distribution)：回傳 1（成功）或 0（失敗）
 * Bernoulli distribution: returns 1 (success) or 0 (failure).
 *
 * 成功的機率為 p，屬於單次試驗的結果；二項分佈 (Binomial Distribution)
 * 即為多次伯努利試驗的總和。
 * Success occurs with probability p and models a single trial; the binomial
 * distribution is the sum of repeated Bernoulli trials.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param p 成功機率，範圍 0 ≤ p ≤ 1，預設 0.5
 * @returns 取樣函式 (Sampler)，每次呼叫回傳 0 或 1
 */
export function dfBernoulli(random: IRNGLike, p = 0.5)
{
	//ow(p, ow.number.gte(0).lte(1))
	/*
	 * p 超出 [0, 1] 代表機率定義不成立，在建立期直接拒絕，
	 * 避免產生永遠為 0 或永遠為 1 的無意義取樣。
	 * Reject p outside [0, 1] at build time so the sampler can never
	 * degenerate into an always-0 or always-1 generator.
	 */
	expect(p).number.gte(0).lte(1)

	return () =>
	{
		/*
		 * 以 floor(next() + p) 達成閾值判斷：next() 落在 [1-p, 1) 時
		 * 相加後 ≥ 1、進位成 1，該區間長度恰好為 p，故成功機率即為 p。
		 * Threshold trick via floor(next() + p): when next() lands in
		 * [1-p, 1) the sum reaches ≥ 1 and floors to 1; that interval has
		 * length exactly p, so the success probability equals p.
		 */
		return Math.floor(random.next() + p)
	}
}

