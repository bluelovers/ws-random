"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberInDeltaUnsafe002 = exports.subAbs = void 0;
const big_js_1 = __importDefault(require("big.js"));
function subAbs(actual, expected) {
    //console.log(sub(expected, actual), typeof sub(expected, actual))
    return new big_js_1.default(expected)
        .sub(actual)
        .abs().valueOf();
}
exports.subAbs = subAbs;
function numberInDeltaUnsafe002(actual, expected, delta = 0.05) {
    return Math.abs(expected - actual) <= delta;
}
exports.numberInDeltaUnsafe002 = numberInDeltaUnsafe002;
//# sourceMappingURL=util.js.map