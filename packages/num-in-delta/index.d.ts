/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export declare function numberInDelta(actual: number, expected: number, delta?: number): boolean;
export default numberInDelta;
