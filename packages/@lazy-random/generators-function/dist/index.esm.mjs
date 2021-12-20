import { expect } from '@lazy-random/expect';
import { RNG } from '@lazy-random/rng-abstract';
import { cloneClass } from '@lazy-random/clone-class';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class RNGFunction extends RNG {
  constructor(seed, opts, ...argv) {
    super();

    _defineProperty(this, "_seedable", null);

    this._init(seed, opts, ...argv);
  }

  _init_check(seed, opts, ...argv) {
    let type = typeof seed;

    if (seed !== null && type !== 'undefined' && type !== 'function') {
      expect(seed).function;
    }
  }

  _init(seed, opts, ...argv) {
    this._init_check(seed, opts, ...argv);

    this.seed(seed, opts, ...argv);
  }

  get name() {
    return 'function';
  }

  get seedable() {
    return this._seedable;
  }

  next() {
    return this._rng();
  }

  seed(seed, opts, ...argv) {
    if (typeof seed === 'function') {
      this._rng = seed || this._rng;
    }
  }

  clone(seed, opts, ...argv) {
    return cloneClass(RNGFunction, this, seed, opts, ...argv);
  }

}

export { RNGFunction, RNGFunction as default };
//# sourceMappingURL=index.esm.mjs.map
