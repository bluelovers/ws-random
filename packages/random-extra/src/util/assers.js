"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnset = exports.isFloat = exports.isInt = exports.isNum = exports.expectInDelta = void 0;
/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
function expectInDelta(actual, expected, delta = 0.05) {
    return expected - delta <= actual && actual <= expected + delta;
}
exports.expectInDelta = expectInDelta;
function isNum(n) {
    return n === +n;
}
exports.isNum = isNum;
/**
 * @todo support 1e+23
 */
function isInt(n) {
    return n === (n | 0);
}
exports.isInt = isInt;
function isFloat(n) {
    return n === +n && n !== (n | 0);
}
exports.isFloat = isFloat;
function isUnset(n) {
    return typeof n === 'undefined' || n === null;
}
exports.isUnset = isUnset;
//# sourceMappingURL=assers.js.map