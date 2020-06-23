/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export declare function expectInDelta(actual: number, expected: number, delta?: number): boolean;
export declare function isNum(n: number): boolean;
/**
 * @todo support 1e+23
 */
export declare function isInt(n: number): boolean;
export declare function isFloat(n: number): boolean;
export declare function isUnset(n: any): n is undefined | null;
