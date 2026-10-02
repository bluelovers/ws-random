// @ts-ignore
import { IRNG } from 'lib-r-math.js';

/**
 * 把任意回傳 0～1 的亂數 (Random Number) 函式包裝為 lib-r-math.js 的 IRNG 介面 (Interface)，
 * 使自訂的偽亂數發生器 (PRNG) 能取代 R 統計函式內部的亂數來源。
 *
 * Wraps an arbitrary 0~1 random number function into the IRNG interface of
 * lib-r-math.js, so a custom PRNG can act as the entropy source of R
 * statistical functions.
 *
 * @param fn 底層亂數函式，每次呼叫回傳一個 0～1 的亂數 / the underlying function returning one 0~1 random number
 * @returns 含 `unif_rand` 與 `internal_unif_rand` 的 IRNG 物件 / an IRNG object exposing `unif_rand` and `internal_unif_rand`
 */
export function fakeLibRMathRng(fn: () => number): IRNG
{
	/**
	 * 依需求量產生亂數：lib-r-math.js 的實作會以參數 n 決定回傳單一值或陣列，
	 * 因此這裡沿用相同的「大於 1 才回傳陣列」分支。
	 *
	 * Produces random values on demand: lib-r-math.js implementations decide
	 * between a scalar and an array by the argument n, so this keeps the same
	 * "array only when greater than 1" branching.
	 *
	 * @param n 要產生的亂數個數 / how many random numbers to produce
	 * @returns n > 1 時回傳長度 n 的陣列，否則回傳單一亂數 / an array of length n when n > 1, otherwise a single random number
	 *
	 * TODO: 疑似邊界問題：n === 1 時會走單值分支回傳標量 (Scalar) 而非長度 1 的陣列，
	 *       與一般「n 個元素回傳陣列」的期待可能不符；僅記錄不修改邏輯。
	 *       Suspected edge case: n === 1 falls through to the scalar branch instead
	 *       of a length-1 array; recorded here without changing the logic.
	 */
	function unif_rand(n?: number)
	{
		/**
		 * 只有 n > 1 才需要陣列；n 為 undefined、0 或 1 都視為「取單一亂數」，
		 * 與 lib-r-math.js 呼叫端通常不傳參數的用法相容。
		 *
		 * Only n > 1 needs an array; undefined, 0 or 1 are all treated as
		 * "fetch a single random number", which stays compatible with the
		 * lib-r-math.js callers that usually pass no argument.
		 */
		if (n > 1)
		{
			let a = [];
			/**
			 * 由尾到頭填入（先填 a[n-1] 再往前），配合 while (n--) 讓索引 (Index)
			 * 與遞減中的 n 一致，同時把陣列一次分配到最終長度。
			 *
			 * Fills from the end backwards (a[n-1] first), so the index matches
			 * the decrementing n and the array reaches its final length in one pass.
			 */
			while (n--)
			{
				a[n] = fn()
			}
			return a;
		}

		/**
		 * 單值分支：直接回傳一次亂數，涵蓋未傳參數以及 n <= 1 的情況。
		 *
		 * Scalar branch: returns a single draw, covering both the no-argument
		 * case and n <= 1.
		 */
		return fn()
	}

	/**
	 * 回傳符合 IRNG 形狀 (Shape) 的物件；unif_rand 同時掛在兩個欄位上，
	 * 因為 lib-r-math.js 的不同程式碼路徑會取用不同欄位名稱。
	 *
	 * Returns an object shaped like IRNG; unif_rand is exposed under both
	 * fields because different lib-r-math.js code paths read different names.
	 */
	return {
		// @ts-ignore
		unif_rand,
		internal_unif_rand: unif_rand,
	} satisfies IRNG
}

/**
 * 預設匯出 (Default Export)，與具名的 fakeLibRMathRng 為同一個函式。
 *
 * Default export; the same function as the named fakeLibRMathRng.
 */
export default fakeLibRMathRng
