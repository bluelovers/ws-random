'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var originalMathRandom = require('@lazy-random/original-math-random');
var floatToString = require('@lazy-num/float-to-string');

/**
 * 以指定時間 (Date) 產生數值型種子 (Numeric Seed)：毫秒時間戳記為整數基底，加上 `[0, 1)` 的亂數小數部分，
 * 讓種子同時具備「可辨識的時間」與毫秒以下的熵 (Entropy)。
 * Produces a numeric seed from a date: the millisecond timestamp provides the base and a `[0, 1)` float adds sub-millisecond entropy.
 *
 * @param date 時間來源，取其毫秒時間戳記 / the date whose millisecond timestamp is used
 * @param fnRandomFloat 產生 `[0,1)` 浮點的函式 / a function returning a `[0,1)` float
 * @returns 數值型種子 (Numeric Seed) / a numeric seed
 */
function seedFloatByDate(date, fnRandomFloat) {
  return date.valueOf() + (fnRandomFloat !== null && fnRandomFloat !== void 0 ? fnRandomFloat : originalMathRandom._MathRandom)();
}
/**
 * 以當下時間產生數值型種子 (Numeric Seed)，等同於 `seedFloatByDate(new Date(), fnRandomFloat)`。
 * Produces a numeric seed from the current time, equivalent to `seedFloatByDate(new Date(), fnRandomFloat)`.
 *
 * @param fnRandomFloat 產生 `[0,1)` 浮點的函式，省略時退回 `_MathRandom()` / a function returning a `[0,1)` float, defaults to `_MathRandom()`
 * @returns 數值型種子 (Numeric Seed) / a numeric seed
 */
function seedFloatByNow(fnRandomFloat) {
  return seedFloatByDate(new Date(), fnRandomFloat);
}
/**
 * 以指定時間 (Date) 產生字串型種子 (String Seed)：先取數值種子，再完整轉為字串，
 * 保留毫秒以下的小數資訊，避免只取整數毫秒時同毫秒內的呼叫互相碰撞。
 * Produces a string seed from a date, keeping the sub-millisecond fraction so calls within the same millisecond do not collide.
 *
 * @param date 時間來源 / the source date
 * @param fnRandomFloat 產生 `[0,1)` 浮點的函式，省略時退回 `_MathRandom()` / a function returning a `[0,1)` float, defaults to `_MathRandom()`
 * @returns 字串型種子 (String Seed) / a string seed
 */
function seedStringByDate(date, fnRandomFloat) {
  return floatToString.floatToString(seedFloatByDate(date, fnRandomFloat));
}
/**
 * 以當下時間產生字串型種子 (String Seed)，等同於 `seedStringByDate(new Date(), fnRandomFloat)`。
 * Produces a string seed from the current time, equivalent to `seedStringByDate(new Date(), fnRandomFloat)`.
 *
 * @param fnRandomFloat 產生 `[0,1)` 浮點的函式，省略時退回 `_MathRandom()` / a function returning a `[0,1)` float, defaults to `_MathRandom()`
 * @returns 字串型種子 (String Seed) / a string seed
 */
function seedStringByNow(fnRandomFloat) {
  return floatToString.floatToString(seedFloatByDate(new Date(), fnRandomFloat));
}

exports.seedFloatByDate = seedFloatByDate;
exports.seedFloatByNow = seedFloatByNow;
exports.seedStringByDate = seedStringByDate;
exports.seedStringByNow = seedStringByNow;
//# sourceMappingURL=index.cjs.development.cjs.map
