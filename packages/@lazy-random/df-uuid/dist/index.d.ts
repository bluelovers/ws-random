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
export declare function dfUuidV4(random: IRNGLike, toUpperCase?: boolean): () => string;
/**
 * UUID v4 的正規表示式 (Regular Expression)：
 * 第三段固定為 `4` 開頭（版本 4），第四段首字元限 `[89ab]`（RFC 4122 變體）
 * Regular expression for UUID v4: the third group must start with `4` (version 4) and the
 * first character of the fourth group is limited to `[89ab]` (RFC 4122 variant)
 */
export declare const UUID4_PATTERN: RegExp;
/**
 * 驗證字串是否符合 UUID v4 格式 / Check whether a string matches the UUID v4 format
 *
 * @param id 待驗證的字串 (String to validate)
 * @returns 符合格式時回傳 true / True when the string matches the UUID v4 format
 */
export declare function isUUID4(id: string): boolean;

export {
	dfUuidV4 as default,
};

export {};
