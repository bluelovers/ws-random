'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var seedToken = require('@lazy-random/seed-token');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');

class RNG extends rngAbstractCore.RNGCore {
  static create(seed, opts, ...argv) {
    if (this === RNG || this === rngAbstractCore.RNGCore || !this) {
      throw new ReferenceError('RNG is abstract class');
    }
    return new this(seed, opts, ...argv);
  }
  _seedNum(seed, opts, ...argv) {
    if (typeof seed === 'undefined' || seed === null || seed === 0) {
      seed = seedToken.randomSeedStr();
    }
    return seedToken.seedToken(seed, opts, ...argv);
  }
  _seedStr(seed, opts, ...argv) {
    return seedToken.hashAny(seed, opts, ...argv);
  }
}

exports.RNG = RNG;
exports.default = RNG;
//# sourceMappingURL=index.cjs.development.cjs.map
