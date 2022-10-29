"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var a = require("@lazy-random/generators-function"), e = require("@lazy-random/original-math-random");

class RNGMathRandom2 extends a.RNGFunction {
  constructor(a = e._MathRandom, t, ...r) {
    super(a || e._MathRandom, t, ...r);
  }
  get name() {
    return "math-random2";
  }
}

exports.RNGMathRandom2 = RNGMathRandom2, exports.default = RNGMathRandom2;
//# sourceMappingURL=index.cjs.production.min.cjs.map
