'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var originalMathRandom = require('@lazy-random/original-math-random');
var floatToString = require('@lazy-num/float-to-string');

function seedFloatByDate(date, fnRandomFloat) {
  return date.valueOf() + (fnRandomFloat !== null && fnRandomFloat !== void 0 ? fnRandomFloat : originalMathRandom._MathRandom)();
}
function seedFloatByNow(fnRandomFloat) {
  return seedFloatByDate(new Date(), fnRandomFloat);
}
function seedStringByDate(date, fnRandomFloat) {
  return floatToString.floatToString(seedFloatByDate(date, fnRandomFloat));
}
function seedStringByNow(fnRandomFloat) {
  return floatToString.floatToString(seedFloatByDate(new Date(), fnRandomFloat));
}

exports.seedFloatByDate = seedFloatByDate;
exports.seedFloatByNow = seedFloatByNow;
exports.seedStringByDate = seedStringByDate;
exports.seedStringByNow = seedStringByNow;
//# sourceMappingURL=index.cjs.development.cjs.map
