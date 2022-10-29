"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var a = require("@lazy-random/original-math-random");

function arrayRandIndexByLength(r, ...n) {
  return Math.floor(a._MathRandom() * r);
}

function arrayRandIndex(a, ...r) {
  return arrayRandIndexByLength(a.length);
}

exports.arrayRandIndex = arrayRandIndex, exports.arrayRandIndexByLength = arrayRandIndexByLength, 
exports.default = arrayRandIndex;
//# sourceMappingURL=index.cjs.production.min.cjs.map
