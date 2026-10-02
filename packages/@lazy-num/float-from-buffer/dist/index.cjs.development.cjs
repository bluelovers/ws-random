'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sharedLib = require('@lazy-random/shared-lib');

/**
 * 從含有亂數位元組 (Entropy Bytes) 的緩衝區產生雙精度 64 位元浮點數，回傳值落在 [0, 1)
 *
 * Given a buffer containing bytes of entropy, generate a double-precision
 * 64-bit float.
 *
 * @param {Buffer} buf a buffer of bytes
 * @returns {Number} a float
 * @throws {RangeError} 緩衝區長度不足或 offset 不合法 / thrown when the buffer is too short or offset is invalid
 *
 * @see https://github.com/fardog/node-random-lib/blob/master/index.js
 * @see http://stackoverflow.com/questions/15753019/floating-point-number-from-crypto-randombytes-in-javascript
 */
function floatFromBuffer(buf, offset = 0) {
  offset = Math.floor(offset);
  if (buf.length < sharedLib.FLOAT_ENTROPY_BYTES + offset || offset < 0) {
    throw new RangeError(`buffer must contain at least ${sharedLib.FLOAT_ENTROPY_BYTES}${offset > 0 ? ' +' + offset : ''} bytes of entropy`);
  }
  return _floatFromBuffer(buf, offset);
}
/**
 * floatFromBuffer 的核心實作 (Core Implementation)，不進行任何長度驗證，直接由 offset 讀取固定長度的位元組
 *
 * Core implementation of floatFromBuffer; it performs no length validation,
 * so the caller must guarantee the buffer holds enough bytes.
 *
 * @param buf 存放亂數位元組的緩衝區 / buffer holding entropy bytes
 * @param offset 讀取起始位置 / start position
 * @returns 位於 [0, 1) 的浮點數 / a float within [0, 1)
 * @note 緩衝區長度由 floatFromBuffer 以 FLOAT_ENTROPY_BYTES 驗證；此處固定讀取 7 個位元組
 */
function _floatFromBuffer(buf, offset = 0) {
  let position = Math.floor(offset);
  return ((((((buf[position++] % 32 / 32 + buf[position++]) / 256 + buf[position++]) / 256 + buf[position++]) / 256 + buf[position++]) / 256 + buf[position++]) / 256 + buf[position]) / 256;
}
/**
 * 32 bits 精度的替代實作 (Alternative Implementation)，供需要較簡單算法或較少位元組時使用
 *
 * Alternative 32-bit implementation for callers that want a simpler algorithm
 * or need fewer input bytes, at the cost of precision.
 *
 * @param buf 存放亂數位元組的緩衝區 / buffer holding entropy bytes
 * @param offset 讀取起始位置 / start position
 * @returns 位於 [0, 1) 的浮點數 / a float within [0, 1)
 */
function _floatFromBuffer2(buf, offset = 0) {
  return readUInt32BE(buf, offset) / sharedLib.MATH_POW_2_32;
}
/**
 * 以小端序 (Little-endian) 讀取 4 個位元組，回傳無號 32 位整數 (uint32)
 *
 * Read 4 bytes as a little-endian unsigned 32-bit integer
 *
 * @param buf 資料來源 / source data
 * @param offset 起始位置，會先以 >>> 0 轉為無號整數 / start position, coerced to unsigned via >>> 0
 * @returns 0 ~ 0xFFFFFFFF 的整數 / an integer in 0 ~ 0xFFFFFFFF
 */
function readUInt32LE(buf, offset = 0) {
  offset = offset >>> 0;
  return (buf[offset] | buf[offset + 1] << 8 | buf[offset + 2] << 16) + buf[offset + 3] * 0x1000000;
}
/**
 * 以大端序 (Big-endian) 讀取 4 個位元組，回傳無號 32 位整數 (uint32)
 *
 * Read 4 bytes as a big-endian unsigned 32-bit integer
 *
 * @param buf 資料來源 / source data
 * @param offset 起始位置，會先以 >>> 0 轉為無號整數 / start position, coerced to unsigned via >>> 0
 * @returns 0 ~ 0xFFFFFFFF 的整數 / an integer in 0 ~ 0xFFFFFFFF
 */
function readUInt32BE(buf, offset = 0) {
  offset = offset >>> 0;
  return buf[offset] * 0x1000000 + (buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3]);
}

exports._floatFromBuffer = _floatFromBuffer;
exports._floatFromBuffer2 = _floatFromBuffer2;
exports.default = floatFromBuffer;
exports.floatFromBuffer = floatFromBuffer;
exports.readUInt32BE = readUInt32BE;
exports.readUInt32LE = readUInt32LE;
//# sourceMappingURL=index.cjs.development.cjs.map
