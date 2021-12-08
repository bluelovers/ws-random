"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFixedNumber = exports.toFixedStringNumber = void 0;
function toFixedStringNumber(n, fractionDigits) {
    return n.toFixed(fractionDigits);
}
exports.toFixedStringNumber = toFixedStringNumber;
/**
 * a number using fixed-point notation
 */
function toFixedNumber(n, fractionDigits) {
    return parseFloat(n.toFixed(fractionDigits));
}
exports.toFixedNumber = toFixedNumber;
exports.default = toFixedNumber;
//# sourceMappingURL=index.js.map