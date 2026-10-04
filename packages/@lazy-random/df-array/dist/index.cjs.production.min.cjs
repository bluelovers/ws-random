"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/expect"), t = require("@lazy-random/util-distributions"), r = require("@lazy-random/array-algorithm"), n = require("@lazy-random/df-uniform"), l = require("@lazy-random/shared-lib");

function _handleStartEnd(t, r = 0, n, l) {
  const a = t.length, i = !l;
  return r = Math.max(Math.floor(r), 0), null != n && (n = Math.floor(n), i && e.expect(n).integer.gt(r + 1, `END(${n}) should greater than START(${r}+1)`).gt(0)), 
  n = Math.min(Math.max(0, null != n ? n : a), a), i && e.expect(n, `END(${n})`).integer.gte(0).lte(a), 
  i && e.expect(r, `START(${r})`).integer.gte(0).lt(n), {
    start: r,
    end: n,
    len: a
  };
}

function _createIndexSampler(e, r, n) {
  return r === n - 1 ? () => r : () => t.randIndexWithRange(e, r, n);
}

function dfArrayShuffle(e, n, l) {
  const randIndexByLength = r => t.randIndexByLength(e, r);
  if (!l) {
    let e;
    return e = Buffer.isBuffer(n) ? e => Buffer.from(e) : e => e.slice(), () => r.swapAlgorithm2(e(n), !0, randIndexByLength);
  }
  return () => r.swapAlgorithm2(n, !0, randIndexByLength);
}

dfArrayShuffle.memoizable = !1, exports.dfArrayFill = function dfArrayFill(t, r, a, i) {
  let d;
  {
    let e = l.isUnset(r), f = l.isUnset(a);
    d = f && e ? n.dfUniformByte(t) : i ? n.dfUniformFloat(t, r, a) : n.dfUniformInt(t, r, a), 
    r = void 0, a = void 0;
  }
  return e.expect(d).function(), e => {
    let t = e.length;
    for (;t--; ) e[t] = d();
    return e;
  };
}, exports.dfArrayIndex = function dfArrayIndex(t, r, n = 1, l = 0, a) {
  e.expect(n, "size").integer.gt(0), e.expect(r.length, "arr.length").integer.gt(0);
  const i = _handleStartEnd(r, l, a), d = _createIndexSampler(t, i.start, i.end);
  let f = Math.min(i.end - i.start, i.len, n);
  return e.expect(f, `size_runtime(${f})`).lte(n).gt(0), n = f, () => {
    f = n;
    let e, t = [];
    do {
      let r = d();
      e === r || t.includes(r) || (t.push(e = r), --f);
    } while (f > 0);
    return t;
  };
}, exports.dfArrayIndexOne = function dfArrayIndexOne(e, t, r = 0, n) {
  return ({start: r, end: n} = _handleStartEnd(t, r, n)), _createIndexSampler(e, r, n);
}, exports.dfArrayShuffle = dfArrayShuffle, exports.dfArrayUnique = function dfArrayUnique(r, n, l, a, i, d) {
  let f = n.slice();
  l = Math.min(l || f.length, f.length), i = i || (e => t.randIndexByLength(r, e)), 
  a = !!a, e.expect(l, "limit").integer.gt(0), e.expect(i, "fnRandIndex").function();
  let o, u = l;
  const s = function _fnClone(e) {
    f = e.slice(), u = l, o = f.length;
  };
  return () => {
    if (o = f.length, 0 === o || 0 === u--) {
      let e = a;
      if (d) {
        let t = d(n, l, a, i);
        Array.isArray(t) && t.length > 0 ? (s(t), e = null) : 1 == t ? e = !0 : void 0 !== t && (e = !1);
      }
      if (e) s(n); else if (null !== e) throw new RangeError(`can't call arrayUnique > ${l} times`);
    }
    const e = i(o);
    return f.splice(e, 1)[0];
  };
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
