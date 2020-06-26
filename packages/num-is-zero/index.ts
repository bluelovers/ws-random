/**
 * Created by user on 2020/6/27.
 */

export function isZero(val): val is 0
{
	return val === 0 || val === -0
}

export function fixZero<T>(val: T) : T
{
	// @ts-ignore
	return val === -0 ? 0 : val
}

export default isZero
