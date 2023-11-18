'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function toFixedStringNumber(n, fractionDigits) {
  return n.toFixed(fractionDigits);
}
/**
 * a number using fixed-point notation
 */
function toFixedNumber(n, fractionDigits) {
  return parseFloat(n.toFixed(fractionDigits));
}

exports.default = toFixedNumber;
exports.toFixedNumber = toFixedNumber;
exports.toFixedStringNumber = toFixedStringNumber;
//# sourceMappingURL=index.cjs.development.cjs.map
