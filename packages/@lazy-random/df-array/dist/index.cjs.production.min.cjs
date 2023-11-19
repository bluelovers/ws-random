"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/expect"), r = require("@lazy-random/util-distributions"), t = require("@lazy-random/array-algorithm"), n = require("@lazy-random/df-uniform"), l = require("@lazy-random/shared-lib");

function _handleStartEnd(r, t = 0, n, l) {
  var i;
  const a = r.length, f = !l;
  return t = Math.max(Math.floor(t), 0), null != n && (n = Math.floor(n), f && e.expect(n).integer.gt(t + 1, `END(${n}) should greater than START(${t}+1)`).gt(0)), 
  n = Math.min(Math.max(0, null !== (i = n) && void 0 !== i ? i : a), a), f && e.expect(n, `END(${n})`).integer.gte(0).lte(a), 
  f && e.expect(t, `START(${t})`).integer.gte(0).lt(n), {
    start: t,
    end: n,
    len: a
  };
}

function dfArrayIndexOne(e, t, n = 0, l) {
  return ({start: n, end: l} = _handleStartEnd(t, n, l)), n === l - 1 ? () => n : () => r.int(e, n, l);
}

function dfArrayShuffle(e, n, l) {
  const randIndex = t => r.randIndex(e, t);
  if (!l) {
    let e;
    return e = Buffer.isBuffer(n) ? e => Buffer.from(e) : e => e.slice(), () => t.swapAlgorithm2(e(n), !0, randIndex);
  }
  return () => t.swapAlgorithm2(n, !0, randIndex);
}

dfArrayShuffle.memoizable = !1, exports.dfArrayFill = function dfArrayFill(r, t, i, a) {
  let f;
  {
    let e = l.isUnset(t), d = l.isUnset(i);
    f = d && e ? n.dfUniformByte(r) : a ? n.dfUniformFloat(r, t, i) : n.dfUniformInt(r, t, i), 
    t = void 0, i = void 0;
  }
  return e.expect(f).function(), e => {
    let r = e.length;
    for (;r--; ) e[r] = f();
    return e;
  };
}, exports.dfArrayIndex = function dfArrayIndex(r, t, n = 1, l = 0, i) {
  e.expect(n, "size").integer.gt(0), e.expect(t.length, "arr.length").integer.gt(0);
  const a = dfArrayIndexOne(r, t, l, i);
  let f;
  ({start: l, end: i, len: f} = _handleStartEnd(t, l, i, !0));
  let d = Math.max(Math.min(i - l, f, n), 0);
  return e.expect(d, `size_runtime(${d})`).lte(n).gt(0), n = d, () => {
    d = n;
    let e, r = [];
    do {
      let t = a();
      e === t || r.includes(t) || (r.push(e = t), --d);
    } while (d > 0);
    return r;
  };
}, exports.dfArrayIndexOne = dfArrayIndexOne, exports.dfArrayShuffle = dfArrayShuffle, 
exports.dfArrayUnique = function dfArrayUnique(t, n, l, i, a, f) {
  let d = n.slice();
  l = Math.min(l || d.length, d.length), a = a || (e => r.randIndex(t, e)), i = !!i, 
  e.expect(l, "limit").integer.gt(0), e.expect(a, "fnRandIndex").function();
  let o, u = l;
  const s = function _fnClone(e) {
    d = e.slice(), u = l, o = d.length;
  };
  return () => {
    if (o = d.length, 0 === o || 0 == u--) {
      let e = i;
      if (f) {
        let r = f(n, l, i, a);
        Array.isArray(r) && r.length > 0 ? (s(r), e = null) : 1 == r ? e = !0 : void 0 !== r && (e = !1);
      }
      if (e) s(n); else if (null !== e) throw new RangeError(`can't call arrayUnique > ${l} times`);
    }
    const e = a(o);
    return d.splice(e, 1)[0];
  };
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
