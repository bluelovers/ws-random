'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var originalMathRandom = require('@lazy-random/original-math-random');
var floatToString = require('@lazy-num/float-to-string');

function seedFloatByDate(date) {
  return date.valueOf() + originalMathRandom._MathRandom();
}
function seedFloatByNow() {
  return seedFloatByDate(new Date());
}
function seedStringByDate(date) {
  return floatToString.floatToString(seedFloatByDate(date));
}
function seedStringByNow() {
  return floatToString.floatToString(seedFloatByDate(new Date()));
}

exports.seedFloatByDate = seedFloatByDate;
exports.seedFloatByNow = seedFloatByNow;
exports.seedStringByDate = seedStringByDate;
exports.seedStringByNow = seedStringByNow;
//# sourceMappingURL=index.cjs.development.cjs.map
