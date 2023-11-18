'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cloneClass = require('@lazy-random/clone-class');
var originalMathRandom = require('@lazy-random/original-math-random');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');

/**
 * Created by user on 2021/12/11.
 */
class RNGMathRandom extends rngAbstractCore.RNGCore {
  get name() {
    return 'math-random';
  }
  get seedable() {
    return false;
  }
  next() {
    return originalMathRandom._MathRandom();
  }
  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGMathRandom, this, seed, opts, ...argv);
  }
}

exports.RNGMathRandom = RNGMathRandom;
exports.default = RNGMathRandom;
//# sourceMappingURL=index.cjs.development.cjs.map
