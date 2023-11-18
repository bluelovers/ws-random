export declare function subAbs(actual: number, expected: number): string;
export declare function numberInDeltaUnsafe002(actual: number, expected: number, delta?: number): boolean;
/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export declare function numberInDeltaUnsafe001(actual: number, expected: number, delta?: number): boolean;
/**
 * @see big.js
 */
export declare const enum EnumBigComparison {
	GT = 1,
	EQ = 0,
	LT = -1
}
/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export declare function numberInDelta(actual: number, expected: number, delta?: number): boolean;

export {
	numberInDelta as default,
};

export {};
