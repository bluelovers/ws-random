export { isIntFinite as isInt, isNum, isFloat } from 'chai-asserttype-extra/lib/check';

export { numberInDeltaUnsafe001 as expectInDelta } from 'num-in-delta/lib/unsafe001';

export function isUnset(n): n is undefined | null
{
	return typeof n === 'undefined' || n === null
}
