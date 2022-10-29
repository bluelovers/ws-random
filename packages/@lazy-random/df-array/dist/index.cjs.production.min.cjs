"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/expect"), r = require("@lazy-random/util-distributions"), t = require("@lazy-random/array-algorithm"), n = require("@lazy-random/df-uniform"), l = require("@lazy-random/shared-lib");

function dfArrayShuffle(e, n, l) {
  const randIndex = t => r.randIndex(e, t);
  if (!l) {
    let e;
    return e = Buffer.isBuffer(n) ? e => Buffer.from(e) : e => e.slice(), () => t.swapAlgorithm2(e(n), !0, randIndex);
  }
  return () => t.swapAlgorithm2(n, !0, randIndex);
}

dfArrayShuffle.memoizable = !1, exports.dfArrayFill = function dfArrayFill(r, t, i, f) {
  let a;
  {
    let e = l.isUnset(t), o = l.isUnset(i);
    a = o && e ? n.dfUniformByte(r) : f ? n.dfUniformFloat(r, t, i) : n.dfUniformInt(r, t, i), 
    t = void 0, i = void 0;
  }
  return e.expect(a).function(), e => {
    let r = e.length;
    for (;r--; ) e[r] = a();
    return e;
  };
}, exports.dfArrayIndex = function dfArrayIndex(t, n, l = 1, i = 0, f) {
  let a = n.length - 1;
  e.expect(l).integer.gt(0), i = Math.max(Math.floor(i), 0), f = Math.max(0, Math.floor(f)) || a, 
  e.expect(f).integer.gt(0).lte(a), e.expect(i).integer.gte(0).lt(f);
  const o = r.int;
  let u = Math.max(Math.min(f - i, a, l), 0);
  return e.expect(u).gte(l).gt(0), () => {
    let e, r = [];
    do {
      let n = o(t, i, f);
      e === n || r.includes(n) || (r.push(e = n), --u);
    } while (u > 0);
    return r;
  };
}, exports.dfArrayShuffle = dfArrayShuffle, exports.dfArrayUnique = function dfArrayUnique(t, n, l, i, f, a) {
  let o = n.slice();
  l = Math.min(l || o.length, o.length), f = f || (e => r.randIndex(t, e)), i = !!i, 
  e.expect(l).integer.gt(0), e.expect(f).function();
  let u, d = l;
  const s = function _fnClone(e) {
    o = e.slice(), d = l, u = o.length;
  };
  return () => {
    if (u = o.length, 0 === u || 0 == d--) {
      let e = i;
      if (a) {
        let r = a(n, l, i, f);
        Array.isArray(r) && r.length > 0 ? (s(r), e = null) : 1 == r ? e = !0 : void 0 !== r && (e = !1);
      }
      if (e) s(n); else if (null !== e) throw new RangeError(`can't call arrayUnique > ${l} times`);
    }
    let e = f(u);
    return o.splice(e, 1)[0];
  };
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
