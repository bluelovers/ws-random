'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sharedLib = require('@lazy-random/shared-lib');
var dfUniform = require('@lazy-random/df-uniform');
var bytesToUuid = require('@lazy-random/bytes-to-uuid');

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
function dfUuidV4(random, toUpperCase) {
  const fn = dfUniform.dfUniformBytes(random, 16);
  const fn2 = bytesToUuid._createBytesToUuidFn(toUpperCase ? sharedLib.BYTE_TO_HEX_TO_UPPER_CASE : sharedLib.BYTE_TO_HEX_TO_LOWER_CASE);
  return () => {
    let arr = fn();
    arr[6] = arr[6] & 0x0f | 0x40;
    arr[8] = arr[8] & 0x3f | 0x80;
    let id = fn2(arr);
    return id;
  };
}

const UUID4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
/**
 * 驗證字串是否符合 UUID v4 格式 / Check whether a string matches the UUID v4 format
 *
 * @param id 待驗證的字串 (String to validate)
 * @returns 符合格式時回傳 true / True when the string matches the UUID v4 format
 */
function isUUID4(id) {
  return UUID4_PATTERN.test(id);
}

exports.UUID4_PATTERN = UUID4_PATTERN;
exports.default = dfUuidV4;
exports.dfUuidV4 = dfUuidV4;
exports.isUUID4 = isUUID4;
//# sourceMappingURL=index.cjs.development.cjs.map
