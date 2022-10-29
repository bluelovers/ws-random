"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("array-hyper-unique"), t = require("lib-r-math.js"), n = require("num-is-zero"), i = require("@lazy-random/expect"), r = require("@lazy-num/to-fixed-number"), u = require("@lazy-random/fake-lib-r-math-rng"), a = require("@lazy-random/util-probabilities"), o = require("@lazy-num/sum"), s = require("@lazy-random/util-distributions"), l = require("@lazy-random/shared-lib"), m = require("@lazy-random/df-uniform");

function coreFnRandSumInt(r) {
  let {random: m, size: f, sum: c, min: d, max: p} = r;
  i.expect(f).finite.integer.gt(1);
  const x = o.sum_1_to_n(f);
  c = l.isUnset(c) ? x : c, i.expect(c).is.finite.integer(), d = l.isUnset(d) ? c > 0 ? 0 : c : d, 
  p = l.isUnset(p) ? Math.abs(c) : p, i.expect(d).is.finite.integer(), i.expect(p).is.finite.integer();
  let g = c - f * d, b = p - d;
  i.expect(g).gte(0), c > 0 && i.expect(c).gt(d);
  const h = a.get_prob(f, b);
  i.expect(h).array.lengthOf(f);
  const y = t.Multinomial(u.fakeLibRMathRng((() => m.next()))).rmultinom, F = r.limit || 5;
  let q = d;
  const rmultinomCreateFn = e => y(e, g, h).reduce(((e, t) => {
    let n = t.length, i = 0, r = !1, u = 0;
    for (;n--; ) {
      let e = t[n], a = e + q;
      if (t.indexOf(e) === n && u++, !(a >= d && a <= p)) {
        r = !1;
        break;
      }
      r = !0, t[n] = a, i += a;
    }
    return r && i === c && e.push({
      value: t,
      unique_len: u,
      b_sum: i,
      bool: r
    }), e;
  }), []).sort(((e, t) => t.unique_len - e.unique_len));
  let _ = [];
  {
    let t = e.array_unique(rmultinomCreateFn(200).map((e => (e.value = e.value.map(n.fixZero), 
    e))));
    if (t.length) {
      let n = Math.min(10, t.length);
      for (;n--; ) _.push(t[n].value);
      _ = e.array_unique(_.map((e => e.sort())));
    }
    i.expect(_, `invalid argv (size=${f}, sum=${c}, min=${d}, max=${p})`).array.have.lengthOf.gt(0), 
    t = void 0;
  }
  return r = void 0, () => {
    let e, t, i = rmultinomCreateFn(F), r = _.length;
    if (i.length) e = i[0].value, t = i[0].bool, e = e.map(n.fixZero), t && r < 10 && _.push(e); else if (r) {
      let n = s.randIndex(m, r);
      e = _[n], t = !0;
    }
    if (!t || !e) throw new Error("can't generator value by current input argv, or try set limit for high number");
    return e;
  };
}

function coreFnRandSumFloat(e) {
  let {random: t, size: u, sum: f, min: c, max: d, fractionDigits: p} = e;
  i.expect(u).is.finite.integer.gt(1), l.isUnset(f) && "number" == typeof c && "number" == typeof d && (f = (u - 1) * c + d), 
  f = l.isUnset(f) ? 1.0 : f, c = l.isUnset(c) ? f > 0 ? 0 : f : c, d = l.isUnset(d) ? Math.abs(f) : d, 
  i.expect(c).is.finite.number(), i.expect(d).is.finite.number(), i.expect(f).is.finite.number(), 
  f += 0.0;
  const x = f - u * c, g = d - c;
  let b;
  f > 0 && i.expect(f).gt(c), i.expect(x).gte(0), l.isUnset(p) || i.expect(p).finite.integer.gt(0);
  {
    const e = a.get_prob_float(u, g), n = o.num_array_sum(e.slice(0, -1));
    b = m.dfUniformFloat(t, 0, n);
  }
  const h = s.float;
  return () => {
    let e, i;
    e: do {
      const a = [];
      let o, s, l = x, m = 0.0, g = u - 1.0, y = b(), F = n.fixZero(y + c);
      if (p && (F = r.toFixedNumber(F, p)), F < c || F > d) continue e;
      let q = l - y, _ = q + c;
      if (_ < c) continue e;
      m += F, a.push(F), l = q;
      let v = F;
      for (;g > 1; ) {
        o = h(t, 0, l);
        let e = l - o;
        if (e + c < c) continue e;
        s = n.fixZero(o + c), p && (s = r.toFixedNumber(s, p)), s < c || s > d || s === v || (m += s, 
        a.push(s), l = e, g--, v = s);
      }
      _ = n.fixZero(f - m), p && (_ = r.toFixedNumber(_, p)), _ < c || _ > d || _ === F || _ === v || (a.push(_), 
      i = !0, e = a);
    } while (0);
    return e;
  };
}

exports.coreFnRandSumFloat = coreFnRandSumFloat, exports.coreFnRandSumInt = coreFnRandSumInt, 
exports.dfRandSumFloat = function dfRandSumFloat(e, t, n, i, r, u) {
  return coreFnRandSumFloat({
    random: e,
    size: t,
    sum: n,
    min: i,
    max: r,
    fractionDigits: u
  });
}, exports.dfRandSumInt = function dfRandSumInt(e, t, n, i, r, u) {
  return coreFnRandSumInt({
    random: e,
    size: t,
    sum: n,
    min: i,
    max: r,
    limit: u
  });
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
