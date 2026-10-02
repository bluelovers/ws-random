'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cloneClass = require('@lazy-random/clone-class');
var originalMathRandom = require('@lazy-random/original-math-random');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');

class RNGMathRandom extends rngAbstractCore.RNGCore {
  get name() {
    return 'math-random';
  }
  get seedable() {
    return false;
  }
  /**
   * 取得下一個 0～1 的亂數 (Random Number)。
   *
   * Gets the next 0~1 random number.
   *
   * @returns 0～1 區間內的亂數 / a random number within 0~1
   */
  next() {
    return originalMathRandom._MathRandom();
  }
  /**
   * 以同一個 RNGMathRandom 類別與目前狀態建立新實例 (Instance)；
   * 因為不可重播，實例間僅共享類別而非亂數序列。
   *
   * Creates a new instance from the same RNGMathRandom class and current
   * state; since it is non-replayable, instances share the class but not a
   * random sequence.
   *
   * @param seed 未使用（Math.random() 不支援種子） / unused, Math.random() takes no seed
   * @param opts 保留的選項參數 / reserved options
   * @param argv 保留的其餘參數，透傳給 cloneClass / extra arguments forwarded to cloneClass
   * @returns 新的 RNGMathRandom 實例 / a new RNGMathRandom instance
   */
  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGMathRandom, this, seed, opts, ...argv);
  }
}

exports.RNGMathRandom = RNGMathRandom;
exports.default = RNGMathRandom;
//# sourceMappingURL=index.cjs.development.cjs.map
