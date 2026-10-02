'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Big = require('big.js');

/**
 * 計算期望值與實際值的絕對差值 (Absolute Difference)。
 * Calculate the absolute difference between the expected and actual values.
 *
 * @param actual 實際數值 actual number
 * @param expected 期望數值 expected number
 * @returns 以十進位精確計算後取絕對值的差值 the absolute difference computed with decimal precision
 */
function subAbs(actual, expected) {
  return new Big(expected).sub(actual).abs().valueOf();
}
/**
 * 以 Math.abs 判斷實際值是否落在期望值 ± 容許誤差 (Delta) 範圍內。
 * Check with Math.abs whether the actual value is within expected ± delta.
 *
 * @param actual 實際數值 actual number
 * @param expected 期望數值 expected number
 * @param delta 容許誤差 allowed delta，預設 0.05 defaults to 0.05
 * @returns 差值是否小於等於 delta whether the difference is within delta (inclusive)
 */
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
 * big.js 比對結果 (Comparison Result) 的列舉 (Enum)，用於表達兩數相減後的大小關係。
 * Enum of big.js comparison results, used to express the ordering of two numbers.
 *
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
