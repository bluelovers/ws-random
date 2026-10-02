'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// @ts-ignore

/**
 * 把任意回傳 0～1 的亂數 (Random Number) 函式包裝為 lib-r-math.js 的 IRNG 介面 (Interface)，
 * 使自訂的偽亂數發生器 (PRNG) 能取代 R 統計函式內部的亂數來源。
 *
 * Wraps an arbitrary 0~1 random number function into the IRNG interface of
 * lib-r-math.js, so a custom PRNG can act as the entropy source of R
 * statistical functions.
 *
 * @param fn 底層亂數函式，每次呼叫回傳一個 0～1 的亂數 / the underlying function returning one 0~1 random number
 * @returns 含 `unif_rand` 與 `internal_unif_rand` 的 IRNG 物件 / an IRNG object exposing `unif_rand` and `internal_unif_rand`
 */
function fakeLibRMathRng(fn) {
  /**
   * 依需求量產生亂數：lib-r-math.js 的實作會以參數 n 決定回傳單一值或陣列，
   * 因此這裡沿用相同的「大於 1 才回傳陣列」分支。
   *
   * Produces random values on demand: lib-r-math.js implementations decide
   * between a scalar and an array by the argument n, so this keeps the same
   * "array only when greater than 1" branching.
   *
   * @param n 要產生的亂數個數 / how many random numbers to produce
   * @returns n > 1 時回傳長度 n 的陣列，否則回傳單一亂數 / an array of length n when n > 1, otherwise a single random number
   *
   * TODO: 疑似邊界問題：n === 1 時會走單值分支回傳標量 (Scalar) 而非長度 1 的陣列，
   *       與一般「n 個元素回傳陣列」的期待可能不符；僅記錄不修改邏輯。
   *       Suspected edge case: n === 1 falls through to the scalar branch instead
   *       of a length-1 array; recorded here without changing the logic.
   */
  function unif_rand(n) {
    if (n > 1) {
      let a = [];
      while (n--) {
        a[n] = fn();
      }
      return a;
    }
    return fn();
  }
  return {
    // @ts-ignore
    unif_rand,
    internal_unif_rand: unif_rand
  };
}

exports.default = fakeLibRMathRng;
exports.fakeLibRMathRng = fakeLibRMathRng;
//# sourceMappingURL=index.cjs.development.cjs.map
