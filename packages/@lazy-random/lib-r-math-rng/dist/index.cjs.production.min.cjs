"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("lib-r-math.js"), n = require("random-extra/src/random"), t = require("@lazy-random/rng-abstract"), r = require("is-extends-of");

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  return e && Object.keys(e).forEach((function(t) {
    if ("default" !== t) {
      var r = Object.getOwnPropertyDescriptor(e, t);
      Object.defineProperty(n, t, r.get ? r : {
        enumerable: !0,
        get: function() {
          return e[t];
        }
      });
    }
  })), n.default = e, n;
}

var s = _interopNamespaceDefault(e);

class RandomRngWithLibRMath extends t.RNG {
  _seedable=!0;
  constructor(e, n, ...t) {
    super(), this._init(e, n, ...t);
  }
  _init(e, n, ...t) {
    this._rng = e instanceof s.IRNG ? e : n instanceof s.IRNG ? n : e && r(e, s.IRNG) ? new e(this._seedNum(n)) : n && r(n, s.IRNG) ? new n(this._seedNum(e)) : "function" == typeof (null == e ? void 0 : e.unif_rand) ? e : "function" == typeof (null == n ? void 0 : n.unif_rand) ? n : n && s[n] ? new (0, 
    s[n])(this._seedNum(e)) : new s.rng.MersenneTwister(this._seedNum(e)), this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
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
  seed(e, n, ...t) {
    this._rng.seed = [ this._seedNum(e) ];
  }
}

exports.LibRMathRngWithRandom = class LibRMathRngWithRandom extends e.IRNG {
  constructor(e, n) {
    super(e), this.use(n, e);
  }
  get _name() {
    return "Random<" + this.__random.rng.name + ">";
  }
  get seed() {
    return this.__seed;
  }
  set seed(e) {
    var n, t;
    null === (n = (t = this.__random).seed) || void 0 === n || n.call(t, this.__seed = e);
  }
  use(e, r) {
    e && (e instanceof t.RNG || "function" == typeof e.next || ("seedrandom" === e ? e = n.random.newUse("seedrandom", r, {
      entropy: !1
    }) : e instanceof n.Random || (e = n.random.newUse(e)))), this.__random = e || this.__random || n.random, 
    void 0 !== r && (this.seed = r);
  }
  _setup() {}
  internal_unif_rand() {
    return this.__random.next();
  }
}, exports.RandomRngWithLibRMath = RandomRngWithLibRMath, exports.default = RandomRngWithLibRMath;
//# sourceMappingURL=index.cjs.production.min.cjs.map
