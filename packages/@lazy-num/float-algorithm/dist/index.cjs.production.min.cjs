"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = Math.pow(2, 32);

exports.df_mulberry32 = function df_mulberry32(e) {
  return e |= 0, () => {
    e += 0x6D2B79F5;
    let r = Math.imul(e ^ e >>> 15, 1 | e);
    return r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r, ((r ^ r >>> 14) >>> 0) / t;
  };
}, exports.df_sfc32 = function df_sfc32(e, r, n, u) {
  return function() {
    const f = ((e |= 0) + (r |= 0) | 0) + (u |= 0) | 0;
    return u = u + 1 | 0, e = r ^ r >>> 9, r = (n |= 0) + (n << 3) | 0, n = (n = n << 21 | n >>> 11) + f | 0, 
    (f >>> 0) / t;
  };
}, exports.df_splitmix32 = function df_splitmix32(e) {
  return e |= 0, () => {
    let r = (e += 0x9e3779b9) ^ e >>> 15;
    return r = Math.imul(r, 0x85ebca6b), r ^= r >>> 13, r = Math.imul(r, 0xc2b2ae35), 
    ((r ^= r >>> 16) >>> 0) / t;
  };
}, exports.df_tyche = function df_tyche(e, r, n, u) {
  return () => (r |= 0, u |= 0, r = (r ^= n = (n |= 0) + (u = (u ^= e = (e |= 0) + r | 0) << 16 | u >>> 16) | 0) << 12 | r >>> 20, 
  ((r = (r ^= n = n + (u = (u ^= e = e + r | 0) << 8 | u >>> 24) | 0) << 7 | r >>> 25) >>> 0) / t);
}, exports.df_tychei = function df_tychei(e, r, n, u) {
  return () => (r = ((r |= 0) << 25 | r >>> 7) ^ (n |= 0), n = n - (u |= 0) | 0, u = (u << 24 | u >>> 8) ^ (e |= 0), 
  e = e - r | 0, r = (r << 20 | r >>> 12) ^ n, n = n - u | 0, u = (u << 16 | u >>> 16) ^ e, 
  ((e = e - r | 0) >>> 0) / t);
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
