"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = require("@lazy-random/original-math-random");

function df_xfnv1a(t) {
  let r = 2166136261;
  for (let e = 0; e < t.length; e++) r = Math.imul(r ^ t.charCodeAt(e), 16777619);
  return () => (r += r << 13, r ^= r >>> 7, r += r << 3, r ^= r >>> 17, (r += r << 5) >>> 0);
}

function doubleToIEEE(t) {
  const r = new ArrayBuffer(8);
  return new Float64Array(r)[0] = t, [ new Uint32Array(r)[0], new Uint32Array(r)[1] ];
}

exports.df_v3b = function df_v3b(t, r, e, n) {
  r || (r = 2654435769), e || (e = 1013904242), n || (n = 3668340011);
  let a, o = 0, l = 0, u = r, f = e, i = n;
  return () => {
    switch (0 === o && (t += n, n ^= r = (r << 12 | r >>> 20) + e, r = (r << 24 | r >>> 8) + (e ^= t = t << 21 | t >>> 11), 
    e ^= t = (t += n) << 19 | t >>> 13, t += n ^= r, n ^= r = (r << 12 | r >>> 20) + e, 
    r = (r << 17 | r >>> 15) + (e ^= t = t << 7 | t >>> 25), e ^= t = (t += n) << 27 | t >>> 5, 
    n ^= r, t += l, r += u, e += f, n += i, l++, o = 4), --o) {
     case 0:
      a = t;
      break;

     case 1:
      a = r;
      break;

     case 2:
      a = e;
      break;

     case 3:
      a = n;
    }
    return a >>> 0;
  };
}, exports.df_xfnv1a = df_xfnv1a, exports.df_xfnv1a_2 = function df_xfnv1a_2(t) {
  let r = -559038737;
  for (let e = 0; e < t.length; e++) r = Math.imul(r + t.charCodeAt(e), 2654435761), 
  r ^= r >>> 24, r = Math.imul(r << 11 | r >>> 21, 2246822519);
  return () => (r += r << 13, r ^= r >>> 7, r += r << 3, r ^= r >>> 17, r ^= r >>> 15, 
  r = Math.imul(r, 2246822507), r ^= r >>> 13, r = Math.imul(r, 3266489917), (r = Math.imul(r ^ r >>> 16, 1597334677)) >>> 0);
}, exports.df_xmur3 = function df_xmur3(t) {
  let r = 1779033703 ^ t.length;
  for (let e = 0; e < t.length; e++) r = Math.imul(r ^ t.charCodeAt(e), 3432918353), 
  r = r << 13 | r >>> 19;
  return () => (r = Math.imul(r ^ r >>> 16, 2246822507), r = Math.imul(r ^ r >>> 13, 3266489909), 
  (r ^= r >>> 16) >>> 0);
}, exports.df_xmur3a = function df_xmur3a(t) {
  let r = 2166136261;
  for (let e, n = 0; n < t.length; n++) e = Math.imul(t.charCodeAt(n), 3432918353), 
  e = e << 15 | e >>> 17, r ^= Math.imul(e, 461845907), r = r << 13 | r >>> 19, r = Math.imul(r, 5) + 3864292196 | 0;
  return r ^= t.length, () => (r ^= r >>> 16, r = Math.imul(r, 2246822507), r ^= r >>> 13, 
  r = Math.imul(r, 3266489909), r ^= r >>> 16, r >>> 0);
}, exports.doubleToIEEE = doubleToIEEE, exports.seedFromStringOrNumberOrArray = function seedFromStringOrNumberOrArray(r, e) {
  let n, a = !1;
  const o = [ null != r ? r : [] ].flat().slice(0, 4);
  for (let r = 0; r < e; r++) {
    const e = typeof o[r];
    var l;
    "string" === e ? o[r] = df_xfnv1a(`${o[r]}#sfc32#${r}`)() : "number" !== e ? (a = !0, 
    o[r] = void 0) : o[r] = Math.abs(o[r]), o[r] || (0 !== o[r] || a ? (null !== (l = n) && void 0 !== l || (n = doubleToIEEE(t._MathRandom())), 
    o[r] = n.pop(), n.length || (n = void 0)) : a = !0);
  }
  return o;
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
