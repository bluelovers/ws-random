function isUnsafe(e, a) {
  let t = e;
  for (let n = 10 ** -a; n < 1; n += 10 ** -a) {
    if (e + n === t) return !0;
    t = e + n;
  }
  return !1;
}

function findMaxSafeFloat(e, a = !1) {
  let t, n = Number.MAX_SAFE_INTEGER, f = 0;
  for (;;) {
    if (a && console.table({
      "": {
        n,
        "Relative to Number.MAX_SAFE_INTEGER": `(MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1`,
        lastSafe: f,
        lastUnsafe: t,
        "lastUnsafe - lastSafe": t - f
      }
    }), isUnsafe(n, e)) t = n; else {
      if (f + 1 === n) return console.log(`\n\nMax safe number to a precision of ${e} digits after the decimal point: ${n}\t((MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1)\n\n`), 
      n;
      f = n;
    }
    n = Math.round((f + t) / 2);
  }
}

const e = findMaxSafeFloat(1);

export { e as MAX_SAFE_FLOAT, findMaxSafeFloat as default, findMaxSafeFloat, isUnsafe };
//# sourceMappingURL=index.esm.mjs.map
