/**
 * Created by user on 2020/6/27.
 */

/**
 * 判斷傳入值是否為零，涵蓋 `0` 與負零 (`-0`)。
 * Check whether the given value is zero, covering both `0` and negative zero (`-0`).
 *
 * @param val 任意待檢查的值 any value to check
 * @returns 型別守衛 (Type Guard)，成立時 `val` 為 `0` type guard, `val` is `0` when true
 */
export function isZero(val: unknown): val is 0
{
	/**
	 * JavaScript 中 `-0 === 0` 為 true，單看第一個條件已可涵蓋兩者；
	 * 額外列出 `val === -0` 是為了明確表達「負零也算零」的意圖，避免日後被誤判為多餘條件而移除。
	 *
	 * In JavaScript `-0 === 0` is true, so the first condition already covers both;
	 * `val === -0` is listed explicitly to document the intent that negative zero counts as zero.
	 */
	return val === 0 || val === -0
}

/**
 * 將負零 (`-0`) 正規化 (Normalize) 為 `0`，其餘值原樣回傳。
 * Normalize negative zero (`-0`) to `0`, returning all other values unchanged.
 *
 * @param val 待正規化的值 the value to normalize
 * @returns 與傳入值同型別的結果，`-0` 會變成 `0` the same type as input, with `-0` turned into `0`
 */
export function fixZero<T>(val: T) : T
{
	/**
	 * 只比較 `=== -0` 即可：`0` 不會命中此分支，其餘值（含 `NaN`）皆原樣回傳；
	 * 回傳 `0` 而非 `-0` 才能確保 `Object.is`、序列化等情境下的顯示一致。
	 *
	 * Only `=== -0` is compared: `0` never matches this branch and all other
	 * values (including `NaN`) pass through; returning `0` instead of `-0`
	 * keeps output consistent under `Object.is` and serialization.
	 */
	// @ts-ignore
	return val === -0 ? 0 : val
}

export default isZero
