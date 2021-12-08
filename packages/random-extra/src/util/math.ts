import { FLOAT_ENTROPY_BYTES, MATH_POW_2_32 } from './const';
import { fixZero } from 'num-is-zero';

export { fixZero }

/**
 * (1 + 2 + 3 +...+N)
 *
 * @see http://emn178.pixnet.net/blog/post/92132837-%E8%A8%88%E7%AE%971%E5%88%B0n%E7%B8%BD%E5%92%8C%281-%2B-2-%2B-3-%2B...%2Bn%29
 */
export function sum_1_to_n(n: number)
{
	return n * (n + 1) / 2;
}

/**
 * simple probabilities
 */
export function get_prob(size: number, sum: number)
{
	let score = sum;
	let resultArray: number[] = [];
	let randomTotal = 0;
	let i: number = size - 1;

	while (i--)
	{
		let random = Math.round(score / size);

		resultArray.push(random);
		randomTotal += random;

		score = score - random;
	}

	let result = sum - randomTotal;
	resultArray.unshift(result);

	return resultArray;
}

export function get_prob_float(size: number, sum: number)
{
	let score = sum;
	let resultArray: number[] = [];
	let randomTotal = 0;
	let i: number = size - 1;

	while (i--)
	{
		let random = score / size;

		resultArray.push(random);
		randomTotal += random;

		score = score - random;
	}

	let result = sum - randomTotal;
	resultArray.unshift(result);

	return resultArray;
}

export function get_range_by_size_sum(size: number, sum?: number)
{
	sum = sum || sum_1_to_n(size);

	let score = sum;
	let resultArray = [];
	let randomTotal = 0;
	let i: number;

	for (i = 0; i < size - 1; i++)
	{
		let res = Math.round(score / size);
		let random = res;
		resultArray[i] = random;
		randomTotal += resultArray[i];
		score = score - random;
	}

	let result = sum - randomTotal;
	resultArray[i] = result;

	resultArray.sort((a, b) => a - b);

	resultArray.push(score);

	if (sum < 0)
	{
		resultArray.push(sum - resultArray[0]);
	}

	resultArray.push(sum - resultArray[resultArray.length - 1]);

	resultArray.push(score < 0 ? sum + size : sum - size);

	for (i = 0; i < size; i++)
	{
		resultArray.push(score < 0 ? 0 - i : i);
	}

	resultArray.push((score < 0 ? sum + size - 1 : sum - size + 1));

	resultArray.sort((a, b) => a - b);

	let min = resultArray[0]
	let max = resultArray[resultArray.length - 1]

	return {
		min,
		max,
		sum,
		resultArray,
	}
}

export function array_sum(na: number[])
{
	return fixZero(na.reduce((a, b) => a + b))
}

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


