import { RNGFunction as a } from "@lazy-random/generators-function";

import { _MathRandom as o } from "@lazy-random/original-math-random";

class RNGMathRandom2 extends a {
  constructor(a = o, r, ...t) {
    super(a || o, r, ...t);
  }
  get name() {
    return "math-random2";
  }
}

export { RNGMathRandom2, RNGMathRandom2 as default };
//# sourceMappingURL=index.esm.mjs.map
