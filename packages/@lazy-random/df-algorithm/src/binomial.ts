import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 二項分佈 (Binomial Distribution)：回傳 n 次獨立試驗中的成功次數
 * Binomial distribution: returns the number of successes in n independent trials.
 *
 * 實作方式為重複執行 n 次伯努利判斷 (Bernoulli Trial) 再累加，
 * 結果範圍為 0 ～ n 的整數。
 * Implemented by running the Bernoulli test n times and summing the hits;
 * the result is an integer in the range 0 to n.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param n 試驗次數，需為正整數 (Positive Integer)，預設 1
 * @param p 單次試驗的成功機率，範圍 0 ≤ p ≤ 1，預設 0.5
 * @returns 取樣函式 (Sampler)，每次呼叫回傳 0 ～ n 的整數
 */
export function dfBinomial(random: IRNGLike, n: number = 1, p: number = 0.5)
{
	/*
	 * 兩個參數都在建立期驗證：n 必須為正整數、p 必須為合法機率，
	 * 讓每次取樣只需專注在迴圈本身。
	 * Both parameters are validated at build time (n a positive integer, p a
	 * valid probability) so each sample only has to run the loop.
	 */
	expect(n).integer.gt(0)
	expect(p).number.gte(0).lte(1)

	return () =>
	{
		let i = n
		let x = 0

		/*
		 * while (i--) 會先判斷再遞減，故 i 從 n 一路數到 0，
		 * 恰好執行 n 次；x 累計每次判斷為成功的次數。
		 * `while (i--)` tests before decrementing, so i counts from n down
		 * to 0 for exactly n iterations; x accumulates the successes.
		 */
		while (i--)
		{
			/*
			 * 亂數小於 p 即視為成功；與伯努利分佈相同的閾值判斷，
			 * 但改用 `<` 比較，省去一次加法與取整。
			 * A draw below p counts as a success; the same threshold idea as
			 * the Bernoulli sampler, but using `<` avoids add + floor.
			 */
			if (random.next() < p)
			{
				x++
			}
		}

		return x
	}
}

