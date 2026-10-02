/**
 * 計算期望值與實際值的絕對差值 (Absolute Difference)。
 * Calculate the absolute difference between the expected and actual values.
 *
 * @param actual 實際數值 actual number
 * @param expected 期望數值 expected number
 * @returns 以十進位精確計算後取絕對值的差值 the absolute difference computed with decimal precision
 */
export declare function subAbs(actual: number, expected: number): string;
/**
 * 以 Math.abs 判斷實際值是否落在期望值 ± 容許誤差 (Delta) 範圍內。
 * Check with Math.abs whether the actual value is within expected ± delta.
 *
 * @param actual 實際數值 actual number
 * @param expected 期望數值 expected number
 * @param delta 容許誤差 allowed delta，預設 0.05 defaults to 0.05
 * @returns 差值是否小於等於 delta whether the difference is within delta (inclusive)
 */
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
 * big.js 比對結果 (Comparison Result) 的列舉 (Enum)，用於表達兩數相減後的大小關係。
 * Enum of big.js comparison results, used to express the ordering of two numbers.
 *
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
