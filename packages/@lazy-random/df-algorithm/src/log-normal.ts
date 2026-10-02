import { dfNormal } from './normal'

/**
 * 對數常態分佈 (Log-Normal Distribution)：回傳常態取樣值的指數
 * Log-normal distribution: returns the exponent of a normal sample.
 *
 * 若 X 服從常態分佈 (Normal Distribution)，則 exp(X) 服從對數常態分佈；
 * 因此直接複用 dfNormal 的取樣函式再加上 Math.exp。
 * If X follows a normal distribution, exp(X) follows a log-normal one, so
 * the underlying dfNormal sampler is reused and simply exponentiated.
 *
 * 參數與 dfNormal 完全相同，詳見 dfNormal 的說明。
 * Parameters are identical to dfNormal; see dfNormal for details.
 *
 * @param args 與 dfNormal(random, mu, sigma) 相同的參數 / same arguments as dfNormal(random, mu, sigma)
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個 > 0 的實數
 */
export function dfLogNormal(...args: Parameters<typeof dfNormal>)
{
	/*
	 * 常態取樣函式只建立一次，回傳的閉包 (Closure) 每次呼叫再取指數，
	 * 避免重複執行 dfNormal 內的參數驗證。
	 * Build the normal sampler once; the returned closure only exponentiates
	 * each draw, avoiding repeated parameter validation inside dfNormal.
	 */
	const normal = dfNormal(...args)

	return () =>
	{
		/*
		 * 常態值可為負，取指數後必為正，結果落在 (0, ∞)
		 * Normal values may be negative; exponentiating always yields a positive result in (0, ∞).
		 */
		return Math.exp(normal())
	}
}

