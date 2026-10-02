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
export declare function _createBytesToUuidFn(bth?: readonly string[]): (buf: ArrayLike<number>, offset?: number) => string;
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
export declare function bytesToUuid(buf: ArrayLike<number>, offset?: number, bth?: readonly string[]): string;

export {
	bytesToUuid as default,
};

export {};
