'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cloneClass = require('@lazy-random/clone-class');
var rngAbstract = require('@lazy-random/rng-abstract');
var originalMathRandom = require('@lazy-random/original-math-random');

class RNGMathRandom extends rngAbstract.RNG {
  get name() {
    return 'math-random';
  }

  get seedable() {
    return false;
  }

  next() {
    return originalMathRandom._MathRandom();
  }

  seed(seed, opts, ...argv) {}

  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGMathRandom, this, seed, opts, ...argv);
  }

}

exports.RNGMathRandom = RNGMathRandom;
exports["default"] = RNGMathRandom;
//# sourceMappingURL=index.cjs.development.cjs.map
