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
function RNGFactory(...args) {
  const [arg0 = 'default', ...rest] = args;

  switch (typeof arg0) {
    case 'object':
      if (arg0 instanceof rngAbstract.RNG) {
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
exports["default"] = RNGFactory;
//# sourceMappingURL=index.cjs.development.cjs.map
