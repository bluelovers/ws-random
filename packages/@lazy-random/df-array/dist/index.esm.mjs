import { expect as e } from "@lazy-random/expect";

import { randIndexWithRange as r, randIndexByLength as t } from "@lazy-random/util-distributions";

import { swapAlgorithm2 as n } from "@lazy-random/array-algorithm";

import { dfUniformByte as l, dfUniformFloat as a, dfUniformInt as i } from "@lazy-random/df-uniform";

import { isUnset as f } from "@lazy-random/shared-lib";

function _handleStartEnd(r, t = 0, n, l) {
  const a = r.length, i = !l;
  return t = Math.max(Math.floor(t), 0), null != n && (n = Math.floor(n), i && e(n).integer.gt(t + 1, `END(${n}) should greater than START(${t}+1)`).gt(0)), 
  n = Math.min(Math.max(0, null != n ? n : a), a), i && e(n, `END(${n})`).integer.gte(0).lte(a), 
  i && e(t, `START(${t})`).integer.gte(0).lt(n), {
    start: t,
    end: n,
    len: a
  };
}

function _createIndexSampler(e, t, n) {
  return t === n - 1 ? () => t : () => r(e, t, n);
}

function dfArrayIndexOne(e, r, t = 0, n) {
  return ({start: t, end: n} = _handleStartEnd(r, t, n)), _createIndexSampler(e, t, n);
}

function dfArrayIndex(r, t, n = 1, l = 0, a) {
  e(n, "size").integer.gt(0), e(t.length, "arr.length").integer.gt(0);
  const i = _handleStartEnd(t, l, a), f = _createIndexSampler(r, i.start, i.end);
  let o = Math.min(i.end - i.start, i.len, n);
  return e(o, `size_runtime(${o})`).lte(n).gt(0), n = o, () => {
    o = n;
    let e, r = [];
    do {
      let t = f();
      e === t || r.includes(t) || (r.push(e = t), --o);
    } while (o > 0);
    return r;
  };
}

function dfArrayShuffle(e, r, l) {
  const randIndexByLength$1 = r => t(e, r);
  if (!l) {
    let e;
    return e = Buffer.isBuffer(r) ? e => Buffer.from(e) : e => e.slice(), () => n(e(r), !0, randIndexByLength$1);
  }
  return () => n(r, !0, randIndexByLength$1);
}

function dfArrayUnique(r, n, l, a, i, f) {
  let o = n.slice();
  l = Math.min(l || o.length, o.length), i = i || (e => t(r, e)), a = !!a, e(l, "limit").integer.gt(0), 
  e(i, "fnRandIndex").function();
  let d, u = l;
  const m = function _fnClone(e) {
    o = e.slice(), u = l, d = o.length;
  };
  return () => {
    if (d = o.length, 0 === d || 0 === u--) {
      let e = a;
      if (f) {
        let r = f(n, l, a, i);
        Array.isArray(r) && r.length > 0 ? (m(r), e = null) : 1 == r ? e = !0 : void 0 !== r && (e = !1);
      }
      if (e) m(n); else if (null !== e) throw new RangeError(`can't call arrayUnique > ${l} times`);
    }
    const e = i(d);
    return o.splice(e, 1)[0];
  };
}

function dfArrayFill(r, t, n, o) {
  let d;
  {
    let e = f(t), u = f(n);
    d = u && e ? l(r) : o ? a(r, t, n) : i(r, t, n), t = void 0, n = void 0;
  }
  return e(d).function(), e => {
    let r = e.length;
    for (;r--; ) e[r] = d();
    return e;
  };
}

dfArrayShuffle.memoizable = !1;

export { dfArrayFill, dfArrayIndex, dfArrayIndexOne, dfArrayShuffle, dfArrayUnique };
//# sourceMappingURL=index.esm.mjs.map
