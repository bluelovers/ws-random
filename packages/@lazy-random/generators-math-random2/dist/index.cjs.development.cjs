'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generatorsFunction = require('@lazy-random/generators-function');
var originalMathRandom = require('@lazy-random/original-math-random');

class RNGMathRandom2 extends generatorsFunction.RNGFunction {
  constructor(seed = originalMathRandom._MathRandom, opts, ...argv) {
    super(seed || originalMathRandom._MathRandom, opts, ...argv);
  }
  get name() {
    return 'math-random2';
  }
}

exports.RNGMathRandom2 = RNGMathRandom2;
exports.default = RNGMathRandom2;
//# sourceMappingURL=index.cjs.development.cjs.map
