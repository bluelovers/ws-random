"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = require("@lazy-random/expect");

const e = [ 0.0, 0.0, 0.69314718055994529, 1.7917594692280550, 3.1780538303479458, 4.7874917427820458, 6.5792512120101012, 8.5251613610654147, 10.604602902745251, 12.801827480081469 ], logFactorial = t => e[t];

function dfPoisson(e, o = 1) {
  if (t.expect(o).gt(0), o < 10) {
    const t = Math.exp(-o);
    return () => {
      let r = t, n = 0, s = e.next();
      for (;s > r; ) s -= r, r = o * r / ++n;
      return n;
    };
  }
  {
    const t = Math.sqrt(o), r = 0.931 + 2.53 * t, n = 0.02483 * r - 0.059, s = 1.1239 + 1.1328 / (r - 3.4), a = 0.9277 - 3.6224 / (r - 2);
    return () => {
      for (;;) {
        let f, i = e.next();
        if (i <= 0.86 * a) return f = i / a - 0.43, Math.floor((2 * n / (0.5 - Math.abs(f)) + r) * f + o + 0.445);
        i >= a ? f = e.next() - 0.5 : (f = i / a - 0.93, f = (f < 0 ? -0.5 : 0.5) - f, i = e.next() * a);
        const l = 0.5 - Math.abs(f);
        if (l < 0.013 && i > l) continue;
        const u = Math.floor((2 * n / l + r) * f + o + 0.445);
        if (i = i * s / (n / (l * l) + r), u >= 10) {
          const e = (u + 0.5) * Math.log(o / u) - o - .9189385332046727 + u - (1 / 12.0 - (1 / 360.0 - 1 / (1260.0 * u * u)) / (u * u)) / u;
          if (Math.log(i * t) <= e) return u;
        } else if (u >= 0 && Math.log(i) <= u * Math.log(o) - o - logFactorial(u)) return u;
      }
    };
  }
}

exports.default = dfPoisson, exports.dfPoisson = dfPoisson;
//# sourceMappingURL=index.cjs.production.min.cjs.map
