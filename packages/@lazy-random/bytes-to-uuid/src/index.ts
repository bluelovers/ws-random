import { BYTE_TO_HEX_TO_LOWER_CASE } from '@lazy-random/shared-lib';

/**
 * 工廠函式 (Factory Function)：回傳一份已固定十六進位轉換表 (Hex Lookup Table) 的 UUID 轉換函式
 * Factory function returning a UUID converter with a fixed hex lookup table
 *
 * 適合在迴圈中反覆轉換時建立一次、重複使用，省去每次呼叫都傳入 bth。
 * Useful when converting repeatedly in a loop: build it once and reuse it
 * instead of passing bth on every call.
 *
 * @param bth 位元組轉兩位十六進位字串的查表 (Lookup Table)，
 * 預設為小寫格式 BYTE_TO_HEX_TO_LOWER_CASE /
 * lookup table mapping a byte to a two-character hex string; defaults to the lower-case BYTE_TO_HEX_TO_LOWER_CASE
 * @returns `(buf, offset?) => string`，邏輯與 bytesToUuid 相同 /
 * a function with the same behaviour as bytesToUuid
 */
export function _createBytesToUuidFn(bth = BYTE_TO_HEX_TO_LOWER_CASE)
{
	return (buf: ArrayLike<number>, offset?: number) =>
	{
		/**
		 * offset 未提供時視為 0，讓函式可省略第二個參數直接呼叫。
		 * Treat a missing offset as 0 so the second argument can be omitted.
		 */
		let i = offset || 0;
		// join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
		/**
		 * 以查表逐位元組轉成十六進位，固定依 8-4-4-4-12 分段插入 '-'，
		 * 再用 join('') 組出字串，避開字串串接在 V8 上的記憶體問題。
		 * Convert byte by byte via the lookup table, insert '-' at the fixed 8-4-4-4-12
		 * positions, and build the string with join('') to avoid the V8 memory issue
		 * caused by string concatenation.
		 */
		return ([
			bth[buf[i++]], bth[buf[i++]],
			bth[buf[i++]], bth[buf[i++]], '-',
			bth[buf[i++]], bth[buf[i++]], '-',
			bth[buf[i++]], bth[buf[i++]], '-',
			bth[buf[i++]], bth[buf[i++]], '-',
			bth[buf[i++]], bth[buf[i++]],
			bth[buf[i++]], bth[buf[i++]],
			bth[buf[i++]], bth[buf[i++]],
		]).join('');
	}
}

/**
 * 將位元組陣列 (Byte Array) 轉為小寫十六進位的 UUID 字串
 * Convert a byte array into a lower-case hex UUID string
 *
 * @see https://github.com/kelektiv/node-uuid/blob/master/lib/bytesToUuid.js
 *
 * @param buf 來源位元組陣列，需至少包含 offset + 16 個元素 /
 * source byte array, must contain at least offset + 16 elements
 * @param offset 起始位置，省略或傳 0 時由 0 開始 / start position; treated as 0 when omitted or 0
 * @param bth 位元組轉十六進位字串的查表 (Lookup Table)，預設為小寫格式 /
 * lookup table mapping a byte to a hex string; lower-case by default
 * @returns `8-4-4-4-12` 分段、以 `-` 連接的 UUID 字串 /
 * a UUID string in `8-4-4-4-12` form joined with `-`
 *
 * TODO: buf 長度不足 offset + 16 時不會拋出錯誤，
 * 超出範圍的索引會取得 undefined，join('') 時被略過而回傳畸形 UUID；
 * 此處僅記錄疑似邊界情況，未修改原有邏輯。
 * TODO: a buffer shorter than offset + 16 does not throw; out-of-range indices yield
 * undefined which join('') drops, producing a malformed UUID. Recorded only; logic unchanged.
 */
export function bytesToUuid(buf: ArrayLike<number>, offset?: number, bth = BYTE_TO_HEX_TO_LOWER_CASE)
{
	let i = offset || 0;
	// join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
	/**
	 * 與 _createBytesToUuidFn 回傳的函式採用相同的分段與 join('') 組字策略，
	 * 差別僅在 bth 可於每次呼叫時指定。
	 * Uses the same segmentation and join('') strategy as the function returned by
	 * _createBytesToUuidFn; the only difference is that bth can vary per call.
	 */
	return ([
		bth[buf[i++]], bth[buf[i++]],
		bth[buf[i++]], bth[buf[i++]], '-',
		bth[buf[i++]], bth[buf[i++]], '-',
		bth[buf[i++]], bth[buf[i++]], '-',
		bth[buf[i++]], bth[buf[i++]], '-',
		bth[buf[i++]], bth[buf[i++]],
		bth[buf[i++]], bth[buf[i++]],
		bth[buf[i++]], bth[buf[i++]],
	]).join('');
}

export default bytesToUuid
