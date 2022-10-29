"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/expect"), t = require("@lazy-num/to-fixed-number"), r = require("@lazy-random/shared-lib");

function dfUniformFloat(r, n, o, f) {
  let i;
  return void 0 === o && (o = void 0 === n ? 1 : n, n = 0), e.expect(n), e.expect(o).number.finite.gt(n), 
  i = 0 === n && 1 === o ? () => r.next() : 0 === n ? () => r.next() * o : () => r.next() * (o - n) + n, 
  void 0 !== f ? (e.expect(f).integer.gte(0), () => t.toFixedNumber(i(), f)) : i;
}

function dfUniformInt(t, r, n) {
  void 0 === n && (n = void 0 === r ? 1 : r, r = 0), e.expect(r).integer(), e.expect(n).integer.gt(r);
  let o = dfUniformFloat(t, r, n + 1);
  return () => Math.floor(o());
}

function dfUniformByte(t, n) {
  let o = dfUniformInt(t, 0, 255);
  return void 0 !== n && e.expect(n).boolean(), n ? () => r.stringifyByte(o()) : o;
}

exports.dfUniformBoolean = function dfUniformBoolean(t, r = .5) {
  return e.expect(r).number.gt(0).lt(1), () => t.next() >= r;
}, exports.dfUniformByte = dfUniformByte, exports.dfUniformBytes = function dfUniformBytes(t, r = 1, n) {
  e.expect(r).integer.gt(0);
  const o = dfUniformByte(t, n);
  return () => {
    let e = r, t = [];
    for (;e--; ) t[e] = o();
    return t;
  };
}, exports.dfUniformFloat = dfUniformFloat, exports.dfUniformInt = dfUniformInt;
//# sourceMappingURL=index.cjs.production.min.cjs.map
