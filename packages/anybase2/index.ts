import { assertNumberBase } from './lib/assertNumberBase';
import { padNumber } from './lib/padNumber';
import { decToBase, baseToDec } from './lib/convert';
import { isIntBetween } from './lib/isIntBetween';

/**
 * 將數字於任意進位制之間互相轉換
 * Convert a number between arbitrary numeric bases
 *
 * 轉換流程 (Conversion flow)：
 * 1. 參數轉型並驗證範圍 (coerce & validate arguments)
 * 2. 以十進位 (Base 10) 為中繼表示，先轉入再轉出
 * 3. 依 minimum_digits / maximum_digits 補齊或截斷
 *
 * @param target_base - 目標進位制 (target numeric base)，2 ... 62
 * @param original_number - 原始數字 (original number)
 * @param original_base - 原始進位制 (original numeric base)，預設 10
 * @param minimum_digits - 最小位數 (minimum digits)，不足以 `0` 補齊
 * @param maximum_digits - 最大位數 (maximum digits)，超出則截斷
 * @returns 轉換後的字串 (converted string)
 * @throws 進位制／位數超出範圍，或數字包含該進位制不支援的字元時拋出 (throws `Error`)
 */
export function anybase(target_base: number,
	original_number: string | number,
	original_base = 10,
	minimum_digits = 0,
	maximum_digits = 0,
): string
{
	/**
	 * 統一轉為數值 (Coerce arguments to numbers)
	 *
	 * CLI 透過 `process.argv` 傳入的參數皆為字串，
	 * 若不先轉型，後續的範圍檢查會因型別不符而失效
	 */
	target_base = Number(target_base);
	original_base = Number(original_base);
	minimum_digits = Number(minimum_digits);
	maximum_digits = Number(maximum_digits);

	/**
	 * 驗證進位制與位數皆落在允許範圍內
	 * Validate bases and digit limits against the supported range
	 *
	 * 2 ... 62 來自數值對照表 (digit map) 的長度；
	 * 0 ... 64 則是輸出位數的上下限。
	 *
	 * TODO: maximum_digits 的錯誤訊息目前沿用 minimum digits 字樣，
	 * 與實際檢查的項目不符，待確認是否為原始專案的既知問題
	 */
	if (!isIntBetween(target_base, 2, 62))
	{
		throw new Error('Invalid target numeric base specified: `' + target_base + '` (expected: 2 .. 62)');
	}
	if (!isIntBetween(original_base, 2, 62))
	{
		throw new Error('Invalid original numeric base specified: `' + original_base + '` (expected: 2 .. 62)');
	}
	if (!isIntBetween(minimum_digits, 0, 64))
	{
		throw new Error('Invalid minimum digits requested: `' + minimum_digits + '` (expected: 1 .. 64)');
	}
	if (!isIntBetween(maximum_digits, 0, 64))
	{
		throw new Error('Invalid minimum digits requested: `' + maximum_digits + '` (expected: 1 .. 64)');
	}

	/**
	 * 統一為字串表示 (Normalise to string representation)
	 *
	 * 原始進位制 <= 16 時轉為大寫：
	 * 此時對照表僅會用到 0-9 與 A-F，統一大小寫可避免
	 * 同一數值因大小寫不同而被誤判為不同字元
	 */
	let returnValue: number | string = String(original_number);

	if (original_base <= 16)
	{
		returnValue = returnValue.toUpperCase();
	}

	/**
	 * 逐字元檢查數字是否由該進位制支援的字元組成
	 * Validate every digit against the source base
	 *
	 * 必須在轉換前執行，否則無效字元會在查表時變成 `undefined`
	 * 並靜默產生錯誤結果
	 */
	assertNumberBase(returnValue, original_number, original_base);

	/**
	 * 以十進位為中繼表示 (Use Base 10 as the intermediate representation)
	 *
	 * 任意進位制兩兩轉換的組合數量過大，
	 * 改為「原進位制 → 十進位 → 目標進位制」可只實作兩種轉換
	 */
	if (original_base !== 10)
	{
		returnValue = baseToDec(returnValue, original_base);
	}
	else
	{
		returnValue = Number(returnValue);
	}

	/**
	 * 十進位轉為目標進位制 (Convert from Base 10 to the target base)
	 *
	 * 原本就是十進位時可略過此步驟
	 */
	if (target_base !== 10)
	{
		returnValue = decToBase(returnValue, target_base);
	}

	/**
	 * 依 minimum_digits 補零、maximum_digits 截斷
	 * Pad with leading zeros or truncate to the requested digit count
	 */
	returnValue = padNumber(String(returnValue), minimum_digits, maximum_digits);

	/**
	 * 邊界情況：空字串輸入直接回傳 `'0'`
	 * Edge case: an empty input string yields `'0'`
	 *
	 * 上方的轉換流程對空字串會得到空結果，
	 * 需在此提前回傳，避免呼叫端拿到空字串
	 */
	if (original_number === '')
	{
		return '0';
	}

	return returnValue;
}

export default anybase
