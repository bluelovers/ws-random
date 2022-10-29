import { expect as t } from "@lazy-random/expect";

const o = [ 0.0, 0.0, 0.69314718055994529, 1.7917594692280550, 3.1780538303479458, 4.7874917427820458, 6.5792512120101012, 8.5251613610654147, 10.604602902745251, 12.801827480081469 ], logFactorial = t => o[t];

function dfPoisson(o, n = 1) {
  if (t(n).gt(0), n < 10) {
    const t = Math.exp(-n);
    return () => {
      let r = t, e = 0, s = o.next();
      for (;s > r; ) s -= r, r = n * r / ++e;
      return e;
    };
  }
  {
    const t = Math.sqrt(n), r = 0.931 + 2.53 * t, e = 0.02483 * r - 0.059, s = 1.1239 + 1.1328 / (r - 3.4), a = 0.9277 - 3.6224 / (r - 2);
    return () => {
      for (;;) {
        let f, i = o.next();
        if (i <= 0.86 * a) return f = i / a - 0.43, Math.floor((2 * e / (0.5 - Math.abs(f)) + r) * f + n + 0.445);
        i >= a ? f = o.next() - 0.5 : (f = i / a - 0.93, f = (f < 0 ? -0.5 : 0.5) - f, i = o.next() * a);
        const l = 0.5 - Math.abs(f);
        if (l < 0.013 && i > l) continue;
        const h = Math.floor((2 * e / l + r) * f + n + 0.445);
        if (i = i * s / (e / (l * l) + r), h >= 10) {
          const o = (h + 0.5) * Math.log(n / h) - n - .9189385332046727 + h - (1 / 12.0 - (1 / 360.0 - 1 / (1260.0 * h * h)) / (h * h)) / h;
          if (Math.log(i * t) <= o) return h;
        } else if (h >= 0 && Math.log(i) <= h * Math.log(n) - n - logFactorial(h)) return h;
      }
    };
  }
}

export { dfPoisson as default, dfPoisson };
//# sourceMappingURL=index.esm.mjs.map
