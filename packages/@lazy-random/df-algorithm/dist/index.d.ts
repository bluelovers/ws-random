import { IRNGLike } from '@lazy-random/rng-abstract';

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
export declare function dfBates(random: IRNGLike, n?: number): () => number;
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
export declare function dfBernoulli(random: IRNGLike, p?: number): () => number;
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
export declare function dfBinomial(random: IRNGLike, n?: number, p?: number): () => number;
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
export declare function dfExponential(random: IRNGLike, lambda?: number): () => number;
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
export declare function dfGeometric(random: IRNGLike, p?: number): () => number;
/**
 * Irwin–Hall 分佈：回傳 n 個均勻分佈樣本的總和
 * Irwin–Hall distribution: returns the sum of n uniform samples.
 *
 * 總和範圍為 [0, n)，是 Bates 分佈 (Bates Distribution) 的基礎；
 * n = 0 時固定回傳 0。
 * The sum ranges over [0, n) and underpins the Bates distribution;
 * when n = 0 the sampler always returns 0.
 *
 * https://zh.wikipedia.org/wiki/%E6%AD%90%E6%96%87%E2%80%93%E8%B3%80%E7%88%BE%E5%88%86%E4%BD%88
 * https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
export declare function dfIrwinHall(random: IRNGLike, n?: number): () => number;
/**
 * 常態分佈 (Normal Distribution / 高斯分佈 Gaussian)：回傳指定平均數與標準差的樣本
 * Normal (Gaussian) distribution: returns a sample with the given mean and
 * standard deviation.
 *
 * 採用 Marsaglia 極座標法 (Polar Method) 產生標準常態值，
 * 再以 mu + sigma * z 平移、縮放到目標分佈。
 * Uses the Marsaglia polar method to produce a standard normal value, then
 * shifts and scales it via mu + sigma * z.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param mu 平均值 (Mean)，預設 0
 * @param sigma 標準差 (Standard Deviation)，預設 1
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個實數
 */
export declare function dfNormal(random: IRNGLike, mu?: number, sigma?: number): () => number;
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
export declare function dfLogNormal(...args: Parameters<typeof dfNormal>): () => number;
/**
 * 帕累托分佈 (Pareto Distribution)：以反函數法 (Inverse Transform) 取樣
 * Pareto distribution sampled via inverse transform.
 *
 * 常用於描述「少數個體佔有多數資源」的長尾 (Long Tail) 現象，
 * alpha (α) 為形狀參數 (Shape Parameter)、決定尾部厚度。
 * Commonly models long-tail phenomena where a small share of items holds
 * most of the mass; alpha (α) is the shape parameter controlling tail weight.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param alpha 形狀參數，需 > 0，預設 1
 * @returns 取樣函式 (Sampler)，每次呼叫回傳 ≥ 1 的實數
 */
export declare function dfPareto(random: IRNGLike, alpha?: number): () => number;

export {};
