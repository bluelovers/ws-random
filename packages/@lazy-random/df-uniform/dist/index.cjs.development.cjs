'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');
var toFixedNumber = require('@lazy-num/to-fixed-number');
var sharedLib = require('@lazy-random/shared-lib');

/**
 * 建立產生 `[min, max)` 區間均勻分佈 (Uniform Distribution) 浮點數的產生器
 * Create a generator yielding uniform float values in the `[min, max)` range
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0, 1)
 * @param min 區間下限（含）；省略 max 時此參數會被視為 max，min 則取 0
 * @param max 區間上限（不含），必須大於 min；預設與 min 一起推導為 [0, 1)
 * @param fractionDigits 小數位數 (Fraction Digits)，須為大於等於 0 的整數
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)
 * @throws 當 min/max 非有限數值、max <= min，或 fractionDigits 不是 >= 0 的整數時拋出錯誤
 */
function dfUniformFloat(random, min, max, fractionDigits) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }
  expect.expect(min).number.finite;
  expect.expect(max).number.finite.gt(min);
  let fn;
  if (min === 0 && max === 1) {
    fn = () => random.next();
  } else if (min === 0) {
    fn = () => {
      return random.next() * max;
    };
  } else {
    fn = () => {
      return random.next() * (max - min) + min;
    };
  }
  if (fractionDigits !== undefined) {
    expect.expect(fractionDigits).integer.gte(0);
    return () => {
      return toFixedNumber.toFixedNumber(fn(), fractionDigits);
    };
  }
  return fn;
}

/**
 * 建立產生 `[min, max]` 區間（含端點）均勻分佈 (Uniform Distribution) 整數的產生器
 * Create a generator yielding uniform integers in the inclusive `[min, max]` range
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0, 1)
 * @param min 區間下限（含），須為整數；省略 max 時此參數會被視為 max，min 則取 0
 * @param max 區間上限（含），須為整數且大於 min
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)，每次回傳一個整數
 * @throws 當 min/max 不是整數或 max <= min 時拋出錯誤
 */
function dfUniformInt(random, min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }
  expect.expect(min).integer();
  expect.expect(max).integer.gt(min);
  let fn = dfUniformFloat(random, min, max + 1);
  return () => {
    return Math.floor(fn());
  };
}

/**
 * 建立依機率門檻 (Likelihood Threshold) 回傳布林值 (Boolean) 的產生器
 * Create a generator returning booleans based on a likelihood threshold
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0, 1)
 * @param likelihood 機率門檻，須介於 0 與 1 之間（不含端點），預設 0.5
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)；當 random.next() >= likelihood 時回傳 true
 * @throws 當 likelihood 不在 (0, 1) 區間時拋出錯誤
 */
function dfUniformBoolean(random, likelihood = 0.5) {
  expect.expect(likelihood).number.gt(0).lt(1);
  return () => {
    return random.next() >= likelihood;
  };
}

/**
 * 建立產生 0～255 位元組 (Byte) 的產生器
 * Create a generator yielding bytes in the 0-255 range
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next()
 * @param toStr 為 true 時回傳十六進制字串 (Hex String)，否則回傳數值
 * @returns 依 toStr 回傳 `() => string` 或 `() => number` 的產生器函式 (Generator Function)
 * @throws 當 toStr 有值但不是布林值 (Boolean) 時拋出錯誤
 */

function dfUniformByte(random, toStr) {
  let fn = dfUniformInt(random, 0, 255);
  if (typeof toStr !== 'undefined') {
    expect.expect(toStr).boolean();
  }
  if (toStr) {
    return () => sharedLib.stringifyByte(fn());
  }
  return fn;
}

/**
 * 建立一次產生多個位元組 (Byte) 陣列的產生器
 * Create a generator yielding an array of multiple bytes
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next()
 * @param size 位元組數量，須為大於 0 的整數，預設 1
 * @param toStr 為 true 時回傳十六進制字串 (Hex String) 陣列，否則回傳數值陣列
 * @returns 依 toStr 回傳 `() => string[]` 或 `() => number[]` 的產生器函式 (Generator Function)
 * @throws 當 size 不是大於 0 的整數時拋出錯誤
 */

function dfUniformBytes(random, size = 1, toStr) {
  expect.expect(size).integer.gt(0);
  const fn = dfUniformByte(random, toStr);
  return () => {
    let i = size;
    let arr = [];
    while (i--) {
      arr[i] = fn();
    }
    return arr;
  };
}

exports.dfUniformBoolean = dfUniformBoolean;
exports.dfUniformByte = dfUniformByte;
exports.dfUniformBytes = dfUniformBytes;
exports.dfUniformFloat = dfUniformFloat;
exports.dfUniformInt = dfUniformInt;
//# sourceMappingURL=index.cjs.development.cjs.map
