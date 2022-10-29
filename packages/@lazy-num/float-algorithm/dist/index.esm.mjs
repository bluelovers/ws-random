const t = Math.pow(2, 32);

function df_mulberry32(n) {
  return n |= 0, () => {
    n += 0x6D2B79F5;
    let r = Math.imul(n ^ n >>> 15, 1 | n);
    return r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r, ((r ^ r >>> 14) >>> 0) / t;
  };
}

function df_splitmix32(n) {
  return n |= 0, () => {
    let r = (n += 0x9e3779b9) ^ n >>> 15;
    return r = Math.imul(r, 0x85ebca6b), r ^= r >>> 13, r = Math.imul(r, 0xc2b2ae35), 
    ((r ^= r >>> 16) >>> 0) / t;
  };
}

function df_sfc32(n, r, u, f) {
  return function() {
    const e = ((n |= 0) + (r |= 0) | 0) + (f |= 0) | 0;
    return f = f + 1 | 0, n = r ^ r >>> 9, r = (u |= 0) + (u << 3) | 0, u = (u = u << 21 | u >>> 11) + e | 0, 
    (e >>> 0) / t;
  };
}

function df_tychei(n, r, u, f) {
  return () => (r = ((r |= 0) << 25 | r >>> 7) ^ (u |= 0), u = u - (f |= 0) | 0, f = (f << 24 | f >>> 8) ^ (n |= 0), 
  n = n - r | 0, r = (r << 20 | r >>> 12) ^ u, u = u - f | 0, f = (f << 16 | f >>> 16) ^ n, 
  ((n = n - r | 0) >>> 0) / t);
}

function df_tyche(n, r, u, f) {
  return () => (r |= 0, f |= 0, r = (r ^= u = (u |= 0) + (f = (f ^= n = (n |= 0) + r | 0) << 16 | f >>> 16) | 0) << 12 | r >>> 20, 
  ((r = (r ^= u = u + (f = (f ^= n = n + r | 0) << 8 | f >>> 24) | 0) << 7 | r >>> 25) >>> 0) / t);
}

export { df_mulberry32, df_sfc32, df_splitmix32, df_tyche, df_tychei };
//# sourceMappingURL=index.esm.mjs.map
