import * as n from "lib-r-math.js";

import { IRNG as e } from "lib-r-math.js";

import { random as t, Random as s } from "random-extra/src/random";

import { RNG as i } from "@lazy-random/rng-abstract";

import r from "is-extends-of";

class LibRMathRngWithRandom extends e {
  constructor(n, e) {
    super(n), this.use(e, n);
  }
  get _name() {
    return "Random<" + this.__random.rng.name + ">";
  }
  get seed() {
    return this.__seed;
  }
  set seed(n) {
    var e, t;
    null === (e = (t = this.__random).seed) || void 0 === e || e.call(t, this.__seed = n);
  }
  use(n, e) {
    n && (n instanceof i || "function" == typeof n.next || ("seedrandom" === n ? n = t.newUse("seedrandom", e, {
      entropy: !1
    }) : n instanceof s || (n = t.newUse(n)))), this.__random = n || this.__random || t, 
    void 0 !== e && (this.seed = e);
  }
  _setup() {}
  internal_unif_rand() {
    return this.__random.next();
  }
}

class RandomRngWithLibRMath extends i {
  _seedable=!0;
  constructor(n, e, ...t) {
    super(), this._init(n, e, ...t);
  }
  _init(e, t, ...s) {
    this._rng = e instanceof n.IRNG ? e : t instanceof n.IRNG ? t : e && r(e, n.IRNG) ? new e(this._seedNum(t)) : t && r(t, n.IRNG) ? new t(this._seedNum(e)) : "function" == typeof (null == e ? void 0 : e.unif_rand) ? e : "function" == typeof (null == t ? void 0 : t.unif_rand) ? t : t && n[t] ? new (0, 
    n[t])(this._seedNum(e)) : new n.rng.MersenneTwister(this._seedNum(e)), this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
  }
  get name() {
    return "libRMath" + (this._rng.name ? `<${this._rng.name}>` : "");
  }
  get options() {
    return this._rng.seed;
  }
  next() {
    return this._fn();
  }
  seed(n, e, ...t) {
    this._rng.seed = [ this._seedNum(n) ];
  }
}

export { LibRMathRngWithRandom, RandomRngWithLibRMath, RandomRngWithLibRMath as default };
//# sourceMappingURL=index.esm.mjs.map
