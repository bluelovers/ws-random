"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/seed-token"), r = require("@lazy-random/rng-abstract-core");

const t = /*#__PURE__*/ Symbol.for("@lazy-random/rng-abstract#RNG");

function _hasRNGBrand(e) {
  var r;
  return !(!e || "object" != typeof e && "function" != typeof e) && (null === (r = Object.getPrototypeOf(e)) || void 0 === r ? void 0 : r[t]);
}

class RNG extends r.RNGCore {
  [t]=!0;
  static create(e, t, ...n) {
    if (this === RNG || this === r.RNGCore || !this) throw new ReferenceError("RNG is abstract class");
    return new this(e, t, ...n);
  }
  _seedNum(r, t, ...n) {
    return null != r && 0 !== r || (r = e.randomSeedStr()), e.seedToken(r, t, ...n);
  }
  _seedStr(r, t, ...n) {
    return e.hashAny(r, t, ...n);
  }
}

class RNGInstanceOfError extends TypeError {
  constructor(e, r) {
    "function" == typeof e && (e = e(r)), super(e || _getExpectRNGMessage(r));
  }
}

function _getExpectRNGMessage(e) {
  var r;
  return `expected [${(null == e || null === (r = e.constructor) || void 0 === r ? void 0 : r.name) || "unknown"}] ${e} to be an instance of RNG`;
}

function _isInstanceOfRNG(e) {
  return e instanceof RNG || _hasRNGBrand(e) || !1;
}

exports.RNG = RNG, exports.RNGInstanceOfError = RNGInstanceOfError, exports._assertInstanceOfRNG = function _assertInstanceOfRNG(e, r) {
  if (!_isInstanceOfRNG(e)) throw new RNGInstanceOfError(r, e);
}, exports._getExpectRNGMessage = _getExpectRNGMessage, exports._hasRNGBrand = _hasRNGBrand, 
exports._isInstanceOfRNG = _isInstanceOfRNG, exports._isInstanceofAssertionOrRNGError = function _isInstanceofAssertionOrRNGError(e) {
  return e instanceof RNGInstanceOfError || e instanceof Error && ("AssertionError" === e.name || "RNGAssertionError" === e.name) && /instance/i.test(e.message);
}, exports.default = RNG;
//# sourceMappingURL=index.cjs.production.min.cjs.map
