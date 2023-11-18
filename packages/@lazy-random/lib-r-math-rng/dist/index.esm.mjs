import * as n from "lib-r-math.js";

import { IRNG as e } from "lib-r-math.js";

import { random as t, Random as i } from "random-extra/src/random";

import { RNG as s } from "@lazy-random/rng-abstract";

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
    n && (n instanceof s || "function" == typeof n.next || ("seedrandom" === n ? n = t.newUse("seedrandom", e, {
      entropy: !1
    }) : n instanceof i || (n = t.newUse(n)))), this.__random = n || this.__random || t, 
    void 0 !== e && (this.seed = e);
  }
  _setup() {}
  internal_unif_rand() {
    return this.__random.next();
  }
}

function _isLibRMathRNGLike(n) {
  return !(!n || "function" != typeof n.unif_rand && "function" != typeof n.internal_unif_rand);
}

function _isExtendsOfLibRMathRNGLike(n) {
  return !(!n || !r(n, e));
}

class RandomRngWithLibRMath extends s {
  _seedable=!0;
  constructor(n, e, ...t) {
    super(), this._init(n, e, ...t);
  }
  _init(t, i, ...s) {
    this._rng = t instanceof e ? t : i instanceof e ? i : _isExtendsOfLibRMathRNGLike(t) ? new t(this._seedNum(i)) : _isExtendsOfLibRMathRNGLike(i) ? new i(this._seedNum(t)) : _isLibRMathRNGLike(t) ? t : _isLibRMathRNGLike(i) ? i : i && n[i] ? new (0, 
    n[i])(this._seedNum(t)) : new n.rng.MersenneTwister(this._seedNum(t)), this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
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

export { LibRMathRngWithRandom, RandomRngWithLibRMath, _isExtendsOfLibRMathRNGLike, _isLibRMathRNGLike, RandomRngWithLibRMath as default };
//# sourceMappingURL=index.esm.mjs.map
