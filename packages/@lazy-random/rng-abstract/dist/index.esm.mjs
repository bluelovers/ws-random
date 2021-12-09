import { randomSeedStr, seedToken, hashAny } from '@lazy-random/seed-token';

class RNG {
  constructor(seed, opts, ...argv) {}

  _init_check(seed, opts, ...argv) {}

  _init(seed, opts, ...argv) {
    this._init_check(seed, opts, ...argv);
  }

  static create(seed, opts, ...argv) {
    if (this === RNG || !this) {
      throw new ReferenceError('RNG is abstract class');
    }

    return new this(seed, opts, ...argv);
  }

  get name() {
    throw new Error('RNG.name must be overridden');
  }

  get options() {
    return null;
  }

  get seedable() {
    return null;
  }

  next() {
    throw new ReferenceError('RNG.next must be overridden');
  }

  seed(seed, opts, ...argv) {}

  clone(seed, opts, ...argv) {
    throw new ReferenceError('RNG.clone must be overridden');
  }

  _seedAuto(seed, opts, ...argv) {
    if (seed && typeof seed === 'number') {
      return this._seedNum(seed, opts, ...argv);
    }

    return this._seedStr(seed, opts, ...argv);
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
