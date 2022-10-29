import { expect as n } from "@lazy-random/expect";

import { toFixedNumber as t } from "@lazy-num/to-fixed-number";

import { stringifyByte as o } from "@lazy-random/shared-lib";

function dfUniformFloat(o, r, e, f) {
  let i;
  return void 0 === e && (e = void 0 === r ? 1 : r, r = 0), n(r), n(e).number.finite.gt(r), 
  i = 0 === r && 1 === e ? () => o.next() : 0 === r ? () => o.next() * e : () => o.next() * (e - r) + r, 
  void 0 !== f ? (n(f).integer.gte(0), () => t(i(), f)) : i;
}

function dfUniformInt(t, o, r) {
  void 0 === r && (r = void 0 === o ? 1 : o, o = 0), n(o).integer(), n(r).integer.gt(o);
  let e = dfUniformFloat(t, o, r + 1);
  return () => Math.floor(e());
}

function dfUniformBoolean(t, o = .5) {
  return n(o).number.gt(0).lt(1), () => t.next() >= o;
}

function dfUniformByte(t, r) {
  let e = dfUniformInt(t, 0, 255);
  return void 0 !== r && n(r).boolean(), r ? () => o(e()) : e;
}

function dfUniformBytes(t, o = 1, r) {
  n(o).integer.gt(0);
  const e = dfUniformByte(t, r);
  return () => {
    let n = o, t = [];
    for (;n--; ) t[n] = e();
    return t;
  };
}

export { dfUniformBoolean, dfUniformByte, dfUniformBytes, dfUniformFloat, dfUniformInt };
//# sourceMappingURL=index.esm.mjs.map
