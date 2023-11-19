import { expect as r } from "@lazy-random/expect";

import { int as t, randIndex as e } from "@lazy-random/util-distributions";

import { swapAlgorithm2 as n } from "@lazy-random/array-algorithm";

import { dfUniformByte as l, dfUniformFloat as a, dfUniformInt as i } from "@lazy-random/df-uniform";

import { isUnset as f } from "@lazy-random/shared-lib";

function _handleStartEnd(t, e = 0, n, l) {
  var a;
  const i = t.length, f = !l;
  return e = Math.max(Math.floor(e), 0), null != n && (n = Math.floor(n), f && r(n).integer.gt(e + 1, `END(${n}) should greater than START(${e}+1)`).gt(0)), 
  n = Math.min(Math.max(0, null !== (a = n) && void 0 !== a ? a : i), i), f && r(n, `END(${n})`).integer.gte(0).lte(i), 
  f && r(e, `START(${e})`).integer.gte(0).lt(n), {
    start: e,
    end: n,
    len: i
  };
}

function dfArrayIndexOne(r, e, n = 0, l) {
  return ({start: n, end: l} = _handleStartEnd(e, n, l)), n === l - 1 ? () => n : () => t(r, n, l);
}

function dfArrayIndex(t, e, n = 1, l = 0, a) {
  r(n, "size").integer.gt(0), r(e.length, "arr.length").integer.gt(0);
  const i = dfArrayIndexOne(t, e, l, a);
  let f;
  ({start: l, end: a, len: f} = _handleStartEnd(e, l, a, !0));
  let o = Math.max(Math.min(a - l, f, n), 0);
  return r(o, `size_runtime(${o})`).lte(n).gt(0), n = o, () => {
    o = n;
    let r, t = [];
    do {
      let e = i();
      r === e || t.includes(e) || (t.push(r = e), --o);
    } while (o > 0);
    return t;
  };
}

function dfArrayShuffle(r, t, l) {
  const randIndex$1 = t => e(r, t);
  if (!l) {
    let r;
    return r = Buffer.isBuffer(t) ? r => Buffer.from(r) : r => r.slice(), () => n(r(t), !0, randIndex$1);
  }
  return () => n(t, !0, randIndex$1);
}

function dfArrayUnique(t, n, l, a, i, f) {
  let o = n.slice();
  l = Math.min(l || o.length, o.length), i = i || (r => e(t, r)), a = !!a, r(l, "limit").integer.gt(0), 
  r(i, "fnRandIndex").function();
  let d, u = l;
  const h = function _fnClone(r) {
    o = r.slice(), u = l, d = o.length;
  };
  return () => {
    if (d = o.length, 0 === d || 0 == u--) {
      let r = a;
      if (f) {
        let t = f(n, l, a, i);
        Array.isArray(t) && t.length > 0 ? (h(t), r = null) : 1 == t ? r = !0 : void 0 !== t && (r = !1);
      }
      if (r) h(n); else if (null !== r) throw new RangeError(`can't call arrayUnique > ${l} times`);
    }
    const r = i(d);
    return o.splice(r, 1)[0];
  };
}

function dfArrayFill(t, e, n, o) {
  let d;
  {
    let r = f(e), u = f(n);
    d = u && r ? l(t) : o ? a(t, e, n) : i(t, e, n), e = void 0, n = void 0;
  }
  return r(d).function(), r => {
    let t = r.length;
    for (;t--; ) r[t] = d();
    return r;
  };
}

dfArrayShuffle.memoizable = !1;

export { dfArrayFill, dfArrayIndex, dfArrayIndexOne, dfArrayShuffle, dfArrayUnique };
//# sourceMappingURL=index.esm.mjs.map
