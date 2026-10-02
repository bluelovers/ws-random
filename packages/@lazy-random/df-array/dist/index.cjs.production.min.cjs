"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/expect"), t = require("@lazy-random/util-distributions"), r = require("@lazy-random/array-algorithm"), n = require("@lazy-random/df-uniform"), l = require("@lazy-random/shared-lib");

function _handleStartEnd(t, r = 0, n, l) {
  const i = t.length, a = !l;
  return r = Math.max(Math.floor(r), 0), null != n && (n = Math.floor(n), a && e.expect(n).integer.gt(r + 1, `END(${n}) should greater than START(${r}+1)`).gt(0)), 
  n = Math.min(Math.max(0, null != n ? n : i), i), a && e.expect(n, `END(${n})`).integer.gte(0).lte(i), 
  a && e.expect(r, `START(${r})`).integer.gte(0).lt(n), {
    start: r,
    end: n,
    len: i
  };
}

function dfArrayIndexOne(e, r, n = 0, l) {
  return ({start: n, end: l} = _handleStartEnd(r, n, l)), n === l - 1 ? () => n : () => t.int(e, n, l);
}

function dfArrayShuffle(e, n, l) {
  const randIndex = r => t.randIndex(e, r);
  if (!l) {
    let e;
    return e = Buffer.isBuffer(n) ? e => Buffer.from(e) : e => e.slice(), () => r.swapAlgorithm2(e(n), !0, randIndex);
  }
  return () => r.swapAlgorithm2(n, !0, randIndex);
}

dfArrayShuffle.memoizable = !1, exports.dfArrayFill = function dfArrayFill(t, r, i, a) {
  let f;
  {
    let e = l.isUnset(r), d = l.isUnset(i);
    f = d && e ? n.dfUniformByte(t) : a ? n.dfUniformFloat(t, r, i) : n.dfUniformInt(t, r, i), 
    r = void 0, i = void 0;
  }
  return e.expect(f).function(), e => {
    let t = e.length;
    for (;t--; ) e[t] = f();
    return e;
  };
}, exports.dfArrayIndex = function dfArrayIndex(t, r, n = 1, l = 0, i) {
  e.expect(n, "size").integer.gt(0), e.expect(r.length, "arr.length").integer.gt(0);
  const a = dfArrayIndexOne(t, r, l, i);
  let f;
  ({start: l, end: i, len: f} = _handleStartEnd(r, l, i, !0));
  let d = Math.max(Math.min(i - l, f, n), 0);
  return e.expect(d, `size_runtime(${d})`).lte(n).gt(0), n = d, () => {
    d = n;
    let e, t = [];
    do {
      let r = a();
      e === r || t.includes(r) || (t.push(e = r), --d);
    } while (d > 0);
    return t;
  };
}, exports.dfArrayIndexOne = dfArrayIndexOne, exports.dfArrayShuffle = dfArrayShuffle, 
exports.dfArrayUnique = function dfArrayUnique(r, n, l, i, a, f) {
  let d = n.slice();
  l = Math.min(l || d.length, d.length), a = a || (e => t.randIndex(r, e)), i = !!i, 
  e.expect(l, "limit").integer.gt(0), e.expect(a, "fnRandIndex").function();
  let o, u = l;
  const s = function _fnClone(e) {
    d = e.slice(), u = l, o = d.length;
  };
  return () => {
    if (o = d.length, 0 === o || 0 === u--) {
      let e = i;
      if (f) {
        let t = f(n, l, i, a);
        Array.isArray(t) && t.length > 0 ? (s(t), e = null) : 1 == t ? e = !0 : void 0 !== t && (e = !1);
      }
      if (e) s(n); else if (null !== e) throw new RangeError(`can't call arrayUnique > ${l} times`);
    }
    const e = a(o);
    return d.splice(e, 1)[0];
  };
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
