'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 檢查 n 與 n+1 之間的基本運算是否已失效（精度不足以區分相鄰數值），精確到小數點後 `digits` 位
 *
 * Check whether basic arithmetic breaks between n and n+1, meaning the value
 * can no longer be distinguished from its neighbour, to a precision of `digits`
 * after the decimal point
 *
 * @param n 要檢查的數值 / the number to check
 * @param digits 小數位數，決定累加步進 10 ** -digits / fraction digits, which set the step 10 ** -digits
 * @returns 是否不安全 / whether n is unsafe at this precision
 *
 * @see https://stackoverflow.com/a/57225494/4563339
 */
function isUnsafe(n, digits) {
  let prev = n;
  for (let i = 10 ** -digits; i < 1; i += 10 ** -digits) {
    if (n + i === prev) {
      return true;
    }
    prev = n + i;
  }
  return false;
}
/**
 * 在 0 與 Number.MAX_SAFE_INTEGER（2**53 - 1）之間以二分搜尋找出在 `digits` 位精度下最大的安全數值
 *
 * Binary search between 0 and Number.MAX_SAFE_INTEGER (2**53 - 1) for the biggest number that is safe to the `digits` level of precision.
 * digits=9 took ~30s, I wouldn't pass anything bigger.
 *
 * @param digits 小數位數 / fraction digits
 * @param log 是否以 console.table() 輸出每次搜尋狀態 / whether to print each search step with console.table()
 * @returns 該精度下最大的安全數值 / the biggest safe number at this precision
 *
 * TODO: digits <= 0 時 isUnsafe() 恆為 false，lastUnsafe 會保持 undefined，n 隨後變成 NaN 而讓迴圈無限執行
 * TODO: 若搜尋先收斂到 lastSafe 與 lastUnsafe 相鄰、且下一個 n 落在不安全側，Math.round() 會反覆取到同一值而無法收斂
 *
 * @see https://stackoverflow.com/a/57225494/4563339
 */
function findMaxSafeFloat(digits, log = false) {
  let n = Number.MAX_SAFE_INTEGER;
  let lastSafe = 0;
  let lastUnsafe = undefined;
  while (true) {
    if (log) {
      console.table({
        '': {
          n,
          'Relative to Number.MAX_SAFE_INTEGER': `(MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1`,
          lastSafe,
          lastUnsafe,
          'lastUnsafe - lastSafe': lastUnsafe - lastSafe
        }
      });
    }
    if (isUnsafe(n, digits)) {
      lastUnsafe = n;
    } else {
      if (lastSafe + 1 === n) {
        console.log(`\n\nMax safe number to a precision of ${digits} digits after the decimal point: ${n}\t((MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1)\n\n`);
        return n;
      } else {
        lastSafe = n;
      }
    }
    n = Math.round((lastSafe + lastUnsafe) / 2);
  }
}
/**
 * digits = 1 時的最大安全數值
 *
 * The max safe value found for digits = 1
 *
 * @remarks 模組載入時即執行一次二分搜尋並 console.log() 輸出結果，import 本套件即會在 console 多出一行文字
 * Computed at module load with one binary search and a console.log(), so
 * importing this package prints an extra line to the console
 */
const MAX_SAFE_FLOAT = /*#__PURE__*/findMaxSafeFloat(1);

exports.MAX_SAFE_FLOAT = MAX_SAFE_FLOAT;
exports.default = findMaxSafeFloat;
exports.findMaxSafeFloat = findMaxSafeFloat;
exports.isUnsafe = isUnsafe;
//# sourceMappingURL=index.cjs.development.cjs.map
