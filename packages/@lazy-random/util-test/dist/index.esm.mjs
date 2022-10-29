import { simpleWrap as n } from "@lazy-random/simple-wrap";

import { _MathRandom as r } from "@lazy-random/original-math-random";

import { RNGFactory as o } from "@lazy-random/rng-factory";

export { RNGFactory as newRngFactory } from "@lazy-random/rng-factory";

import a from "seedrandom";

function newRngMathRandom() {
  return n(r);
}

function newRngSeedRandom() {
  return o(a("ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk"));
}

export { newRngMathRandom, newRngSeedRandom };
//# sourceMappingURL=index.esm.mjs.map
