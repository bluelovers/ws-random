
/**
 * 依最小／最大位數調整數字字串長度
 * Adjust the digit string to the requested minimum/maximum length
 *
 * @param returnValue - 待調整的數字字串 (digit string to adjust)
 * @param minimum_digits - 最小位數，大於 0 時以前導 `0` 補齊
 * @param maximum_digits - 最大位數，大於 0 且超出時截斷
 * @returns 調整後的字串 (adjusted string)
 */
export function padNumber(returnValue: string, minimum_digits: number, maximum_digits: number)
{
	/**
	 * 補齊前導零 (Pad leading zeros)
	 *
	 * 設為 0 表示不啟用此限制，
	 * 因此只有 `minimum_digits > 0` 才會補齊
	 */
	if (minimum_digits > 0)
	{
		returnValue = returnValue.padStart(minimum_digits, '0')
	}

	/**
	 * 截斷多餘位數 (Truncate excess digits)
	 *
	 * 必須在補齊之後執行：補齊可能使字串變長，
	 * 先截斷會讓補齊結果再次超出上限
	 */
	if (maximum_digits > 0 && returnValue.length > maximum_digits)
	{
		returnValue = returnValue.substr(0, maximum_digits);
	}

	return returnValue
}
