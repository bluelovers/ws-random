"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("hash-sum"), n = require("nanoid/non-secure"), r = require("@lazy-random/seed-data"), o = require("@lazy-num/float-to-string"), t = require("@lazy-random/original-math-random"), a = require("@lazy-random/shared-lib"), d = require("@lazy-assert/check-basic");

function hashSum(n, ...r) {
  return e(n, ...r);
}

function nanoid(e, ...r) {
  return n.nanoid();
}

let i, s;

function randomSeedStr() {
  var n, a;
  return [ nanoid(), null !== (n = i) && void 0 !== n ? n : i = e(r.name), null !== (a = s) && void 0 !== a ? a : s = e(r.version), Date.now(), o.floatToString(t._MathRandom()) ].join("_");
}

function seedToken(e, n, ...r) {
  if (d.isFiniteInt(e)) return e;
  const o = String(e);
  let t = 0;
  const a = o.length;
  for (let e = 0; e < a; ++e) t ^= 0 | o.charCodeAt(e);
  return t;
}

exports.default = seedToken, exports.hashAny = function hashAny(e, ...n) {
  return e ? "string" != typeof e && (e = hashSum(e)) : e = randomSeedStr(), String(e);
}, exports.hashSum = hashSum, exports.nanoid = nanoid, exports.randomSeedNum = function randomSeedNum() {
  return t._MathRandom() * a.MATH_POW_2_32 + t._MathRandom();
}, exports.randomSeedStr = randomSeedStr, exports.seedToken = seedToken;
//# sourceMappingURL=index.cjs.production.min.cjs.map
