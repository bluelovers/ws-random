"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const r = (() => {
  let r;
  return () => {
    if (void 0 === r) {
      var t;
      let o;
      try {
        o = r = require("crypto");
      } catch (t) {
        var e;
        o = global.crypto || global.msCrypto, null !== (e = o) && void 0 !== e && e.getRandomValues && (r = o);
      }
      null !== (t = r) && void 0 !== t && t.randomBytes || (r.randomBytes = r.randomBytes || function randomBytes(r, t) {
        if (r > 65536) throw new Error("requested too many random bytes");
        let e = new Uint8Array(r);
        r > 0 && o.getRandomValues(e);
        let n = Buffer.from(e.buffer);
        return "function" == typeof t && t(null, n), n;
      });
    }
    if (!r) throw r = null, new Error("not support crypto");
    return r;
  };
})();

exports.crossCrypto = r, exports.default = r, exports.randomBytes = function randomBytes(t, e) {
  return r().randomBytes(t, e);
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
