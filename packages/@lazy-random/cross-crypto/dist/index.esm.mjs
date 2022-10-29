const r = (() => {
  let r;
  return () => {
    if (void 0 === r) {
      var t;
      let e;
      try {
        e = r = require("crypto");
      } catch (t) {
        var o;
        e = global.crypto || global.msCrypto, null !== (o = e) && void 0 !== o && o.getRandomValues && (r = e);
      }
      null !== (t = r) && void 0 !== t && t.randomBytes || (r.randomBytes = r.randomBytes || function randomBytes(r, t) {
        if (r > 65536) throw new Error("requested too many random bytes");
        let o = new Uint8Array(r);
        r > 0 && e.getRandomValues(o);
        let n = Buffer.from(o.buffer);
        return "function" == typeof t && t(null, n), n;
      });
    }
    if (!r) throw r = null, new Error("not support crypto");
    return r;
  };
})();

function randomBytes(t, o) {
  return r().randomBytes(t, o);
}

export { r as crossCrypto, r as default, randomBytes };
//# sourceMappingURL=index.esm.mjs.map
