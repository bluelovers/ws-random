import { fixZero } from 'num-is-zero';
export { fixZero };
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
    resultArray: any[];
};
export declare function array_sum(na: number[]): number;
/**
 * Given a buffer containing bytes of entropy, generate a double-precision
 * 64-bit float.
 *
 * @param {Buffer} buf a buffer of bytes
 * @returns {Number} a float
 *
 * @see https://github.com/fardog/node-random-lib/blob/master/index.js
 * @see http://stackoverflow.com/questions/15753019/floating-point-number-from-crypto-randombytes-in-javascript
 */
export declare function floatFromBuffer(buf: ArrayLike<number>, offset?: number): number;
export declare function _floatFromBuffer(buf: ArrayLike<number>, offset?: number): number;
export declare function _floatFromBuffer2(buf: ArrayLike<number>, offset?: number): number;
export declare function readUInt32LE(buf: ArrayLike<number>, offset?: number): number;
export declare function readUInt32BE(buf: ArrayLike<number>, offset?: number): number;
