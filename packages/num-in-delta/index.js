"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberInDelta = exports.EnumBigComparison = void 0;
const big_js_1 = __importDefault(require("big.js"));
/**
 * @see big.js
 */
var EnumBigComparison;
(function (EnumBigComparison) {
    EnumBigComparison[EnumBigComparison["GT"] = 1] = "GT";
    EnumBigComparison[EnumBigComparison["EQ"] = 0] = "EQ";
    EnumBigComparison[EnumBigComparison["LT"] = -1] = "LT";
})(EnumBigComparison || (exports.EnumBigComparison = EnumBigComparison = {}));
/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
function numberInDelta(actual, expected, delta = 0.05) {
    return new big_js_1.default(expected)
        .sub(actual)
        .abs()
        .cmp(delta) !== 1 /* EnumBigComparison.GT */;
}
exports.numberInDelta = numberInDelta;
exports.default = numberInDelta;
//# sourceMappingURL=index.js.map