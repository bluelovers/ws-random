import { RNGCrypto as r } from "@lazy-random/generators-crypto";

import { RNGMathRandom2 as o } from "@lazy-random/generators-math-random2";

import { RNGSeedRandom as a } from "@lazy-random/generators-seedrandom";

import { RNG as t } from "@lazy-random/rng-abstract";

import { RNGXOR128 as n } from "@lazy-random/generators-xor128";

import { RNGFunction as e } from "@lazy-random/generators-function";

import { RNGMathRandom as m } from "@lazy-random/generators-math-random";

const c = {
  xor128: n,
  function: e,
  default: o,
  "math-random": m,
  "math-random2": o,
  seedrandom: a,
  crypto: r
};

function RNGFactory(...r) {
  const [o = "default", ...a] = r;
  switch (typeof o) {
   case "object":
    if (o instanceof t) return o;
    break;

   case "function":
    return new e(o);

   case "string":
    const r = c[o];
    if (r) return new r(...a);
  }
  throw new TypeError(`invalid RNG "${o}"`);
}

export { RNGFactory, RNGFactory as default };
//# sourceMappingURL=index.esm.mjs.map
