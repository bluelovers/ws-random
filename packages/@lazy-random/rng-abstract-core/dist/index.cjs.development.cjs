'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class RNGCore {
  constructor(seed, opts, ...argv) {}
  _init_check(seed, opts, ...argv) {}
  _init(seed, opts, ...argv) {
    this._init_check(seed, opts, ...argv);
  }
  static create(seed, opts, ...argv) {
    if (this === RNGCore || !this) {
      throw new ReferenceError('RNG is abstract class');
    }
    // @ts-ignore
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
  /**
   * should return a float between 0 ~ 1
   */
  // @ts-ignore
  next() {
    throw new ReferenceError('RNG.next must be overridden');
  }
  seed(seed, opts, ...argv) {
    //throw new ReferenceError('RNG.seed must be overridden')
  }
  clone(seed, opts, ...argv) {
    throw new ReferenceError('RNG.clone must be overridden');
  }
  _seedAuto(seed, opts, ...argv) {
    if (seed && typeof seed === 'number') {
      return this._seedNum(seed, opts, ...argv);
    }
    return this._seedStr(seed, opts, ...argv);
  }
  /**
   * return number for make new seed
   */
  _seedNum(seed, opts, ...argv) {
    throw new ReferenceError('RNG._seedNum must be overridden');
  }
  /**
   * return string for make new seed
   */
  _seedStr(seed, opts, ...argv) {
    throw new ReferenceError('RNG._seedStr must be overridden');
  }
}

exports.RNGCore = RNGCore;
exports.default = RNGCore;
//# sourceMappingURL=index.cjs.development.cjs.map
