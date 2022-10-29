import { UINT32_BYTES as e } from "@lazy-random/shared-lib";

import { crossCrypto as t } from "@lazy-random/cross-crypto";

import { expect as r } from "@lazy-random/expect";

import { RNG as s } from "@lazy-random/rng-abstract";

import { _floatFromBuffer2 as i } from "@lazy-num/float-from-buffer";

import { arrayRandIndexByLength as n } from "@lazy-random/array-rand-index";

class RNGCrypto extends s {
  _seedable=!1;
  _randIndex=n;
  _seed_size=e;
  _seed_size_min=e;
  constructor(e, t, ...r) {
    super(), this._init(e, t, ...r);
  }
  _init(s, a, ...o) {
    s = s || t(), this._crypto = s, this._randIndex = this._randIndex || n, r(s.randomBytes).is.a.function(), 
    this._seed_size = Math.min(Math.max(this._seed_size, e), 255), this._seed_size_min = Math.min(Math.max(this._seed_size_min, e), 255), 
    this._fn = i;
  }
  _buffer(e, t = this._seed_size_min) {
    (e = 0 | (e || this._seed_size)) < t ? e = t : e > 255 && (e = 255);
    let r = this._crypto.randomBytes(e);
    if (e > t) {
      let s = this._randIndex(e - t);
      r = r.slice(s, s + t);
    }
    return r;
  }
  get name() {
    return "crypto";
  }
  next() {
    return this._fn(this._buffer());
  }
  seed(e, t, ...r) {}
}

export { RNGCrypto, RNGCrypto as default };
//# sourceMappingURL=index.esm.mjs.map
