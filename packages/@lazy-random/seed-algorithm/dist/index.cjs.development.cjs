'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var originalMathRandom = require('@lazy-random/original-math-random');

function df_xfnv1a(str) {
  let h = 2166136261 >>> 0;

  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }

  return () => {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    return (h += h << 5) >>> 0;
  };
}
function df_xfnv1a_2(str) {
  let h = 0xdeadbeef | 0;

  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h + str.charCodeAt(i), 2654435761);
    h ^= h >>> 24;
    h = Math.imul(h << 11 | h >>> 21, 2246822519);
  }

  return () => {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h = h ^ h >>> 15;
    h = Math.imul(h, 2246822507);
    h = h ^ h >>> 13;
    h = Math.imul(h, 3266489917);
    return (h = Math.imul(h ^ h >>> 16, 1597334677)) >>> 0;
  };
}

function df_xmur3(str) {
  let h = 1779033703 ^ str.length;

  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }

  return () => {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function df_xmur3a(str) {
  let h = 2166136261 >>> 0;

  for (let k, i = 0; i < str.length; i++) {
    k = Math.imul(str.charCodeAt(i), 3432918353);
    k = k << 15 | k >>> 17;
    h ^= Math.imul(k, 461845907);
    h = h << 13 | h >>> 19;
    h = Math.imul(h, 5) + 3864292196 | 0;
  }

  h ^= str.length;
  return () => {
    h ^= h >>> 16;
    h = Math.imul(h, 2246822507);
    h ^= h >>> 13;
    h = Math.imul(h, 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function doubleToIEEE(floatNumber) {
  const buf = new ArrayBuffer(8);
  new Float64Array(buf)[0] = floatNumber;
  return [new Uint32Array(buf)[0], new Uint32Array(buf)[1]];
}

function df_v3b(a, b, c, d) {
  b || (b = 2654435769);
  c || (c = 1013904242);
  d || (d = 3668340011);
  let out,
      pos = 0,
      a0 = 0,
      b0 = b,
      c0 = c,
      d0 = d;
  return () => {
    if (pos === 0) {
      a += d;
      a = a << 21 | a >>> 11;
      b = (b << 12 | b >>> 20) + c;
      c ^= a;
      d ^= b;
      a += d;
      a = a << 19 | a >>> 13;
      b = (b << 24 | b >>> 8) + c;
      c ^= a;
      d ^= b;
      a += d;
      a = a << 7 | a >>> 25;
      b = (b << 12 | b >>> 20) + c;
      c ^= a;
      d ^= b;
      a += d;
      a = a << 27 | a >>> 5;
      b = (b << 17 | b >>> 15) + c;
      c ^= a;
      d ^= b;
      a += a0;
      b += b0;
      c += c0;
      d += d0;
      a0++;
      pos = 4;
    }

    switch (--pos) {
      case 0:
        out = a;
        break;

      case 1:
        out = b;
        break;

      case 2:
        out = c;
        break;

      case 3:
        out = d;
        break;
    }

    return out >>> 0;
  };
}

function seedFromStringOrNumberOrArray(seedInput, size) {
  let exists_zero = false;
  let s;
  const seed = [seedInput !== null && seedInput !== void 0 ? seedInput : []].flat().slice(0, 4);

  for (let i = 0; i < size; i++) {
    const type = typeof seed[i];

    if (type === 'string') {
      seed[i] = df_xfnv1a(`${seed[i]}#sfc32#${i}`)();
    } else if (type !== 'number') {
      exists_zero = true;
      seed[i] = void 0;
    } else {
      seed[i] = Math.abs(seed[i]);
    }

    if (!seed[i]) {
      if (seed[i] === 0 && !exists_zero) {
        exists_zero = true;
      } else {
        var _s;

        (_s = s) !== null && _s !== void 0 ? _s : s = doubleToIEEE(originalMathRandom._MathRandom());
        seed[i] = s.pop();

        if (!s.length) {
          s = void 0;
        }
      }
    }
  }

  return seed;
}

exports.df_v3b = df_v3b;
exports.df_xfnv1a = df_xfnv1a;
exports.df_xfnv1a_2 = df_xfnv1a_2;
exports.df_xmur3 = df_xmur3;
exports.df_xmur3a = df_xmur3a;
exports.doubleToIEEE = doubleToIEEE;
exports.seedFromStringOrNumberOrArray = seedFromStringOrNumberOrArray;
//# sourceMappingURL=index.cjs.development.cjs.map
