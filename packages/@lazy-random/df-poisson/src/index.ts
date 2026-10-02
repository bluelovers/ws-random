import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract'

/**
 * 預先計算的自然對數階乘 (Log Factorial) 查表，索引 0-9 對應 ln(k!)
 * Precomputed lookup table of ln(k!) for indices 0-9
 * 供泊松分佈 (Poisson Distribution) 的對數機率檢定快速取值，避免重複計算階乘
 * Used by the log-probability tests to fetch ln(k!) quickly instead of recomputing factorials
 */
const logFactorialTable = [
	0.0,
	0.0,
	0.69314718055994529,
	1.7917594692280550,
	3.1780538303479458,
	4.7874917427820458,
	6.5792512120101012,
	8.5251613610654147,
	10.604602902745251,
	12.801827480081469,
] as const

/**
 * 取得 ln(k!) 的查表值 / Get the lookup value of ln(k!)
 *
 * @param k 階乘的索引 (Factorial index)，僅支援 0-9（查表長度限制）；超出範圍會回傳 undefined
 * @returns ln(k!) 的浮點數值 / The floating point value of ln(k!)
 */
const logFactorial = (k: number) =>
{
	return logFactorialTable[k]
}

/**
 * ln(√(2π)) 常數 / The constant ln(sqrt(2π))
 * 作為 Stirling 近似 (Stirling's Approximation) 計算大 k 的 ln(k!) 時的偏移項
 * Used as the offset term when Stirling's approximation computes ln(k!) for large k
 */
const logSqrt2PI = 0.91893853320467267

/**
 * 建立泊松分佈 (Poisson Distribution) 亂數 (Random Number) 產生器
 * Create a Poisson distribution random number generator
 *
 * 依 lambda 大小自動選擇演算法：lambda < 10 使用反轉法 (Inversion Method)，
 * 否則使用產生法 (Generative Method / transformed rejection)
 * Automatically selects the algorithm by lambda: inversion for lambda < 10,
 * otherwise the generative (transformed rejection) method
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0,1) 的數值
 * @param lambda 泊松分佈的平均值 (Mean)，必須大於 0，預設為 1
 * @returns 回傳一個可反覆呼叫的產生器函式 (Generator Function)，每次回傳一個非負整數
 * @throws 當 lambda <= 0 時，由 expect(lambda).gt(0) 拋出錯誤
 */
