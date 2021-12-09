import { BYTE_TO_HEX_TO_LOWER_CASE } from '@lazy-random/shared-lib';

export function _createBytesToUuidFn(bth = BYTE_TO_HEX_TO_LOWER_CASE)
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

export default bytesToUuid
