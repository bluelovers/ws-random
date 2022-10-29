"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/expect"), t = require("num-is-zero");

function dfIrwinHall(r, n = 1) {
  return e.expect(n).integer.gte(0), 0 === (n = t.fixZero(n)) ? () => 0 : () => {
    let e = n, t = 0;
    for (;e--; ) t += r.next();
    return t;
  };
}

function dfNormal(t, r = 0, n = 1) {
  return e.expect(r).number(), e.expect(n).number(), () => {
    let e, o, l;
    do {
      e = 2 * t.next() - 1, o = 2 * t.next() - 1, l = e * e + o * o;
    } while (!l || l > 1);
    return r + n * o * Math.sqrt(-2 * Math.log(l) / l);
  };
}

exports.dfBates = function dfBates(t, r = 1) {
  e.expect(r).integer.gt(0);
  const n = dfIrwinHall(t, r);
  return () => n() / r;
}, exports.dfBernoulli = function dfBernoulli(t, r = .5) {
  return e.expect(r).number.gte(0).lte(1), () => Math.floor(t.next() + r);
}, exports.dfBinomial = function dfBinomial(t, r = 1, n = .5) {
  return e.expect(r).integer.gt(0), e.expect(n).number.gte(0).lte(1), () => {
    let e = r, o = 0;
    for (;e--; ) t.next() < n && o++;
    return o;
  };
}, exports.dfExponential = function dfExponential(t, r = 1) {
  return e.expect(r).number.gt(0), () => -Math.log(1 - t.next()) / r;
}, exports.dfGeometric = function dfGeometric(t, r = .5) {
  e.expect(r).number.gt(0).lte(1);
  const n = 1.0 / Math.log(1.0 - r);
  return () => Math.floor(1 + Math.log(t.next()) * n);
}, exports.dfIrwinHall = dfIrwinHall, exports.dfLogNormal = function dfLogNormal(...e) {
  const t = dfNormal(...e);
  return () => Math.exp(t());
}, exports.dfNormal = dfNormal, exports.dfPareto = function dfPareto(t, r = 1) {
  e.expect(r).gt(0);
  const n = 1.0 / r;
  return () => 1.0 / Math.pow(1.0 - t.next(), n);
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
