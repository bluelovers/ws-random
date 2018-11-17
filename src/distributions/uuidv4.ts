import { Random } from '../random';
import { _bytesToUuid, BYTE_TO_HEX_TO_LOWER_CASE, BYTE_TO_HEX_TO_UPPER_CASE } from '../util/byte';
import uniformBytes from './bytes';

/**
 * @see https://github.com/tracker1/node-uuid4/blob/master/index.js
 */
export default function (random: Random, toUpperCase?: boolean)
{
	let fn = uniformBytes(random, 16);

	let fn2 = toUpperCase ? _bytesToUuid(BYTE_TO_HEX_TO_UPPER_CASE) : _bytesToUuid(BYTE_TO_HEX_TO_LOWER_CASE);

	return () =>
	{
		let arr = fn();

		arr[6] = (arr[6] & 0x0f) | 0x40;
		arr[8] = (arr[8] & 0x3f) | 0x80;

		let id = fn2(arr);

		return id;
	}
}

// @ts-ignore
Object.freeze(exports)
