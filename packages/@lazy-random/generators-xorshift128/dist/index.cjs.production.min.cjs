"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/rng-abstract"), t = require("@bluelovers/xorshift");

class RNGXorShift128 extends e.RNG {
  constructor(e, t, ...r) {
    super(), this._init(e, t, ...r);
  }
  _init(e, r, ...s) {
    super._init(e, r, ...s), e = t.getRandomSeedAuto(e), this._rng = new t.XorShift(e);
  }
  seed(e, r, ...s) {
    null != e || (e = t.getRandomSeedAuto()), this._rng.seed(e);
  }
  next() {
    return this._rng.random();
  }
  get seedable() {
    return !0;
  }
  get name() {
    return "xorshift128";
  }
}

exports.RNGXorShift128 = RNGXorShift128, exports.default = RNGXorShift128;
//# sourceMappingURL=index.cjs.production.min.cjs.map
