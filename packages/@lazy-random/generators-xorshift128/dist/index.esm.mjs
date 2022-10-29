import { RNG as r } from "@lazy-random/rng-abstract";

import { getRandomSeedAuto as t, XorShift as e } from "@bluelovers/xorshift";

class RNGXorShift128 extends r {
  constructor(r, t, ...e) {
    super(), this._init(r, t, ...e);
  }
  _init(r, i, ...n) {
    super._init(r, i, ...n), r = t(r), this._rng = new e(r);
  }
  seed(r, e, ...i) {
    var n;
    null !== (n = r) && void 0 !== n || (r = t()), this._rng.seed(r);
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

export { RNGXorShift128, RNGXorShift128 as default };
//# sourceMappingURL=index.esm.mjs.map
