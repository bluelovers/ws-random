"use strict";

function isUnsafe(e, a) {
  let t = e;
  for (let f = 10 ** -a; f < 1; f += 10 ** -a) {
    if (e + f === t) return !0;
    t = e + f;
  }
  return !1;
}

function findMaxSafeFloat(e, a = !1) {
  let t, f = Number.MAX_SAFE_INTEGER, n = 0;
  for (;;) {
    if (a && console.table({
      "": {
        n: f,
        "Relative to Number.MAX_SAFE_INTEGER": `(MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (f + 1)} - 1`,
        lastSafe: n,
        lastUnsafe: t,
        "lastUnsafe - lastSafe": t - n
      }
    }), isUnsafe(f, e)) t = f; else {
      if (n + 1 === f) return console.log(`\n\nMax safe number to a precision of ${e} digits after the decimal point: ${f}\t((MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (f + 1)} - 1)\n\n`), 
      f;
      n = f;
    }
    f = Math.round((n + t) / 2);
  }
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MAX_SAFE_FLOAT = findMaxSafeFloat(1), exports.default = findMaxSafeFloat, 
exports.findMaxSafeFloat = findMaxSafeFloat, exports.isUnsafe = isUnsafe;
//# sourceMappingURL=index.cjs.production.min.cjs.map
