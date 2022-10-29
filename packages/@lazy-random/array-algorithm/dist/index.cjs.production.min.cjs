"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/array-rand-index");

exports.array_rebase = function array_rebase(e, r, t, n) {
  let a, l = 0, o = e.length;
  if ("number" == typeof t || "number" == typeof n) for (;o--; ) {
    let i = e[o] + r;
    if (!(i >= t && i <= n)) {
      a = !1;
      break;
    }
    a = !0, e[o] = i, l += i;
  } else {
    for (;o--; ) {
      let t = e[o] + r;
      e[o] = t, l += t;
    }
    a = !0;
  }
  return {
    bool: a,
    b_sum: l
  };
}, exports.swapAlgorithm = function swapAlgorithm(r, t, n = e.arrayRandIndexByLength) {
  let a = r.length, l = t ? r : r.slice();
  for (;a; ) {
    let e = n(a--);
    if (a === e) continue;
    let r = l[a];
    l[a] = l[e], l[e] = r;
  }
  return l;
}, exports.swapAlgorithm2 = function swapAlgorithm2(r, t, n = e.arrayRandIndexByLength) {
  let a = r.length, l = t ? r : r.slice(), o = a, i = Math.ceil(o / 2);
  for (;a; ) {
    let e = n(o);
    if (a--, e === a && (e = n(a < i ? o : a)), a === e) continue;
    let r = l[a];
    l[a] = l[e], l[e] = r;
  }
  return l;
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
