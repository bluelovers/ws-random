import { map } from './data';
import { isUnset } from './isUnset';

/**
 * 斷言數字字串完全由該進位制支援的字元所組成
 * Assert that the numeric string only contains characters valid for the given base
 *
 * 透過 TypeScript 的 assertion signature，讓呼叫端的變數
 * 在通過檢查後被收窄 (narrow) 為 `string`
 *
 * @param val - 已轉為字串的數字 (stringified number)
 * @param original_number - 原始輸入，僅用於錯誤訊息 (original input, used in the error message)
 * @param original_base - 原始進位制 (original numeric base)
 * @throws 存在無效字元時拋出 `Error`
 */
export function assertNumberBase(val: string, original_number: number | string, original_base: number): asserts val is string
{
	let len = val.length;

	/**
	 * 逐字元查表驗證 (Validate each character against the digit map)
	 *
	 * 兩種失敗情形：
	 * 1. `map[char]` 為 `undefined`（`isUnset`）— 字元不在對照表內
	 * 2. `v > original_base` — 數值超出該進位制可表示的範圍
	 *
	 * TODO: 目前使用 `v > original_base`，等於允許數值恰好等於
	 * 進位制本身（例如 base 10 接受 `A` = 10），與「有效數字須小於進位制」
	 * 的定義可能不符，待確認是否為原始專案的既知問題
	 */
	for (let m = 0; m < len; m++)
	{
		const char = val[m];
		const v = map[char]
		if (isUnset(v) || v > original_base)
		{
			throw new Error('Invalid digit(s) in number `' + original_number + '` for numeric ' + 'base `' + original_base + '` (expected positive integer ' + 'composed of alphanumeric characters only)');
		}
	}
}
