
import _hashSum from 'hash-sum';

/**
 * 計算任意輸入的雜湊 (Hash) 字串。
 * Compute a hash string for any input.
 *
 * 直接委由 `hash-sum` 處理物件、數值等任意型別，作為種子正規化的共用工具 (Utility)。
 *
 * @param input 待雜湊的任意值 / The value to hash
 * @param argv 傳給底層 `hash-sum` 的額外參數 / Extra arguments forwarded to `hash-sum`
 * @returns 雜湊字串 / The hash string
 */
export function hashSum(input, ...argv): string
{
	return _hashSum(input, ...argv)
}

export default hashSum
