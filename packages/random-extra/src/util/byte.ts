/**
 * Created by user on 2018/11/17/017.
 */

import { BYTE_TO_HEX_TO_UPPER_CASE } from '@lazy-random/shared-lib';

//export { BYTE_TO_HEX_TO_LOWER_CASE, BYTE_TO_HEX_TO_UPPER_CASE }

export function stringifyByte(byte: number)
{
	return BYTE_TO_HEX_TO_UPPER_CASE[byte]
}

export function toHexArray(arr: number[])
{
	return arr.map(stringifyByte)
}


