import { randomSeedStr as n, seedToken as r, hashAny as e } from "@lazy-random/seed-token";

import { RNGCore as t } from "@lazy-random/rng-abstract-core";

const s = /*#__PURE__*/ Symbol.for("@lazy-random/rng-abstract#RNG");

function _hasRNGBrand(n) {
  var r;
  return !(!n || "object" != typeof n && "function" != typeof n) && (null === (r = Object.getPrototypeOf(n)) || void 0 === r ? void 0 : r[s]);
}

class RNG extends t {
  [s]=!0;
  static create(n, r, ...e) {
    if (this === RNG || this === t || !this) throw new ReferenceError("RNG is abstract class");
    return new this(n, r, ...e);
  }
  _seedNum(e, t, ...s) {
    return null != e && 0 !== e || (e = n()), r(e, t, ...s);
  }
  _seedStr(n, r, ...t) {
    return e(n, r, ...t);
  }
}

class RNGInstanceOfError extends TypeError {
  constructor(n, r) {
    "function" == typeof n && (n = n(r)), super(n || _getExpectRNGMessage(r));
  }
}

function _getExpectRNGMessage(n) {
  var r;
  return `expected [${(null == n || null === (r = n.constructor) || void 0 === r ? void 0 : r.name) || "unknown"}] ${n} to be an instance of RNG`;
}

function _isInstanceOfRNG(n) {
  return n instanceof RNG || _hasRNGBrand(n) || !1;
}

function _assertInstanceOfRNG(n, r) {
  if (!_isInstanceOfRNG(n)) throw new RNGInstanceOfError(r, n);
}

function _isInstanceofAssertionOrRNGError(n) {
  return n instanceof RNGInstanceOfError || n instanceof Error && ("AssertionError" === n.name || "RNGAssertionError" === n.name) && /instance/i.test(n.message);
}

export { RNG, RNGInstanceOfError, _assertInstanceOfRNG, _getExpectRNGMessage, _hasRNGBrand, _isInstanceOfRNG, _isInstanceofAssertionOrRNGError, RNG as default };
//# sourceMappingURL=index.esm.mjs.map
