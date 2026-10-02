'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let ENUM_ALPHABET = /*#__PURE__*/function (ENUM_ALPHABET) {
  ENUM_ALPHABET["NANOID_URL"] = "ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz";
  ENUM_ALPHABET["SHORTID"] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  ENUM_ALPHABET["SHORTID2"] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@";
  ENUM_ALPHABET["UNI_CHAR1"] = "\u24B6\u24B7\u24B8\u24B9\u24BA\u24BB\u24BC\u24BD\u24BE\u24BF\u24C0\u24C1\u24C2\u24C3\u24C4\u24C5\u24C6\u24C7\u24C8\u24C9\u24CA\u24CB\u24CC\u24CD\u24CE\u24CF\u24D0\u24D1\u24D2\u24D3\u24D4\u24D5\u24D6\u24D7\u24D8\u24D9\u24DA\u24DB\u24DC\u24DD\u24DE\u24DF\u24E0\u24E1\u24E2\u24E3\u24E4\u24E5\u24E6\u24E7\u24E8\u24E9\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B";
  ENUM_ALPHABET["DEFAULT"] = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ENUM_ALPHABET["BASE16"] = "0123456789abcdef";
  ENUM_ALPHABET["BASE36"] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ENUM_ALPHABET["BASE58"] = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  ENUM_ALPHABET["BASE62"] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  ENUM_ALPHABET["BASE66"] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~";
  ENUM_ALPHABET["BASE71"] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!'()*-._~";
  return ENUM_ALPHABET;
}({});
const SUM_DELTA = 0.00000000000005;
const FLOAT_ENTROPY_BYTES = 7;
const UINT32_BYTES = 4;
const UINT32_VALUE = 0xffffffff;
const MATH_POW_2_32 = /*#__PURE__*/Math.pow(2, 32);
exports.BYTE_TO_HEX_TO_LOWER_CASE = [];
exports.BYTE_TO_HEX_TO_UPPER_CASE = [];
for (let i = 0; i < 256; ++i) {
  // @ts-ignore
  exports.BYTE_TO_HEX_TO_LOWER_CASE[i] = /*#__PURE__*/(i + 0x100).toString(16).substr(1);
  // @ts-ignore
  exports.BYTE_TO_HEX_TO_UPPER_CASE[i] = /*#__PURE__*/exports.BYTE_TO_HEX_TO_LOWER_CASE[i].toUpperCase();
}
// @ts-ignore
exports.BYTE_TO_HEX_TO_LOWER_CASE = /*#__PURE__*/Object.freeze(exports.BYTE_TO_HEX_TO_LOWER_CASE);
// @ts-ignore
exports.BYTE_TO_HEX_TO_UPPER_CASE = /*#__PURE__*/Object.freeze(exports.BYTE_TO_HEX_TO_UPPER_CASE);

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
function stringifyByte(byte) {
  return exports.BYTE_TO_HEX_TO_UPPER_CASE[byte];
}
/**
 * 將位元組陣列 (Byte Array) 依序轉為十六進制 (Hex) 字串陣列。
 * Convert a byte array into an array of hex strings in order.
 *
 * @param arr 位元組數值陣列 / An array of byte values
 * @returns 十六進制字串陣列 / An array of hex strings
 */
function toHexArray(arr) {
  return arr.map(stringifyByte);
}

/**
 * 將參數陣列 (Arguments Array) 轉為字串，作為快取 (Cache) 的鍵 (Key)。
 * Turn an arguments array into a string used as a cache key.
 *
 * 以 `;` 分隔各參數；`Array.prototype.join` 會把 `null`/`undefined` 視為空字串，
 * 相同外觀的參數可能產生相同鍵，屬已知限制。
 * Joins arguments with `;`; `Array.prototype.join` treats `null`/`undefined` as empty
 * strings, so visually different arguments may collide into the same key (known limitation).
 *
 * @param args 參數陣列 / The arguments array
 * @returns 字串鍵 / The string key
 */
function hashArgv(args) {
  return String(args.join(';'));
}

/**
 * 判斷輸入是否未設定 (Unset)，即 `undefined` 或 `null`。
 * Check whether a value is unset, i.e. `undefined` or `null`.
 *
 * 以型別守衛 (Type Guard) 回傳，讓呼叫端在判斷後能直接收窄 (Narrow) 型別。
 * Returns a type guard so callers can narrow the type after the check.
 *
 * @param n 待檢查的值 / The value to check
 * @returns 是否為 `undefined` 或 `null` / Whether the value is `undefined` or `null`
 */
function isUnset(n) {
  return typeof n === 'undefined' || n === null;
}

exports.ENUM_ALPHABET = ENUM_ALPHABET;
exports.FLOAT_ENTROPY_BYTES = FLOAT_ENTROPY_BYTES;
exports.MATH_POW_2_32 = MATH_POW_2_32;
exports.SUM_DELTA = SUM_DELTA;
exports.UINT32_BYTES = UINT32_BYTES;
exports.UINT32_VALUE = UINT32_VALUE;
exports.hashArgv = hashArgv;
exports.isUnset = isUnset;
exports.stringifyByte = stringifyByte;
exports.toHexArray = toHexArray;
//# sourceMappingURL=index.cjs.development.cjs.map
