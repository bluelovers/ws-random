"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var r = require("@lazy-random/generators-crypto"), e = require("@lazy-random/generators-math-random2"), a = require("@lazy-random/generators-seedrandom"), o = require("@lazy-random/rng-abstract"), n = require("@lazy-random/generators-xor128"), t = require("@lazy-random/generators-function"), d = require("@lazy-random/generators-math-random");

const c = {
  xor128: n.RNGXOR128,
  function: t.RNGFunction,
  default: e.RNGMathRandom2,
  "math-random": d.RNGMathRandom,
  "math-random2": e.RNGMathRandom2,
  seedrandom: a.RNGSeedRandom,
  crypto: r.RNGCrypto
};

function RNGFactory(...r) {
  const [e = "default", ...a] = r;
  switch (typeof e) {
   case "object":
    if (e instanceof o.RNG) return e;
    break;

   case "function":
    return new t.RNGFunction(e);

   case "string":
    const r = c[e];
    if (r) return new r(...a);
  }
  throw new TypeError(`invalid RNG "${e}"`);
}

exports.RNGFactory = RNGFactory, exports.default = RNGFactory;
//# sourceMappingURL=index.cjs.production.min.cjs.map
