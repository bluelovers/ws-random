/**
 * (1 + 2 + 3 +...+N)
 *
 * @see http://emn178.pixnet.net/blog/post/92132837-%E8%A8%88%E7%AE%971%E5%88%B0n%E7%B8%BD%E5%92%8C%281-%2B-2-%2B-3-%2B...%2Bn%29
 */
export declare function sum_1_to_n(n: number): number;
/**
 * simple probabilities
 */
export declare function get_prob(size: number, sum: number): number[];
export declare function get_prob_float(size: number, sum: number): number[];
export declare function get_range_by_size_sum(size: number, sum?: number): {
    min: any;
    max: any;
    sum: number;
};
export declare function toFixedNumber(n: number, fractionDigits: number): number;
export declare function array_sum(na: number[]): number;
/**
 * fix: expected -0 to deeply equal 0
 */
export declare function fixZero(n: number): number;
