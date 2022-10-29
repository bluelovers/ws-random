'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rngAbstract = require('@lazy-random/rng-abstract');
var xorshift = require('@bluelovers/xorshift');

class RNGXorShift128 extends rngAbstract.RNG {
  constructor(seed, opts, ...argv) {
    super();
    this._init(seed, opts, ...argv);
  }
  _init(seed, opts, ...argv) {
    super._init(seed, opts, ...argv);
    seed = xorshift.getRandomSeedAuto(seed);
    this._rng = new xorshift.XorShift(seed);
  }
  seed(seed, opts, ...argv) {
    var _seed;
    (_seed = seed) !== null && _seed !== void 0 ? _seed : seed = xorshift.getRandomSeedAuto();
    this._rng.seed(seed);
  }
  next() {
    return this._rng.random();
  }
  get seedable() {
    return true;
  }
  get name() {
    return 'xorshift128';
  }
}

exports.RNGXorShift128 = RNGXorShift128;
exports.default = RNGXorShift128;
//# sourceMappingURL=index.cjs.development.cjs.map
