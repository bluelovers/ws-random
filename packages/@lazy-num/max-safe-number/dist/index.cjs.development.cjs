'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Returns whether basic arithmetic breaks between n and n+1, to a precision of `digits` after the decimal point
 *
 * @see https://stackoverflow.com/a/57225494/4563339
 */
function isUnsafe(n, digits) {
  // digits = 1 loops 10 times with 0.1 increases.
  // digits = 2 means 100 steps of 0.01, and so on.
  let prev = n;
  for (let i = 10 ** -digits; i < 1; i += 10 ** -digits) {
    if (n + i === prev) {
      // eg 10.2 === 10.1
      return true;
    }
    prev = n + i;
  }
  return false;
}
/**
 * Binary search between 0 and Number.MAX_SAFE_INTEGER (2**53 - 1) for the biggest number that is safe to the `digits` level of precision.
 * digits=9 took ~30s, I wouldn't pass anything bigger.
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
      // safe
      if (lastSafe + 1 === n) {
        // Closed in as far as possible
        console.log(`\n\nMax safe number to a precision of ${digits} digits after the decimal point: ${n}\t((MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1)\n\n`);
        return n;
      } else {
        lastSafe = n;
      }
    }
    n = Math.round((lastSafe + lastUnsafe) / 2);
  }
}
const MAX_SAFE_FLOAT = /*#__PURE__*/findMaxSafeFloat(1);

exports.MAX_SAFE_FLOAT = MAX_SAFE_FLOAT;
exports.default = findMaxSafeFloat;
exports.findMaxSafeFloat = findMaxSafeFloat;
exports.isUnsafe = isUnsafe;
//# sourceMappingURL=index.cjs.development.cjs.map
