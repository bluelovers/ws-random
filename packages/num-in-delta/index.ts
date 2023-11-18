import Big, { Comparison } from 'big.js';

/**
 * @see big.js
 */
export const enum EnumBigComparison
{
	GT = 1,
	EQ = 0,
	LT = -1,
}

/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export function numberInDelta(actual: number, expected: number, delta = 0.05)
{
	return new Big(expected)
		.sub(actual)
		.abs()
		.cmp(delta) !== EnumBigComparison.GT
}

export default numberInDelta
