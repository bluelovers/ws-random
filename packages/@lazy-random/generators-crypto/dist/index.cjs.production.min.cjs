"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/shared-lib"), r = require("@lazy-random/cross-crypto"), t = require("@lazy-random/expect"), s = require("@lazy-random/rng-abstract"), i = require("@lazy-num/float-from-buffer"), n = require("@lazy-random/array-rand-index");

class RNGCrypto extends s.RNG {
  _seedable=!1;
  _randIndex=n.arrayRandIndexByLength;
  _seed_size=e.UINT32_BYTES;
  _seed_size_min=e.UINT32_BYTES;
  constructor(e, r, ...t) {
    super(), this._init(e, r, ...t);
  }
  _init(s, a, ..._) {
    s = s || r.crossCrypto(), this._crypto = s, this._randIndex = this._randIndex || n.arrayRandIndexByLength, 
    t.expect(s.randomBytes).is.a.function(), this._seed_size = Math.min(Math.max(this._seed_size, e.UINT32_BYTES), 255), 
    this._seed_size_min = Math.min(Math.max(this._seed_size_min, e.UINT32_BYTES), 255), 
    this._fn = i._floatFromBuffer2;
  }
  _buffer(e, r = this._seed_size_min) {
    (e = 0 | (e || this._seed_size)) < r ? e = r : e > 255 && (e = 255);
    let t = this._crypto.randomBytes(e);
    if (e > r) {
      let s = this._randIndex(e - r);
      t = t.slice(s, s + r);
    }
    return t;
  }
  get name() {
    return "crypto";
  }
  next() {
    return this._fn(this._buffer());
  }
  seed(e, r, ...t) {}
}

exports.RNGCrypto = RNGCrypto, exports.default = RNGCrypto;
//# sourceMappingURL=index.cjs.production.min.cjs.map
