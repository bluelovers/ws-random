/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export function expectInDelta(actual: number, expected: number, delta = 0.05)
{
	return expected - delta <= actual && actual <= expected + delta
}

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

