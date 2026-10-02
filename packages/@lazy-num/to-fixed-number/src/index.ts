
/**
 * 以固定小數點表示法 (Fixed-Point Notation) 格式化數字並回傳字串
 * Format a number using fixed-point notation and return it as a string
 *
 * @param n 要格式化的數字 / the number to format
 * @param fractionDigits 小數位數，允許 0-100 / the number of fraction digits, 0-100 allowed
 * @returns 格式化後的字串，不足的位數會補零 / the formatted string, padded with trailing zeros
 * @throws {RangeError} fractionDigits 超出允許範圍時由 toFixed 拋出 / thrown by toFixed when fractionDigits is out of range
 */
export function toFixedStringNumber(n: number, fractionDigits: number)
{
	return n.toFixed(fractionDigits)
}

/**
 * 以固定小數點表示法 (Fixed-Point Notation) 格式化數字並回傳數字
 * a number using fixed-point notation
 *
 * @param n 要格式化的數字 / the number to format
 * @param fractionDigits 小數位數，允許 0-100 / the number of fraction digits, 0-100 allowed
 * @returns 格式化後再解析回的數值，尾端多餘的零會被捨去 /
 * the value parsed back from the formatted string, trailing zeros are dropped
 * @throws {RangeError} fractionDigits 超出允許範圍時由 toFixed 拋出 / thrown by toFixed when fractionDigits is out of range
 */
export function toFixedNumber(n: number, fractionDigits: number)
{
	return parseFloat(n.toFixed(fractionDigits))
}

export default toFixedNumber
