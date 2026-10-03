'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 依亂數產生器 (RNG) 回傳 `0 ～ len - 1` 的隨機索引 (Random Index)。
 * Return a random index from `0` to `len - 1` using the given RNG.
 *
 * 以 `Math.floor()` 取整，等機率 (Uniform) 切分 `[0, len)` 區間。
 * `Math.floor()` divides `[0, len)` into equal-probability buckets.
 *
 * @param random 實作 `IRNGLike` 的亂數產生器 / An RNG implementing `IRNGLike`
 * @param len 索引長度，通常為陣列 (Array) 長度 / The index length, usually an array length
 * @returns 隨機索引 / A random index
 */
function randIndex(random, len) {
  return Math.floor(random.next() * len);
}
/**
 * 在 `[start, end)` 區間內回傳取整後的隨機索引 (Random Index)。
 * Return a floored random index within `[start, end)`.
 *
 * 與 `randIndex()` 的差別在於支援任意起訖，方便做區間抽樣 (Range Sampling)。
 * Unlike `randIndex()`, this accepts arbitrary bounds for range sampling.
 *
 * @param random 實作 `IRNGLike` 的亂數產生器 / An RNG implementing `IRNGLike`
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 取整後的隨機索引 / A floored random index
 */
function randIndexWithRange(random, start, end) {
  return Math.floor(float(random, start, end));
}
/**
 * 回傳 `[min, max)` 區間內的浮點數 (Float)。
 * Return a float within the `[min, max)` range.
 *
 * 先以 `max - min` 決定跨度 (Span)，再平移至 `min`，可處理負數與非零下界。
 * Scales by `max - min` then offsets by `min`, supporting negative values and non-zero lower bounds.
 *
 * @param random 實作 `IRNGLike` 的亂數產生器 / An RNG implementing `IRNGLike`
 * @param min 下界 (Lower Bound)，含於結果 / Lower bound, included
 * @param max 上界 (Upper Bound)，不含於結果 / Upper bound, excluded
 * @returns 區間內的浮點數 / A float within the range
 */
function float(random, min, max) {
  return random.next() * (max - min) + min;
}
/**
 * 回傳 `[min, max]`（含端點，Inclusive）區間內的整數 (Integer)。
 * Return an integer in the inclusive range `[min, max]`.
 *
 * 以 `max + 1` 轉成半開區間 (Half-open Interval) 後取整，確保上界也能被抽中。
 * Shifts to a half-open interval with `max + 1` so the upper bound can be drawn as well.
 *
 * @param random 實作 `IRNGLike` 的亂數產生器 / An RNG implementing `IRNGLike`
 * @param min 下界 (Lower Bound)，含於結果 / Lower bound, included
 * @param max 上界 (Upper Bound)，含於結果 / Upper bound, included
 * @returns 區間內的整數 / An integer within the range
 */
function int(random, min, max) {
  return randIndexWithRange(random, min, max + 1);
}

const UtilDistributions = {
  randIndex,
  randIndexWithRange,
  float,
  int
};

exports.default = UtilDistributions;
exports.float = float;
exports.int = int;
exports.randIndex = randIndex;
exports.randIndexWithRange = randIndexWithRange;
//# sourceMappingURL=index.cjs.development.cjs.map
