"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("uni-string"), r = require("@lazy-random/expect"), t = require("@lazy-num/float-to-string"), n = require("@lazy-random/util-distributions");

function dfCharID(u, i, o) {
  "number" == typeof i && ("number" == typeof o ? i = t.floatToString(i) : [o, i] = [ i, null ]), 
  r.expect(o = o || 8).integer.gt(0), i || (i = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const a = e.create(i).split(""), l = a.length;
  return r.expect(a).lengthOf.gt(1), () => {
    let e = o, r = [];
    for (;e--; ) r.push(a[n.randIndex(u, l)]);
    return r.join("");
  };
}

exports.default = dfCharID, exports.dfCharID = dfCharID;
//# sourceMappingURL=index.cjs.production.min.cjs.map
