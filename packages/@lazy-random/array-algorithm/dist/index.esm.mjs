import { arrayRandIndexByLength as e } from "@lazy-random/array-rand-index";

function swapAlgorithm(r, t, l = e) {
  let n = r.length, o = t ? r : r.slice();
  for (;n; ) {
    let e = l(n--);
    if (n === e) continue;
    let r = o[n];
    o[n] = o[e], o[e] = r;
  }
  return o;
}

function swapAlgorithm2(r, t, l = e) {
  let n = r.length, o = t ? r : r.slice(), i = n, a = Math.ceil(i / 2);
  for (;n; ) {
    let e = l(i);
    if (n--, e === n && (e = l(n < a ? i : n)), n === e) continue;
    let r = o[n];
    o[n] = o[e], o[e] = r;
  }
  return o;
}

function array_rebase(e, r, t, l) {
  let n, o = 0, i = e.length;
  if ("number" == typeof t || "number" == typeof l) for (;i--; ) {
    let a = e[i] + r;
    if (!(a >= t && a <= l)) {
      n = !1;
      break;
    }
    n = !0, e[i] = a, o += a;
  } else {
    for (;i--; ) {
      let t = e[i] + r;
      e[i] = t, o += t;
    }
    n = !0;
  }
  return {
    bool: n,
    b_sum: o
  };
}

export { array_rebase, swapAlgorithm, swapAlgorithm2 };
//# sourceMappingURL=index.esm.mjs.map
