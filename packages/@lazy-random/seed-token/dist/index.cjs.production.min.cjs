"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("hash-sum"), n = require("nanoid/non-secure"), r = require("@lazy-random/seed-data"), t = require("@lazy-num/float-to-string"), o = require("@lazy-random/original-math-random"), a = require("@lazy-random/shared-lib"), d = require("@lazy-assert/check-basic");

function hashSum(n, ...r) {
  return e(n, ...r);
}

function nanoid(e, ...r) {
  return n.nanoid();
}

let i, s;

function randomSeedStr() {
  return [ nanoid(), null != i ? i : i = e(r.name), null != s ? s : s = e(r.version), Date.now(), t.floatToString(o._MathRandom()) ].join("_");
}

function seedToken(e, n, ...r) {
  if (d.isFiniteInt(e)) return e;
  const t = String(e);
  let o = 0;
  const a = t.length;
  for (let e = 0; e < a; ++e) o ^= 0 | t.charCodeAt(e);
  return o;
}

exports.default = seedToken, exports.hashAny = function hashAny(e, ...n) {
  return e ? "string" != typeof e && (e = hashSum(e)) : e = randomSeedStr(), String(e);
}, exports.hashSum = hashSum, exports.nanoid = nanoid, exports.randomSeedNum = function randomSeedNum() {
  return o._MathRandom() * a.MATH_POW_2_32 + o._MathRandom();
}, exports.randomSeedStr = randomSeedStr, exports.seedToken = seedToken;
//# sourceMappingURL=index.cjs.production.min.cjs.map
