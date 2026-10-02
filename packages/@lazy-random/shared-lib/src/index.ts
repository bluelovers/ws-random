
export * from './const';
export * from './types';
export * from './byte';
export * from './memoize';

/**
 * 判斷輸入是否未設定 (Unset)，即 `undefined` 或 `null`。
 * Check whether a value is unset, i.e. `undefined` or `null`.
 *
 * 以型別守衛 (Type Guard) 回傳，讓呼叫端在判斷後能直接收窄 (Narrow) 型別。
 * Returns a type guard so callers can narrow the type after the check.
 *
 * @param n 待檢查的值 / The value to check
 * @returns 是否為 `undefined` 或 `null` / Whether the value is `undefined` or `null`
 */
export function isUnset(n: unknown): n is undefined | null
{
	return typeof n === 'undefined' || n === null
}
