'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');
var rngAbstract = require('@lazy-random/rng-abstract');
var cloneClass = require('@lazy-random/clone-class');

class RNGFunction extends rngAbstract.RNG {
  _seedable = null;
  constructor(seed, opts, ...argv) {
    super();
    this._init(seed, opts, ...argv);
  }
  _init_check(seed, opts, ...argv) {
    let type = typeof seed;
    if (seed !== null && type !== 'undefined' && type !== 'function') {
      // @ts-ignore
      expect.expect(seed).function;
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
    //ow(this._rng, ow.function)
    //expect(this._rng).function();
  }

  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGFunction, this, seed, opts, ...argv);
  }
}

exports.RNGFunction = RNGFunction;
exports.default = RNGFunction;
//# sourceMappingURL=index.cjs.development.cjs.map
