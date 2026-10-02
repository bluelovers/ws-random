import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract'

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
export function dfNormal(random: IRNGLike, mu = 0, sigma = 1)
{
	//ow(mu, ow.number)
	//ow(sigma, ow.number)

	/*
	 * 只驗證型別為數字：mu 可為任何實數（含負數），
	 * sigma 雖在數學上應為非負，但負值只會反轉分佈方向、不會產生 NaN，故不加限制。
	 * Only the type is checked: mu may be any real number (including
	 * negatives), and although sigma should be non-negative mathematically, a
	 * negative value merely mirrors the distribution instead of producing NaN,
	 * so it is left unrestricted.
	 */
	expect(mu).number();
	expect(sigma).number();

	return () =>
	{
		let x: number, y: number, r: number

		/*
		 * 拒絕採樣 (Rejection Sampling)：在 [-1, 1] 內取點，
		 * 只保留落在單位圓內（0 < r ≤ 1）的點，使 x、y 近似均勻分配於圓盤。
		 * Rejection sampling: draw points within [-1, 1] and keep only those
		 * inside the unit circle (0 < r ≤ 1) so x and y stay uniformly
		 * distributed over the disc.
		 * r = 0（原點）會讓後續 log(0) 得到 -Infinity，因此一併剔除。
		 * r = 0 (the origin) would make log(0) yield -Infinity later, so it is
		 * rejected as well.
		 */
		do
		{
			x = random.next() * 2 - 1
			y = random.next() * 2 - 1
			r = x * x + y * y
		}
		while (!r || r > 1)

		/*
		 * 極座標法的標準公式：y * sqrt(-2 * ln(r) / r) 即為標準常態值 z，
		 * 再以 mu、sigma 平移與縮放；此處只用到 y，x 僅參與 r 的計算。
		 * The standard polar-method formula: y * sqrt(-2 * ln(r) / r) is the
		 * standard normal value z, then shifted/scaled by mu and sigma; only y
		 * is used here, x merely takes part in computing r.
		 */
		return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r)
	}
}

