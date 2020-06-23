export { numberInDeltaUnsafe001 as expectInDelta } from 'num-in-delta/lib/unsafe001';

export function isNum(n: number)
{
	return n === +n
}

/**
 * @todo support 1e+23
 */
export function isInt(n: number)
{
	return n === (n | 0)
}

export function isFloat(n: number)
{
	return n === +n && n !== (n | 0);
}

export function isUnset(n): n is undefined | null
{
	return typeof n === 'undefined' || n === null
}

