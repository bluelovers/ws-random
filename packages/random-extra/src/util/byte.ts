/**
 * Created by user on 2018/11/17/017.
 */

import { BYTE_TO_HEX_TO_LOWER_CASE, BYTE_TO_HEX_TO_UPPER_CASE } from './const';

//export { BYTE_TO_HEX_TO_LOWER_CASE, BYTE_TO_HEX_TO_UPPER_CASE }

export function _bytesToUuid(bth = BYTE_TO_HEX_TO_LOWER_CASE)
{
	return (buf: ArrayLike<number>, offset?: number) =>
	{
		let i = offset || 0;
		// join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
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
 * @see https://github.com/kelektiv/node-uuid/blob/master/lib/bytesToUuid.js
 */
export function bytesToUuid(buf: ArrayLike<number>, offset?: number, bth = BYTE_TO_HEX_TO_LOWER_CASE)
{
	let i = offset || 0;
	// join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
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

export function stringifyByte(byte: number)
{
	return BYTE_TO_HEX_TO_UPPER_CASE[byte]
}

export function toHexArray(arr: number[])
{
	return arr.map(stringifyByte)
}


