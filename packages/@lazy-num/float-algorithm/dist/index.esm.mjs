const MATH_POW_2_32 = /*#__PURE__*/Math.pow(2, 32);

function df_mulberry32(n) {
  n |= 0;
  return () => {
    n += 0x6D2B79F5;
    let t = Math.imul(n ^ n >>> 15, 1 | n);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / MATH_POW_2_32;
  };
}

function df_splitmix32(n) {
  n |= 0;
  return () => {
    n += 0x9e3779b9;
    let t = n ^ n >>> 15;
    t = Math.imul(t, 0x85ebca6b);
    t = t ^ t >>> 13;
    t = Math.imul(t, 0xc2b2ae35);
    return ((t = t ^ t >>> 16) >>> 0) / MATH_POW_2_32;
  };
}

function df_sfc32(a, b, c, d) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = c << 21 | c >>> 11;
    c = c + t | 0;
    return (t >>> 0) / MATH_POW_2_32;
  };
}

function df_tychei(a, b, c, d) {
  return () => {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    b = (b << 25 | b >>> 7) ^ c;
    c = c - d | 0;
    d = (d << 24 | d >>> 8) ^ a;
    a = a - b | 0;
    b = (b << 20 | b >>> 12) ^ c;
    c = c - d | 0;
    d = (d << 16 | d >>> 16) ^ a;
    a = a - b | 0;
    return (a >>> 0) / MATH_POW_2_32;
  };
}
function df_tyche(a, b, c, d) {
  return () => {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    a = a + b | 0;
    d = d ^ a;
    d = d << 16 | d >>> 16;
    c = c + d | 0;
    b = b ^ c;
    b = b << 12 | b >>> 20;
    a = a + b | 0;
    d = d ^ a;
    d = d << 8 | d >>> 24;
    c = c + d | 0;
    b = b ^ c;
    b = b << 7 | b >>> 25;
    return (b >>> 0) / MATH_POW_2_32;
  };
}

export { df_mulberry32, df_sfc32, df_splitmix32, df_tyche, df_tychei };
//# sourceMappingURL=index.esm.mjs.map
