import { _MathRandom as t } from "@lazy-random/original-math-random";

function df_xfnv1a(t) {
  let r = 2166136261;
  for (let e = 0; e < t.length; e++) r = Math.imul(r ^ t.charCodeAt(e), 16777619);
  return () => (r += r << 13, r ^= r >>> 7, r += r << 3, r ^= r >>> 17, (r += r << 5) >>> 0);
}

function df_xfnv1a_2(t) {
  let r = -559038737;
  for (let e = 0; e < t.length; e++) r = Math.imul(r + t.charCodeAt(e), 2654435761), 
  r ^= r >>> 24, r = Math.imul(r << 11 | r >>> 21, 2246822519);
  return () => (r += r << 13, r ^= r >>> 7, r += r << 3, r ^= r >>> 17, r ^= r >>> 15, 
  r = Math.imul(r, 2246822507), r ^= r >>> 13, r = Math.imul(r, 3266489917), (r = Math.imul(r ^ r >>> 16, 1597334677)) >>> 0);
}

function df_xmur3(t) {
  let r = 1779033703 ^ t.length;
  for (let e = 0; e < t.length; e++) r = Math.imul(r ^ t.charCodeAt(e), 3432918353), 
  r = r << 13 | r >>> 19;
  return () => (r = Math.imul(r ^ r >>> 16, 2246822507), r = Math.imul(r ^ r >>> 13, 3266489909), 
  (r ^= r >>> 16) >>> 0);
}

function df_xmur3a(t) {
  let r = 2166136261;
  for (let e, n = 0; n < t.length; n++) e = Math.imul(t.charCodeAt(n), 3432918353), 
  e = e << 15 | e >>> 17, r ^= Math.imul(e, 461845907), r = r << 13 | r >>> 19, r = Math.imul(r, 5) + 3864292196 | 0;
  return r ^= t.length, () => (r ^= r >>> 16, r = Math.imul(r, 2246822507), r ^= r >>> 13, 
  r = Math.imul(r, 3266489909), r ^= r >>> 16, r >>> 0);
}

function doubleToIEEE(t) {
  const r = new ArrayBuffer(8);
  return new Float64Array(r)[0] = t, [ new Uint32Array(r)[0], new Uint32Array(r)[1] ];
}

function df_v3b(t, r, e, n) {
  r || (r = 2654435769), e || (e = 1013904242), n || (n = 3668340011);
  let a, l = 0, u = 0, o = r, f = e, i = n;
  return () => {
    switch (0 === l && (t += n, n ^= r = (r << 12 | r >>> 20) + e, r = (r << 24 | r >>> 8) + (e ^= t = t << 21 | t >>> 11), 
    e ^= t = (t += n) << 19 | t >>> 13, t += n ^= r, n ^= r = (r << 12 | r >>> 20) + e, 
    r = (r << 17 | r >>> 15) + (e ^= t = t << 7 | t >>> 25), e ^= t = (t += n) << 27 | t >>> 5, 
    n ^= r, t += u, r += o, e += f, n += i, u++, l = 4), --l) {
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
}

function seedFromStringOrNumberOrArray(r, e) {
  let n, a = !1;
  const l = [ null != r ? r : [] ].flat().slice(0, 4);
  for (let r = 0; r < e; r++) {
    const e = typeof l[r];
    var u;
    "string" === e ? l[r] = df_xfnv1a(`${l[r]}#sfc32#${r}`)() : "number" !== e ? (a = !0, 
    l[r] = void 0) : l[r] = Math.abs(l[r]), l[r] || (0 !== l[r] || a ? (null !== (u = n) && void 0 !== u || (n = doubleToIEEE(t())), 
    l[r] = n.pop(), n.length || (n = void 0)) : a = !0);
  }
  return l;
}

export { df_v3b, df_xfnv1a, df_xfnv1a_2, df_xmur3, df_xmur3a, doubleToIEEE, seedFromStringOrNumberOrArray };
//# sourceMappingURL=index.esm.mjs.map
