"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("uni-string"), r = require("@lazy-random/shared-lib"), t = require("@lazy-random/expect"), n = require("@lazy-num/float-to-string"), i = require("@lazy-random/util-distributions");

function dfCharID(o, u, a) {
  "number" == typeof u && ("number" == typeof a ? u = n.floatToString(u) : [a, u] = [ u, null ]), 
  t.expect(a = a || 8).integer.gt(0), u || (u = r.ENUM_ALPHABET.DEFAULT);
  const l = e.create(u).split(""), s = l.length;
  t.expect(l).lengthOf.gt(1);
  const randIndex = () => i.randIndex(o, s);
  return () => {
    let e = a, r = [];
    for (;e--; ) r.push(l[randIndex()]);
    return r.join("");
  };
}

exports.default = dfCharID, exports.dfCharID = dfCharID;
//# sourceMappingURL=index.cjs.production.min.cjs.map
