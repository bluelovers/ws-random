'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 判斷傳入值是否為零，涵蓋 `0` 與負零 (`-0`)。
 * Check whether the given value is zero, covering both `0` and negative zero (`-0`).
 *
 * @param val 任意待檢查的值 any value to check
 * @returns 型別守衛 (Type Guard)，成立時 `val` 為 `0` type guard, `val` is `0` when true
 */
function isZero(val) {
  return val === 0 || val === -0;
}
/**
 * 將負零 (`-0`) 正規化 (Normalize) 為 `0`，其餘值原樣回傳。
 * Normalize negative zero (`-0`) to `0`, returning all other values unchanged.
 *
 * @param val 待正規化的值 the value to normalize
 * @returns 與傳入值同型別的結果，`-0` 會變成 `0` the same type as input, with `-0` turned into `0`
 */
function fixZero(val) {
  // @ts-ignore
  return val === -0 ? 0 : val;
}

exports.default = isZero;
exports.fixZero = fixZero;
exports.isZero = isZero;
//# sourceMappingURL=index.cjs.development.cjs.map
