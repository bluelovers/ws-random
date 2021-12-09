'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var originalMathRandom = require('@lazy-random/original-math-random');

function arrayRandIndexByLength(len, ...argv) {
  return Math.floor(originalMathRandom._MathRandom() * len);
}
function arrayRandIndex(array, ...argv) {
  return arrayRandIndexByLength(array.length);
}

exports.arrayRandIndex = arrayRandIndex;
exports.arrayRandIndexByLength = arrayRandIndexByLength;
exports["default"] = arrayRandIndex;
//# sourceMappingURL=index.cjs.development.cjs.map
