import { df_sfc32 as t } from "@lazy-num/float-algorithm";

import { RNGCore as r } from "@lazy-random/rng-abstract-core";

import { seedFromStringOrNumberOrArray as e } from "@lazy-random/seed-algorithm";

class RNGSfc32 extends r {
  constructor(t, r, ...e) {
    super(t, r, ...e), this._init(t, r, ...e);
  }
  _init(r, n, ...s) {
    r = e(r, 4), this._seed = r, this._rng = t(...r);
  }
  seed(t, r, ...e) {
    return this._init(t, r, ...e);
  }
  get seedable() {
    return !0;
  }
  next() {
    return this._rng();
  }
  get name() {
    return "sfc32";
  }
}

export { RNGSfc32, RNGSfc32 as default };
//# sourceMappingURL=index.esm.mjs.map
