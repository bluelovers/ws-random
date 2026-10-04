'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generatorsCrypto = require('@lazy-random/generators-crypto');
var generatorsMathRandom2 = require('@lazy-random/generators-math-random2');
var generatorsSeedrandom = require('@lazy-random/generators-seedrandom');
var rngAbstract = require('@lazy-random/rng-abstract');
var generatorsXor128 = require('@lazy-random/generators-xor128');
var generatorsFunction = require('@lazy-random/generators-function');
var generatorsMathRandom = require('@lazy-random/generators-math-random');

const PRNG_BUILTINS = {
  'xor128': generatorsXor128.RNGXOR128,
  'function': generatorsFunction.RNGFunction,
  'default': generatorsMathRandom2.RNGMathRandom2,
  'math-random': generatorsMathRandom.RNGMathRandom,
  'math-random2': generatorsMathRandom2.RNGMathRandom2,
  'seedrandom': generatorsSeedrandom.RNGSeedRandom,
  'crypto': generatorsCrypto.RNGCrypto
};

/**
 * 亂數產生器工廠 (RNG Factory)：依第一個參數決定要建立哪一種 RNG 實例。
 *
 * 可傳入內建字串鍵 (如 `'xor128'`、`'default'`)、函式 (Function)、既有的 RNG 實例，
 * 或用於 `RNGFunction` 的種子函式 (Seed Function)；完全不傳參數時回傳預設實作。
 * Creates an RNG instance based on the first argument: a built-in key, a function, an existing RNG, or a seed function.
 *
 * @param args 第一個參數決定型別，其餘參數轉交給對應的 RNG 建構子 / the first argument selects the type, the rest are forwarded to its constructor
 * @returns 對應的 RNG 實例 / the matching RNG instance
 * @throws {TypeError} 當第一個參數不是合法的 RNG 表示法時 / when the first argument is not a valid RNG representation
 */

/**
 * 實作本體：依第一個參數的型別 (Typeof) 分派到對應的建立流程。
 * Implementation body: dispatches to the matching creation path based on the type of the first argument.
 *
 * @param args 第一個參數用於分派，其餘參數轉交給 RNG 建構子 / the first argument selects the path, the rest are forwarded to the RNG constructor
 */
function RNGFactory(...args) {
  const [arg0 = 'default', ...rest] = args;
  switch (typeof arg0) {
    case 'object':
      if (rngAbstract._isInstanceOfRNG(arg0)) {
        return arg0;
      }
      break;
    case 'function':
      return new generatorsFunction.RNGFunction(arg0);
    case 'string':
      const PRNG = PRNG_BUILTINS[arg0];
      if (PRNG) {
        return new PRNG(...rest);
      }
      break;
  }
  throw new TypeError(`invalid RNG "${arg0}"`);
}

exports.RNGFactory = RNGFactory;
exports.default = RNGFactory;
//# sourceMappingURL=index.cjs.development.cjs.map
