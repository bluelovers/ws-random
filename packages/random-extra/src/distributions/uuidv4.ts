import { BYTE_TO_HEX_TO_LOWER_CASE, BYTE_TO_HEX_TO_UPPER_CASE } from '@lazy-random/shared-lib';
import { dfUniformBytes } from '@lazy-random/df-uniform';
import { _createBytesToUuidFn } from '@lazy-random/bytes-to-uuid';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * @see https://github.com/tracker1/node-uuid4/blob/master/index.js
 */
export default function (random: IRNGLike, toUpperCase?: boolean)
{
	const fn = dfUniformBytes(random, 16);

	const fn2 = _createBytesToUuidFn(toUpperCase ? BYTE_TO_HEX_TO_UPPER_CASE : BYTE_TO_HEX_TO_LOWER_CASE);

	return () =>
	{
		let arr = fn();

		arr[6] = (arr[6] & 0x0f) | 0x40;
		arr[8] = (arr[8] & 0x3f) | 0x80;

		let id = fn2(arr);

		return id;
	}
}


