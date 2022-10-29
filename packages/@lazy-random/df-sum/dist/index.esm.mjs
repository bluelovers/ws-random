import { array_unique as t } from "array-hyper-unique";

import { Multinomial as n } from "lib-r-math.js";

import { fixZero as e } from "num-is-zero";

import { expect as i } from "@lazy-random/expect";

import { toFixedNumber as r } from "@lazy-num/to-fixed-number";

import { fakeLibRMathRng as o } from "@lazy-random/fake-lib-r-math-rng";

import { get_prob as m, get_prob_float as a } from "@lazy-random/util-probabilities";

import { sum_1_to_n as u, num_array_sum as l } from "@lazy-num/sum";

import { randIndex as f, float as s } from "@lazy-random/util-distributions";

import { isUnset as d } from "@lazy-random/shared-lib";

import { dfUniformFloat as c } from "@lazy-random/df-uniform";

function coreFnRandSumInt(r) {
  let {random: a, size: l, sum: s, min: c, max: g} = r;
  i(l).finite.integer.gt(1);
  const p = u(l);
  s = d(s) ? p : s, i(s).is.finite.integer(), c = d(c) ? s > 0 ? 0 : s : c, g = d(g) ? Math.abs(s) : g, 
  i(c).is.finite.integer(), i(g).is.finite.integer();
  let h = s - l * c, b = g - c;
  i(h).gte(0), s > 0 && i(s).gt(c);
  const y = m(l, b);
  i(y).array.lengthOf(l);
  const z = n(o((() => a.next()))).rmultinom, v = r.limit || 5;
  let F = c;
  const rmultinomCreateFn = t => z(t, h, y).reduce(((t, n) => {
    let e = n.length, i = 0, r = !1, o = 0;
    for (;e--; ) {
      let t = n[e], m = t + F;
      if (n.indexOf(t) === e && o++, !(m >= c && m <= g)) {
        r = !1;
        break;
      }
      r = !0, n[e] = m, i += m;
    }
    return r && i === s && t.push({
      value: n,
      unique_len: o,
      b_sum: i,
      bool: r
    }), t;
  }), []).sort(((t, n) => n.unique_len - t.unique_len));
  let x = [];
  {
    let n = t(rmultinomCreateFn(200).map((t => (t.value = t.value.map(e), t))));
    if (n.length) {
      let e = Math.min(10, n.length);
      for (;e--; ) x.push(n[e].value);
      x = t(x.map((t => t.sort())));
    }
    i(x, `invalid argv (size=${l}, sum=${s}, min=${c}, max=${g})`).array.have.lengthOf.gt(0), 
    n = void 0;
  }
  return r = void 0, () => {
    let t, n, i = rmultinomCreateFn(v), r = x.length;
    if (i.length) t = i[0].value, n = i[0].bool, t = t.map(e), n && r < 10 && x.push(t); else if (r) {
      let e = f(a, r);
      t = x[e], n = !0;
    }
    if (!n || !t) throw new Error("can't generator value by current input argv, or try set limit for high number");
    return t;
  };
}

function coreFnRandSumFloat(t) {
  let {random: n, size: o, sum: m, min: u, max: f, fractionDigits: g} = t;
  i(o).is.finite.integer.gt(1), d(m) && "number" == typeof u && "number" == typeof f && (m = (o - 1) * u + f), 
  m = d(m) ? 1.0 : m, u = d(u) ? m > 0 ? 0 : m : u, f = d(f) ? Math.abs(m) : f, i(u).is.finite.number(), 
  i(f).is.finite.number(), i(m).is.finite.number(), m += 0.0;
  const p = m - o * u, h = f - u;
  let b;
  m > 0 && i(m).gt(u), i(p).gte(0), d(g) || i(g).finite.integer.gt(0);
  {
    const t = a(o, h), e = l(t.slice(0, -1));
    b = c(n, 0, e);
  }
  const y = s;
  return () => {
    let t, i;
    t: do {
      const a = [];
      let l, s, d = p, c = 0.0, h = o - 1.0, z = b(), v = e(z + u);
      if (g && (v = r(v, g)), v < u || v > f) continue t;
      let F = d - z, x = F + u;
      if (x < u) continue t;
      c += v, a.push(v), d = F;
      let R = v;
      for (;h > 1; ) {
        l = y(n, 0, d);
        let t = d - l;
        if (t + u < u) continue t;
        s = e(l + u), g && (s = r(s, g)), s < u || s > f || s === R || (c += s, a.push(s), 
        d = t, h--, R = s);
      }
      x = e(m - c), g && (x = r(x, g)), x < u || x > f || x === v || x === R || (a.push(x), 
      i = !0, t = a);
    } while (0);
    return t;
  };
}

function dfRandSumFloat(t, n, e, i, r, o) {
  return coreFnRandSumFloat({
    random: t,
    size: n,
    sum: e,
    min: i,
    max: r,
    fractionDigits: o
  });
}

function dfRandSumInt(t, n, e, i, r, o) {
  return coreFnRandSumInt({
    random: t,
    size: n,
    sum: e,
    min: i,
    max: r,
    limit: o
  });
}

export { coreFnRandSumFloat, coreFnRandSumInt, dfRandSumFloat, dfRandSumInt };
//# sourceMappingURL=index.esm.mjs.map
