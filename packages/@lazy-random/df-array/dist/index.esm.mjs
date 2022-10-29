import { expect as r } from "@lazy-random/expect";

import { int as t, randIndex as e } from "@lazy-random/util-distributions";

import { swapAlgorithm2 as n } from "@lazy-random/array-algorithm";

import { dfUniformByte as l, dfUniformFloat as i, dfUniformInt as f } from "@lazy-random/df-uniform";

import { isUnset as o } from "@lazy-random/shared-lib";

function dfArrayIndex(e, n, l = 1, i = 0, f) {
  let o = n.length - 1;
  r(l).integer.gt(0), i = Math.max(Math.floor(i), 0), f = Math.max(0, Math.floor(f)) || o, 
  r(f).integer.gt(0).lte(o), r(i).integer.gte(0).lt(f);
  const a = t;
  let u = Math.max(Math.min(f - i, o, l), 0);
  return r(u).gte(l).gt(0), () => {
    let r, t = [];
    do {
      let n = a(e, i, f);
      r === n || t.includes(n) || (t.push(r = n), --u);
    } while (u > 0);
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

function dfArrayUnique(t, n, l, i, f, o) {
  let a = n.slice();
  l = Math.min(l || a.length, a.length), f = f || (r => e(t, r)), i = !!i, r(l).integer.gt(0), 
  r(f).function();
  let u, m = l;
  const d = function _fnClone(r) {
    a = r.slice(), m = l, u = a.length;
  };
  return () => {
    if (u = a.length, 0 === u || 0 == m--) {
      let r = i;
      if (o) {
        let t = o(n, l, i, f);
        Array.isArray(t) && t.length > 0 ? (d(t), r = null) : 1 == t ? r = !0 : void 0 !== t && (r = !1);
      }
      if (r) d(n); else if (null !== r) throw new RangeError(`can't call arrayUnique > ${l} times`);
    }
    let r = f(u);
    return a.splice(r, 1)[0];
  };
}

function dfArrayFill(t, e, n, a) {
  let u;
  {
    let r = o(e), m = o(n);
    u = m && r ? l(t) : a ? i(t, e, n) : f(t, e, n), e = void 0, n = void 0;
  }
  return r(u).function(), r => {
    let t = r.length;
    for (;t--; ) r[t] = u();
    return r;
  };
}

dfArrayShuffle.memoizable = !1;

export { dfArrayFill, dfArrayIndex, dfArrayShuffle, dfArrayUnique };
//# sourceMappingURL=index.esm.mjs.map
