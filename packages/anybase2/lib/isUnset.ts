
/**
 * 判斷值是否為「未設定」(null 或 undefined)
 * Check whether a value is unset (`null` or `undefined`)
 *
 * 作為型別守衛 (type guard)，讓通過檢查的值收窄為
 * `undefined | null`，其餘分支則排除這兩種型別
 *
 * @param n - 待檢查的值 (value to check)
 * @returns 是否為 null 或 undefined (whether the value is null or undefined)
 */
export function isUnset(n): n is undefined | null
{
	return typeof n === 'undefined' || n === null
}
