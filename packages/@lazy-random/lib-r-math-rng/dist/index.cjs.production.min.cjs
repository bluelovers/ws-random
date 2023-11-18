"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("lib-r-math.js"), t = require("random-extra/src/random"), n = require("@lazy-random/rng-abstract"), i = require("is-extends-of");

function _interopNamespaceDefault(e) {
  var t = Object.create(null);
  return e && Object.keys(e).forEach((function(n) {
    if ("default" !== n) {
      var i = Object.getOwnPropertyDescriptor(e, n);
      Object.defineProperty(t, n, i.get ? i : {
        enumerable: !0,
        get: function() {
          return e[n];
        }
      });
    }
  })), t.default = e, t;
}

var r = _interopNamespaceDefault(e);

function _isLibRMathRNGLike(e) {
  return !(!e || "function" != typeof e.unif_rand && "function" != typeof e.internal_unif_rand);
}

function _isExtendsOfLibRMathRNGLike(t) {
  return !(!t || !i(t, e.IRNG));
}

class RandomRngWithLibRMath extends n.RNG {
  _seedable=!0;
  constructor(e, t, ...n) {
    super(), this._init(e, t, ...n);
  }
  _init(t, n, ...i) {
    this._rng = t instanceof e.IRNG ? t : n instanceof e.IRNG ? n : _isExtendsOfLibRMathRNGLike(t) ? new t(this._seedNum(n)) : _isExtendsOfLibRMathRNGLike(n) ? new n(this._seedNum(t)) : _isLibRMathRNGLike(t) ? t : _isLibRMathRNGLike(n) ? n : n && r[n] ? new (0, 
    r[n])(this._seedNum(t)) : new r.rng.MersenneTwister(this._seedNum(t)), this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
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
  seed(e, t, ...n) {
    this._rng.seed = [ this._seedNum(e) ];
  }
}

exports.LibRMathRngWithRandom = class LibRMathRngWithRandom extends e.IRNG {
  constructor(e, t) {
    super(e), this.use(t, e);
  }
  get _name() {
    return "Random<" + this.__random.rng.name + ">";
  }
  get seed() {
    return this.__seed;
  }
  set seed(e) {
    var t, n;
    null === (t = (n = this.__random).seed) || void 0 === t || t.call(n, this.__seed = e);
  }
  use(e, i) {
    e && (e instanceof n.RNG || "function" == typeof e.next || ("seedrandom" === e ? e = t.random.newUse("seedrandom", i, {
      entropy: !1
    }) : e instanceof t.Random || (e = t.random.newUse(e)))), this.__random = e || this.__random || t.random, 
    void 0 !== i && (this.seed = i);
  }
  _setup() {}
  internal_unif_rand() {
    return this.__random.next();
  }
}, exports.RandomRngWithLibRMath = RandomRngWithLibRMath, exports._isExtendsOfLibRMathRNGLike = _isExtendsOfLibRMathRNGLike, 
exports._isLibRMathRNGLike = _isLibRMathRNGLike, exports.default = RandomRngWithLibRMath;
//# sourceMappingURL=index.cjs.production.min.cjs.map
