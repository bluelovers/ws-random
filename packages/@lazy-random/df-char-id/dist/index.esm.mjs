import t from "uni-string";

import { expect as r } from "@lazy-random/expect";

import { floatToString as o } from "@lazy-num/float-to-string";

import { randIndex as n } from "@lazy-random/util-distributions";

function dfCharID(e, i, f) {
  "number" == typeof i && ("number" == typeof f ? i = o(i) : [f, i] = [ i, null ]), 
  r(f = f || 8).integer.gt(0), i || (i = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const m = t.create(i).split(""), a = m.length;
  return r(m).lengthOf.gt(1), () => {
    let t = f, r = [];
    for (;t--; ) r.push(m[n(e, a)]);
    return r.join("");
  };
}

export { dfCharID as default, dfCharID };
//# sourceMappingURL=index.esm.mjs.map
