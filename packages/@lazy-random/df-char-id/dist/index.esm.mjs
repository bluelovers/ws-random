import r from "uni-string";

import { ENUM_ALPHABET as t } from "@lazy-random/shared-lib";

import { expect as o } from "@lazy-random/expect";

import { floatToString as n } from "@lazy-num/float-to-string";

import { randIndex as e } from "@lazy-random/util-distributions";

function dfCharID(i, m, a) {
  "number" == typeof m && ("number" == typeof a ? m = n(m) : [a, m] = [ m, null ]), 
  o(a = a || 8).integer.gt(0), m || (m = t.DEFAULT);
  const f = r.create(m).split(""), l = f.length;
  o(f).lengthOf.gt(1);
  const randIndex$1 = () => e(i, l);
  return () => {
    let r = a, t = [];
    for (;r--; ) t.push(f[randIndex$1()]);
    return t.join("");
  };
}

export { dfCharID as default, dfCharID };
//# sourceMappingURL=index.esm.mjs.map