export function dfPoisson(random: IRNGLike, lambda = 1)
{
	//ow(lambda, ow.number.positive)
	/**
	 * 事先驗證 lambda > 0，避免後續 log/exp 運算產生無效結果
	 * Validate lambda > 0 up-front to avoid invalid log/exp results later
	 */
	expect(lambda).gt(0);

	/**
	 * 以 lambda = 10 為界：小 lambda 用反轉法 (Inversion Method) 較快；
	 * 大 lambda 反轉法迭代次數暴增，改用產生法 (Generative Method)
	 * Threshold lambda = 10: inversion is faster for small lambda; for large lambda
	 * the inversion loop iterates too many times, so the generative method is used
	 */
	if (lambda < 10)
	{
		// inversion method
		const expMean = Math.exp(-lambda)

		return () =>
		{
			let p = expMean
			let x = 0
			let u = random.next()

			/**
			 * 反轉法 (Inversion Method)：逐項累減機率質量 (Probability Mass)
			 * 直到 u 落入目前累積區間，此時的 x 即為抽樣結果；
			 * 迴圈終止條件依賴 p 遞增覆蓋整個 [0,1) 區間
			 * Inversion method: subtract successive probability masses until u falls
			 * into the accumulated interval; the current x is the sampled result.
			 * Termination relies on p growing to cover the whole [0,1) range
			 */
			while (u > p)
			{
				u = u - p
				p = lambda * p / ++x
			}

			return x
		}
	}
	else
	{
		// generative method
		/**
		 * 產生法 (Generative Method)：以預先算好的常數近似泊松分佈的候選值，
		 * 這些常數僅依 lambda 計算一次，於閉包 (Closure) 建立時快取以避免重複運算
		 * Generative method: precomputed constants approximate candidate Poisson values;
		 * they depend only on lambda and are computed once at closure creation to avoid recompute
		 */
		const smu = Math.sqrt(lambda)
		const b = 0.931 + 2.53 * smu
		const a = -0.059 + 0.02483 * b
		const invAlpha = 1.1239 + 1.1328 / (b - 3.4)
		const vR = 0.9277 - 3.6224 / (b - 2)

		return () =>
		{
			/**
			 * 拒絕抽樣 (Rejection Sampling) 主迴圈：候選值可能被拒絕，需反覆嘗試直到接受；
			 * 無限迴圈的終止保證來自後續的接受檢定分支
			 * Main rejection-sampling loop: candidates may be rejected, so retry until one is
			 * accepted; termination of this infinite loop is guaranteed by the acceptance tests below
			 */
			while (true)
			{
				let u
				let v = random.next()

				/**
				 * 快速接受路徑 (Fast Accept Path)：v 落在 [0, 0.86*vR) 時可直接
				 * 推導出 k 並立刻接受，省去後續的機率密度檢定
				 * Fast accept path: when v falls in [0, 0.86*vR) the value k can be
				 * derived and accepted immediately, skipping the density test below
				 */
				if (v <= 0.86 * vR)
				{
					u = v / vR - 0.43
					return Math.floor((2 * a / (0.5 - Math.abs(u)) + b) * u + lambda + 0.445)
				}

				/**
				 * 依 v 與 vR 的相對位置決定對稱變數 u 的取法：
				 * v >= vR 時直接取 [-0.5,0.5) 的均勻值；否則以折返映像 (Reflection)
				 * 將區間對齊並重新抽取 v，使 u 的分佈維持對稱
				 * Choose the symmetric variate u by comparing v with vR: take a uniform
				 * value in [-0.5,0.5) when v >= vR; otherwise reflect the interval and
				 * redraw v so that u stays symmetric
				 */
				if (v >= vR)
				{
					u = random.next() - 0.5
				}
				else
				{
					u = v / vR - 0.93
					u = ((u < 0) ? -0.5 : 0.5) - u
					v = random.next() * vR
				}

				/**
				 * 邊界情況 (Boundary Case)：us 過小代表 u 逼近區間端點，
				 * 此時密度近似誤差過大，直接放棄本次樣本以維持正確性
				 * Boundary case: a tiny us means u approaches the interval edge where the
				 * density approximation error is too large, so discard this sample to stay correct
				 */
				const us = 0.5 - Math.abs(u)
				if (us < 0.013 && v > us)
				{
					continue
				}

				/**
				 * 以變換後的 u 推導候選值 k，並對 v 做相同的比例縮放，
				 * 使後續的對數機率比較能在同一尺度上進行
				 * Derive candidate k from the transformed u and rescale v by the same factor
				 * so the following log-probability comparisons work on the same scale
				 */
				const k = Math.floor((2 * a / us + b) * u + lambda + 0.445)
				v = v * invAlpha / (a / (us * us) + b)

				/**
				 * 接受檢定 (Acceptance Test) 依 k 的大小分流：
				 * k >= 10 用 Stirling 近似 (Stirling's Approximation) 的對數階乘；
				 * 0 <= k < 10 用查表值；k < 0 為無效候選值，直接落入下一輪迴圈重抽
				 * Acceptance test branches by k size: for k >= 10 use the Stirling-approximated
				 * log-factorial; for 0 <= k < 10 use the lookup table; k < 0 is an invalid
				 * candidate and falls through to the next loop iteration
				 */
				if (k >= 10)
				{
					const t = (k + 0.5) * Math.log(lambda / k) - lambda - logSqrt2PI +
						k - (1 / 12.0 - (1 / 360.0 - 1 / (1260.0 * k * k)) / (k * k)) / k

					if (Math.log(v * smu) <= t)
					{
						return k
					}
				}
				else if (k >= 0)
				{
					if (Math.log(v) <= k * Math.log(lambda) - lambda - logFactorial(k))
					{
						return k
					}
				}
			}
		}
	}
}

export default dfPoisson
