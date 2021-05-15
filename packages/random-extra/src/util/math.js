"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUInt32BE = exports.readUInt32LE = exports._floatFromBuffer2 = exports._floatFromBuffer = exports.floatFromBuffer = exports.array_sum = exports.toFixedNumber = exports.get_range_by_size_sum = exports.get_prob_float = exports.get_prob = exports.sum_1_to_n = exports.fixZero = void 0;
const const_1 = require("./const");
const num_is_zero_1 = require("num-is-zero");
Object.defineProperty(exports, "fixZero", { enumerable: true, get: function () { return num_is_zero_1.fixZero; } });
/**
 * (1 + 2 + 3 +...+N)
 *
 * @see http://emn178.pixnet.net/blog/post/92132837-%E8%A8%88%E7%AE%971%E5%88%B0n%E7%B8%BD%E5%92%8C%281-%2B-2-%2B-3-%2B...%2Bn%29
 */
function sum_1_to_n(n) {
    return n * (n + 1) / 2;
}
exports.sum_1_to_n = sum_1_to_n;
/**
 * simple probabilities
 */
function get_prob(size, sum) {
    let score = sum;
    let resultArray = [];
    let randomTotal = 0;
    let i = size - 1;
    while (i--) {
        let random = Math.round(score / size);
        resultArray.push(random);
        randomTotal += random;
        score = score - random;
    }
    let result = sum - randomTotal;
    resultArray.unshift(result);
    return resultArray;
}
exports.get_prob = get_prob;
function get_prob_float(size, sum) {
    let score = sum;
    let resultArray = [];
    let randomTotal = 0;
    let i = size - 1;
    while (i--) {
        let random = score / size;
        resultArray.push(random);
        randomTotal += random;
        score = score - random;
    }
    let result = sum - randomTotal;
    resultArray.unshift(result);
    return resultArray;
}
exports.get_prob_float = get_prob_float;
function get_range_by_size_sum(size, sum) {
    sum = sum || sum_1_to_n(size);
    let score = sum;
    let resultArray = [];
    let randomTotal = 0;
    let i;
    for (i = 0; i < size - 1; i++) {
        let res = Math.round(score / size);
        let random = res;
        resultArray[i] = random;
        randomTotal += resultArray[i];
        score = score - random;
    }
    let result = sum - randomTotal;
    resultArray[i] = result;
    resultArray.sort((a, b) => a - b);
    resultArray.push(score);
    if (sum < 0) {
        resultArray.push(sum - resultArray[0]);
    }
    resultArray.push(sum - resultArray[resultArray.length - 1]);
    resultArray.push(score < 0 ? sum + size : sum - size);
    for (i = 0; i < size; i++) {
        resultArray.push(score < 0 ? 0 - i : i);
    }
    resultArray.push((score < 0 ? sum + size - 1 : sum - size + 1));
    resultArray.sort((a, b) => a - b);
    let min = resultArray[0];
    let max = resultArray[resultArray.length - 1];
    return {
        min,
        max,
        sum,
        resultArray,
    };
}
exports.get_range_by_size_sum = get_range_by_size_sum;
function toFixedNumber(n, fractionDigits) {
    return parseFloat(n.toFixed(fractionDigits));
}
exports.toFixedNumber = toFixedNumber;
function array_sum(na) {
    return num_is_zero_1.fixZero(na.reduce((a, b) => a + b));
}
exports.array_sum = array_sum;
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
function floatFromBuffer(buf, offset = 0) {
    offset = Math.floor(offset);
    if (buf.length < (const_1.FLOAT_ENTROPY_BYTES + offset) || offset < 0) {
        throw new RangeError(`buffer must contain at least ${const_1.FLOAT_ENTROPY_BYTES}${offset > 0 ? ' +' + offset : ''} bytes of entropy`);
    }
    return _floatFromBuffer(buf, offset);
}
exports.floatFromBuffer = floatFromBuffer;
function _floatFromBuffer(buf, offset = 0) {
    let position = Math.floor(offset);
    return (((((((buf[position++] % 32) / 32 +
        buf[position++]) / 256 +
        buf[position++]) / 256 +
        buf[position++]) / 256 +
        buf[position++]) / 256 +
        buf[position++]) / 256 +
        buf[position]) / 256;
}
exports._floatFromBuffer = _floatFromBuffer;
function _floatFromBuffer2(buf, offset = 0) {
    return readUInt32BE(buf, offset) / const_1.MATH_POW_2_32;
}
exports._floatFromBuffer2 = _floatFromBuffer2;
function readUInt32LE(buf, offset = 0) {
    offset = offset >>> 0;
    return ((buf[offset]) |
        (buf[offset + 1] << 8) |
        (buf[offset + 2] << 16)) +
        (buf[offset + 3] * 0x1000000);
}
exports.readUInt32LE = readUInt32LE;
function readUInt32BE(buf, offset = 0) {
    offset = offset >>> 0;
    return (buf[offset] * 0x1000000) +
        ((buf[offset + 1] << 16) |
            (buf[offset + 2] << 8) |
            buf[offset + 3]);
}
exports.readUInt32BE = readUInt32BE;
//# sourceMappingURL=math.js.map