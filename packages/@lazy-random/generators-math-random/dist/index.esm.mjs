import { cloneClass as a } from "@lazy-random/clone-class";

import { _MathRandom as r } from "@lazy-random/original-math-random";

import { RNGCore as t } from "@lazy-random/rng-abstract-core";

class RNGMathRandom extends t {
  get name() {
    return "math-random";
  }
  get seedable() {
    return !1;
  }
  next() {
    return r();
  }
  clone(r, t, ...n) {
    return a(RNGMathRandom, this, r, t, ...n);
  }
}

export { RNGMathRandom, RNGMathRandom as default };
//# sourceMappingURL=index.esm.mjs.map
