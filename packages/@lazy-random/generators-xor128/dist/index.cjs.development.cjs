'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rngAbstract = require('@lazy-random/rng-abstract');
var seedToken = require('@lazy-random/seed-token');
var cloneClass = require('@lazy-random/clone-class');

class RNGXOR128 extends rngAbstract.RNG {
  constructor(...argv) {
    super();
    this._init(...argv);
    this.seed(this.x);
  }
  get name() {
    return 'xor128';
  }
  get seedable() {
    return true;
  }
  next() {
    const t = this.x ^ this.x << 1;
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.w ^ (this.w >>> 19 ^ t ^ t >>> 8);
    return (this.w >>> 0) / 0x100000000;
  }
  seed(seed, opts, ...argv) {
    //		this.x = this._seedNum(seed, opts, ...argv)
    this._seed(seed, opts, ...argv);
    // discard an initial batch of 64 values
    let i = 64;
    while (i--) {
      this.next();
    }
  }
  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGXOR128, this, seed, opts, ...argv);
  }
  _init(...argv) {
    let [x = seedToken.randomSeedNum(), y = seedToken.randomSeedNum(), z = seedToken.randomSeedNum(), w = seedToken.randomSeedNum()] = argv;
    this._seed(x, y, z, w);
  }
  _seed(...argv) {
    let [x = this.x, y = this.y, z = this.z, w = this.w] = argv;
    if (typeof x !== 'number') {
      x = this._seedNum(x) || this.x;
    }
    if (typeof y !== 'number') {
      y = this.y;
    }
    if (typeof z !== 'number') {
      z = this.z;
    }
    if (typeof x !== 'number') {
      w = this.w;
    }
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}

exports.RNGXOR128 = RNGXOR128;
exports.default = RNGXOR128;
//# sourceMappingURL=index.cjs.development.cjs.map
