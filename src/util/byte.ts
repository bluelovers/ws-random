/**
 * Created by user on 2018/11/17/017.
 */

import * as HexLib from 'hex-lib';

export let BYTE_TO_HEX_TO_LOWER_CASE: ReadonlyArray<string> = [];
export let BYTE_TO_HEX_TO_UPPER_CASE: ReadonlyArray<string> = [];

for (let i = 0; i < 256; ++i)
{
	// @ts-ignore
	BYTE_TO_HEX_TO_LOWER_CASE[i] = (i + 0x100).toString(16).substr(1);
	// @ts-ignore
	BYTE_TO_HEX_TO_UPPER_CASE[i] = BYTE_TO_HEX_TO_LOWER_CASE[i].toUpperCase()
}

// @ts-ignore
BYTE_TO_HEX_TO_LOWER_CASE = Object.freeze(BYTE_TO_HEX_TO_LOWER_CASE);
// @ts-ignore
BYTE_TO_HEX_TO_UPPER_CASE = Object.freeze(BYTE_TO_HEX_TO_UPPER_CASE);

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

// @ts-ignore
Object.freeze(exports)
