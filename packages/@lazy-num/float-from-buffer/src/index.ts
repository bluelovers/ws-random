import { FLOAT_ENTROPY_BYTES, MATH_POW_2_32 } from '@lazy-random/shared-lib';

/**
 * Given a buffer containing bytes of entropy, generate a double-precision
 * 64-bit float.
 *
 * @param {Buffer} buf a buffer of bytes
 * @returns {Number} a float
 *
 * @see https://github.com/fardog/node-random-lib/blob/master/index.js
 * @see http://stackoverflow.com/questions/15753019/floating-point-number-from-crypto-randombytes-in-javascript
 */
export function floatFromBuffer(buf: ArrayLike<number>, offset: number = 0)
{
	offset = Math.floor(offset);

	if (buf.length < (FLOAT_ENTROPY_BYTES + offset) || offset < 0)
	{
		throw new RangeError(
			`buffer must contain at least ${FLOAT_ENTROPY_BYTES}${offset > 0 ? ' +' + offset : ''} bytes of entropy`,
		)
	}

	return _floatFromBuffer(buf, offset)
}

export function _floatFromBuffer(buf: ArrayLike<number>, offset: number = 0)
{
	let position = Math.floor(offset);

	return (((((((
								buf[position++] % 32) / 32 +
							buf[position++]) / 256 +
						buf[position++]) / 256 +
					buf[position++]) / 256 +
				buf[position++]) / 256 +
			buf[position++]) / 256 +
		buf[position]) / 256
}

export function _floatFromBuffer2(buf: ArrayLike<number>, offset: number = 0)
{
	return readUInt32BE(buf, offset) / MATH_POW_2_32
}

export function readUInt32LE(buf: ArrayLike<number>, offset: number = 0)
{
	offset = offset >>> 0;

	return ((buf[offset]) |
			(buf[offset + 1] << 8) |
			(buf[offset + 2] << 16)) +
		(buf[offset + 3] * 0x1000000)
}

export function readUInt32BE(buf: ArrayLike<number>, offset: number = 0)
{
	offset = offset >>> 0;

	return (buf[offset] * 0x1000000) +
		((buf[offset + 1] << 16) |
			(buf[offset + 2] << 8) |
			buf[offset + 3])
}

export default floatFromBuffer
