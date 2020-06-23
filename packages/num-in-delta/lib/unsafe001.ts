/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export function numberInDeltaUnsafe001(actual: number, expected: number, delta = 0.05)
{
	return (expected - delta <= actual) && (actual <= expected + delta)
}
