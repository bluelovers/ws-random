import { BYTE_TO_HEX_TO_LOWER_CASE, BYTE_TO_HEX_TO_UPPER_CASE } from '@lazy-random/shared-lib';
import { dfUniformBytes } from '@lazy-random/df-uniform';
import { _createBytesToUuidFn } from '@lazy-random/bytes-to-uuid';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 建立 UUID v4 產生器 (UUID v4 Generator)
 * Create a UUID v4 generator
 *
 * 底層以 dfUniformBytes 取得 16 個位元組 (Byte)，再依 RFC 4122 套用
 * v4 的版本位元 (Version Bits) 與變體位元 (Variant Bits)，最後轉成 8-4-4-4-12 字串
 * The floor samples 16 bytes via dfUniformBytes, applies the RFC 4122 v4 version and
 * variant bits, then formats them into an 8-4-4-4-12 string
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0, 1)
 * @param toUpperCase 為 true 時輸出大寫十六進制字串 (Uppercase Hex String)，預設小寫
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)，每次回傳一組 UUID v4 字串
 * @see https://github.com/tracker1/node-uuid4/blob/master/index.js
 */
export function dfUuidV4(random: IRNGLike, toUpperCase?: boolean)
{
	const fn = dfUniformBytes(random, 16);

	const fn2 = _createBytesToUuidFn(toUpperCase ? BYTE_TO_HEX_TO_UPPER_CASE : BYTE_TO_HEX_TO_LOWER_CASE);

	return () =>
	{
		let arr = fn();

		/**
		 * 第 7 個位元組高 4 位設為 0100（版本 4）、第 9 個位元組高 2 位設為 10（變體 RFC 4122）：
		 * 先以遮罩 (Mask) 清除原本的位元，再用 OR 套入固定值，其餘位元維持隨機
		 * Set the high 4 bits of the 7th byte to 0100 (version 4) and the high 2 bits of the
		 * 9th byte to 10 (RFC 4122 variant): clear the original bits with a mask, then OR in
		 * the fixed values while keeping the remaining bits random
		 */
		arr[6] = (arr[6] & 0x0f) | 0x40;
		arr[8] = (arr[8] & 0x3f) | 0x80;

		let id = fn2(arr);

		return id;
	}
}

export default dfUuidV4

