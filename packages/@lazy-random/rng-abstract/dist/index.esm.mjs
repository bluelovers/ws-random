import { randomSeedStr, seedToken, hashAny } from '@lazy-random/seed-token';
import { RNGCore } from '@lazy-random/rng-abstract-core';

class RNG extends RNGCore {
  static create(seed, opts, ...argv) {
    if (this === RNG || this === RNGCore || !this) {
      throw new ReferenceError('RNG is abstract class');
    }

    return new this(seed, opts, ...argv);
  }

  _seedNum(seed, opts, ...argv) {
    if (typeof seed === 'undefined' || seed === null || seed === 0) {
      seed = randomSeedStr();
    }

    return seedToken(seed, opts, ...argv);
  }

  _seedStr(seed, opts, ...argv) {
    return hashAny(seed, opts, ...argv);
  }

}

export { RNG, RNG as default };
//# sourceMappingURL=index.esm.mjs.map
