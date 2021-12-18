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
const MAX_SAFE_FLOAT = /*#__PURE__*/findMaxSafeFloat(1);

export { MAX_SAFE_FLOAT, findMaxSafeFloat as default, findMaxSafeFloat, isUnsafe };
//# sourceMappingURL=index.esm.mjs.map
