import { expect as t } from "@lazy-random/expect";

import { RNG as n } from "@lazy-random/rng-abstract";

import { cloneClass as e } from "@lazy-random/clone-class";

class RNGFunction extends n {
  _seedable=null;
  constructor(t, n, ...e) {
    super(), this._init(t, n, ...e);
  }
  _init_check(n, e, ...i) {
    let r = typeof n;
    null !== n && "undefined" !== r && "function" !== r && t(n);
  }
  _init(t, n, ...e) {
    this._init_check(t, n, ...e), this.seed(t, n, ...e);
  }
  get name() {
    return "function";
  }
  get seedable() {
    return this._seedable;
  }
  next() {
    return this._rng();
  }
  seed(t, n, ...e) {
    "function" == typeof t && (this._rng = t || this._rng);
  }
  clone(t, n, ...i) {
    return e(RNGFunction, this, t, n, ...i);
  }
}

export { RNGFunction, RNGFunction as default };
//# sourceMappingURL=index.esm.mjs.map
