
import { BYTE_TO_HEX_TO_UPPER_CASE } from './const';

/**
 * 將單一位元組 (Byte) 轉為兩碼大寫十六進制字串 (Hex String)。
 * Convert a single byte to a two-digit uppercase hex string.
 *
 * 查表 (Lookup) 而非執行期轉換，回傳快取的唯讀字串。
 * Uses a lookup table instead of runtime conversion, returning a cached read-only string.
 *
 * @param byte 0～255 的位元組值 / A byte value from 0 to 255
 * @returns 大寫十六進制字串 / The uppercase hex string
 */
export function stringifyByte(byte: number)
{
	return BYTE_TO_HEX_TO_UPPER_CASE[byte]
}

/**
 * 將位元組陣列 (Byte Array) 依序轉為十六進制 (Hex) 字串陣列。
 * Convert a byte array into an array of hex strings in order.
 *
 * @param arr 位元組數值陣列 / An array of byte values
 * @returns 十六進制字串陣列 / An array of hex strings
 */
export function toHexArray(arr: number[])
{
	return arr.map(stringifyByte)
}


