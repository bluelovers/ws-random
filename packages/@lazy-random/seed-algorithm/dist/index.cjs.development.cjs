'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var originalMathRandom = require('@lazy-random/original-math-random');

/**
 * 以 FNV-1a 風格的雜湊 (Hash) 將字串折疊成初始狀態，回傳可持續產生 32 位元無號整數的閉包 (Closure)。
 * Folds a string into an initial state using an FNV-1a style hash and returns a closure producing unsigned 32-bit integers.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 *
 * @see https://github.com/michaeldzjap/rand-seed/blob/939181cf160e929cac8397f702cced6acb0e95d5/src/Algorithms/Base.ts#L13
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 */
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
/**
 * `df_xfnv1a` 的變體 (Variant)：改用 `0xdeadbeef` 初始常數與不同的攪拌常數，適合需要另一種雜湊分佈的場合。
 * A variant of `df_xfnv1a` using the `0xdeadbeef` seed constant and different mixing constants, useful for a different hash distribution.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
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

/**
 * 以 xmur3 演算法將字串折疊成種子狀態 (Seed State)，回傳可持續產生 32 位元無號整數的閉包 (Closure)。
 * Folds a string into a seed state using the xmur3 algorithm and returns a closure producing unsigned 32-bit integers.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
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
/**
 * `df_xmur3` 的變體 (Variant)：改以 FNV-1a 的 offset basis 起算，並在折疊時混入第二組旋轉常數，提供不同的雜湊分佈。
 * A variant of `df_xmur3` that starts from the FNV-1a offset basis and folds in a second set of rotate constants, giving a different hash distribution.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
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

/**
 * 將 64 位元倍精度浮點數 (Double) 拆成兩個 32 位元整數，以便把浮點種子以整數形式參與運算。
 * Splits a 64-bit double into two 32-bit integers so a floating-point seed can be used in integer math.
 *
 * @param floatNumber 要拆解的浮點數 / the float to split
 * @returns `[low, high]` 兩個 32 位元整數 / two 32-bit integers, low then high
 *
 * @example
 * doubleToIEEE(0.732821894576773)
 */
function doubleToIEEE(floatNumber) {
  const buf = new ArrayBuffer(8);
  new Float64Array(buf)[0] = floatNumber;
  return [new Uint32Array(buf)[0], new Uint32Array(buf)[1]];
}

/**
 * 以 4 個 32 位元狀態欄位產生無號整數序列的閉包 (Closure)，預設常數為 xorshift 家族常用的參數。
 * Produces a sequence of unsigned integers from four 32-bit state words using constants common to the xorshift family.
 *
 * @param a 初始狀態（任意 32 位元無號整數）/ initial state (any unsigned 32-bit integer)
 * @param b 第二狀態欄位，省略時採用預設常數 / second state word, defaults when omitted
 * @param c 第三狀態欄位，省略時採用預設常數 / third state word, defaults when omitted
 * @param d 第四狀態欄位，省略時採用預設常數 / fourth state word, defaults when omitted
 * @returns 每次呼叫回傳一個 32 位元無號整數 / a function returning one unsigned 32-bit integer per call
 *
 * @example
 * var seed = 0; // any unsigned 32-bit integer
 * var next = v3b(seed, 2654435769, 1013904242, 3668340011);
 */
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

/**
 * 把任意種子輸入整理成長度為 `size` 的數值陣列，供亂數演算法 (RNG Algorithm) 使用。
 * Normalizes arbitrary seed input into a numeric array of length `size` for an RNG algorithm to consume.
 *
 * @param seedInput 字串、數字或其陣列 / a string, number, or array of them
 * @param size 期望回傳的欄位數 / the number of fields to return
 * @returns 長度為 `size` 的數值陣列 / a numeric array of length `size`
 */
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
        s !== null && s !== void 0 ? s : s = doubleToIEEE(originalMathRandom._MathRandom());
        // @ts-ignore
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
