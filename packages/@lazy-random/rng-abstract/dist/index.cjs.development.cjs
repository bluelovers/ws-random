'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var seedToken = require('@lazy-random/seed-token');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');

class RNG extends rngAbstractCore.RNGCore {
  static create(seed, opts, ...argv) {
    if (this === RNG || this === rngAbstractCore.RNGCore || !this) {
      throw new ReferenceError('RNG is abstract class');
    }
    // @ts-ignore
    return new this(seed, opts, ...argv);
  }
  /**
   * return number for make new seed
   */
  _seedNum(seed, opts, ...argv) {
    // TODO: add entropy and stuff
    if (typeof seed === 'undefined' || seed === null || seed === 0) {
      /**
       * breaking change
       * this make always get a new token
       * when seed is undefined
       */
      seed = seedToken.randomSeedStr();
    }
    return seedToken.seedToken(seed, opts, ...argv);
  }
  /**
   * return string for make new seed
   */
  _seedStr(seed, opts, ...argv) {
    return seedToken.hashAny(seed, opts, ...argv);
  }
}

exports.RNG = RNG;
exports.default = RNG;
//# sourceMappingURL=index.cjs.development.cjs.map
