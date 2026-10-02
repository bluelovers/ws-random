import { isUnset } from './isUnset';

/**
 * 檢查數值是否為介於 `[min, max]` 的整數
 * Check whether a number is an integer within `[min, max]`
 *
 * `min` / `max` 省略時該側不設限 (open bound)。
 * 同時作為型別守衛 (type guard)，讓通過檢查的值收窄為 `number`
 *
 * @param n - 待檢查的數值 (value to check)
 * @param min - 下界 (lower bound)，可省略
 * @param max - 上界 (upper bound)，可省略
 * @returns 是否為範圍內的整數 (whether the value is an integer within the range)
 */
export function isIntBetween(n: number, min?: number, max?: number): n is number
{
	/**
	 * 以單一否定式表達四種失敗情形 (Negated check for all failure cases)：
	 *
	 * 1. `isNaN(n)` — 非數字 (NaN)，例如字串轉型失敗
	 * 2. `Math.round(n) !== n` — 非整數，排除小數
	 * 3. `n < min` — 小於下界，且下界有設定時才檢查
	 * 4. `n > max` — 大於上界，且上界有設定時才檢查
	 *
	 * 以 `isUnset` 判斷邊界是否有設定，
	 * 可同時相容 `undefined` 與 `null` 兩種「未設定」表示法
	 */
	return !(
		isNaN(n)
		|| Math.round(n) !== n
		|| (!isUnset(min) && n < min)
		|| (!isUnset(max) && n > max)
	);
}
