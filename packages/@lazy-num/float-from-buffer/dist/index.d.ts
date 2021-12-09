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
export default floatFromBuffer;

export {};
