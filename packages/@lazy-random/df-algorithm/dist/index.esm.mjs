import { expect as t } from "@lazy-random/expect";

import { fixZero as n } from "num-is-zero";

function dfIrwinHall(e, r = 1) {
  return t(r).integer.gte(0), 0 === (r = n(r)) ? () => 0 : () => {
    let t = r, n = 0;
    for (;t--; ) n += e.next();
    return n;
  };
}

function dfBates(n, e = 1) {
  t(e).integer.gt(0);
  const r = dfIrwinHall(n, e);
  return () => r() / e;
}

function dfBernoulli(n, e = .5) {
  return t(e).number.gte(0).lte(1), () => Math.floor(n.next() + e);
}

function dfBinomial(n, e = 1, r = .5) {
  return t(e).integer.gt(0), t(r).number.gte(0).lte(1), () => {
    let t = e, o = 0;
    for (;t--; ) n.next() < r && o++;
    return o;
  };
}

function dfExponential(n, e = 1) {
  return t(e).number.gt(0), () => -Math.log(1 - n.next()) / e;
}

function dfGeometric(n, e = .5) {
  t(e).number.gt(0).lte(1);
  const r = 1.0 / Math.log(1.0 - e);
  return () => Math.floor(1 + Math.log(n.next()) * r);
}

function dfNormal(n, e = 0, r = 1) {
  return t(e).number(), t(r).number(), () => {
    let t, o, f;
    do {
      t = 2 * n.next() - 1, o = 2 * n.next() - 1, f = t * t + o * o;
    } while (!f || f > 1);
    return e + r * o * Math.sqrt(-2 * Math.log(f) / f);
  };
}

function dfLogNormal(...t) {
  const n = dfNormal(...t);
  return () => Math.exp(n());
}

function dfPareto(n, e = 1) {
  t(e).gt(0);
  const r = 1.0 / e;
  return () => 1.0 / Math.pow(1.0 - n.next(), r);
}

export { dfBates, dfBernoulli, dfBinomial, dfExponential, dfGeometric, dfIrwinHall, dfLogNormal, dfNormal, dfPareto };
//# sourceMappingURL=index.esm.mjs.map
