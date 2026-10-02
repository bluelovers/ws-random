import { FLOAT_ENTROPY_BYTES, MATH_POW_2_32 } from '@lazy-random/shared-lib';

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
export function floatFromBuffer(buf: ArrayLike<number>, offset: number = 0)
{
	/**
	 * 將 offset 取整數 (Floor)，避免以小數索引存取緩衝區而讀到非預期的位元組
	 * Floor the offset so fractional values never become a buffer index
	 */
	offset = Math.floor(offset);

	/**
	 * 驗證條件包含兩件事：
	 * 1. 緩衝區必須容納 FLOAT_ENTROPY_BYTES 個位元組（有指定起點時還要再加 offset）
	 * 2. offset 不得為負數，否則起點會落在緩衝區之外
	 *
	 * 兩者任一不成立就丟出 RangeError，讓呼叫端在讀取前就得到明確錯誤
	 *
	 * The condition validates both buffer capacity (FLOAT_ENTROPY_BYTES plus
	 * any offset) and a non-negative offset; otherwise a RangeError is thrown
	 * so callers fail fast before any read happens.
	 */
	if (buf.length < (FLOAT_ENTROPY_BYTES + offset) || offset < 0)
	{
		throw new RangeError(
			`buffer must contain at least ${FLOAT_ENTROPY_BYTES}${offset > 0 ? ' +' + offset : ''} bytes of entropy`,
		)
	}

	return _floatFromBuffer(buf, offset)
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
export function _floatFromBuffer(buf: ArrayLike<number>, offset: number = 0)
{
	let position = Math.floor(offset);

	/**
	 * 組裝 53 bits 尾數 (Mantissa)：
	 * 第 1 個位元組只取低 5 bits（% 32），其後 6 個位元組各取 8 bits，剛好補滿雙精度浮點 (Double-precision Float) 的 53 bits；
	 * 每疊上一個位元組就除以 256，讓數值持續歸一化 (Normalize) 在 [0, 1) 區間內
	 *
	 * Assemble a 53-bit mantissa: 5 low bits from the first byte plus 6 full
	 * bytes, dividing by 256 after each byte to keep the result in [0, 1)
	 */
	return (((((((
								buf[position++] % 32) / 32 +
							buf[position++]) / 256 +
						buf[position++]) / 256 +
					buf[position++]) / 256 +
				buf[position++]) / 256 +
			buf[position++]) / 256 +
		buf[position]) / 256
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
export function _floatFromBuffer2(buf: ArrayLike<number>, offset: number = 0)
{
	/**
	 * 大端序 uint32 的值域為 0 ~ 2^32 - 1，除以 2^32 即可映射到 [0, 1) 區間
	 * Divide a big-endian uint32 by 2^32 to map its range into [0, 1)
	 */
	return readUInt32BE(buf, offset) / MATH_POW_2_32
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
export function readUInt32LE(buf: ArrayLike<number>, offset: number = 0)
{
	/**
	 * >>> 0 會把 offset 轉成無號 32 位整數，確保負數或過大的索引不會產生意料外的位移結果
	 * >>> 0 coerces offset to an unsigned 32-bit integer so negative or huge
	 * indexes cannot produce surprising shifts
	 */
	offset = offset >>> 0;

	/**
	 * 低 3 個位元組以 OR 組合（結果必為正數）；
	 * 最高位元組若改用 << 24 會因為符号位 (Sign Bit) 變成負數，因此改乘 0x1000000（2^24）維持無號語意
	 *
	 * The low 3 bytes are OR-ed (always positive), while the top byte is
	 * multiplied by 0x1000000 instead of `<< 24` to avoid a negative sign bit
	 */
	return ((buf[offset]) |
			(buf[offset + 1] << 8) |
			(buf[offset + 2] << 16)) +
		(buf[offset + 3] * 0x1000000)
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
export function readUInt32BE(buf: ArrayLike<number>, offset: number = 0)
{
	/**
	 * >>> 0 會把 offset 轉成無號 32 位整數，確保負數或過大的索引不會產生意料外的位移結果
	 * >>> 0 coerces offset to an unsigned 32-bit integer so negative or huge
	 * indexes cannot produce surprising shifts
	 */
	offset = offset >>> 0;

	/**
	 * 最高位元組乘以 0x1000000（而非 << 24）避免被符号位 (Sign Bit) 判成負數，
	 * 其餘 3 個位元組以 OR 組合出低 24 bits，剛好湊成完整的 uint32
	 *
	 * The top byte is multiplied by 0x1000000 instead of `<< 24` to avoid a
	 * negative sign bit; the other 3 bytes are OR-ed into the low 24 bits
	 */
	return (buf[offset] * 0x1000000) +
		((buf[offset + 1] << 16) |
			(buf[offset + 2] << 8) |
			buf[offset + 3])
}

export default floatFromBuffer
