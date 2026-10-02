'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Big = require('big.js');

function subAbs(actual, expected) {
  return new Big(expected).sub(actual).abs().valueOf();
}
function numberInDeltaUnsafe002(actual, expected, delta = 0.05) {
  return Math.abs(expected - actual) <= delta;
}

/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
function numberInDeltaUnsafe001(actual, expected, delta = 0.05) {
  return expected - delta <= actual && actual <= expected + delta;
}

/**
 * @see big.js
 */
let EnumBigComparison = /*#__PURE__*/function (EnumBigComparison) {
  EnumBigComparison[EnumBigComparison["GT"] = 1] = "GT";
  EnumBigComparison[EnumBigComparison["EQ"] = 0] = "EQ";
  EnumBigComparison[EnumBigComparison["LT"] = -1] = "LT";
  return EnumBigComparison;
}({});
/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
function numberInDelta(actual, expected, delta = 0.05) {
  return new Big(expected).sub(actual).abs().cmp(delta) !== EnumBigComparison.GT;
}

exports.EnumBigComparison = EnumBigComparison;
exports.default = numberInDelta;
exports.numberInDelta = numberInDelta;
exports.numberInDeltaUnsafe001 = numberInDeltaUnsafe001;
exports.numberInDeltaUnsafe002 = numberInDeltaUnsafe002;
exports.subAbs = subAbs;
//# sourceMappingURL=index.cjs.development.cjs.map
