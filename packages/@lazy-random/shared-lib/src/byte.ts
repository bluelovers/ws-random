
import { BYTE_TO_HEX_TO_UPPER_CASE } from './const';

export function stringifyByte(byte: number)
{
	return BYTE_TO_HEX_TO_UPPER_CASE[byte]
}

export function toHexArray(arr: number[])
{
	return arr.map(stringifyByte)
}


