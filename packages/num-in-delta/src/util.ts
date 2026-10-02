import Big from 'big.js';

/**
 * 計算期望值與實際值的絕對差值 (Absolute Difference)。
 * Calculate the absolute difference between the expected and actual values.
 *
 * @param actual 實際數值 actual number
 * @param expected 期望數值 expected number
 * @returns 以十進位精確計算後取絕對值的差值 the absolute difference computed with decimal precision
 */
export function subAbs(actual: number, expected: number)
{
	//console.log(sub(expected, actual), typeof sub(expected, actual))
	/**
	 * 透過 big.js 相減再取絕對值，避免二進位浮點數 (Binary Floating Point)
	 * 直接相減時產生誤差；最後以 .valueOf() 轉回 number 方便一般運算使用。
	 *
	 * Subtracts via big.js then takes the absolute value to avoid binary
	 * floating-point errors; .valueOf() converts the result back to number.
	 */
	return new Big(expected)
		.sub(actual)
		.abs().valueOf()
}

/**
 * 以 Math.abs 判斷實際值是否落在期望值 ± 容許誤差 (Delta) 範圍內。
 * Check with Math.abs whether the actual value is within expected ± delta.
 *
 * @param actual 實際數值 actual number
 * @param expected 期望數值 expected number
 * @param delta 容許誤差 allowed delta，預設 0.05 defaults to 0.05
 * @returns 差值是否小於等於 delta whether the difference is within delta (inclusive)
 */
export function numberInDeltaUnsafe002(actual: number, expected: number, delta = 0.05)
{
	/**
	 * 相比 numberInDelta 的 big.js 版本，此處直接使用 Math.abs 計算，
	 * 速度快但可能受浮點數精度影響，故函式名稱帶有 Unsafe。
	 *
	 * Faster than the big.js-based numberInDelta, but may be affected by
	 * floating-point precision, hence the Unsafe name.
	 */
	return Math.abs(expected - actual) <= delta
}
