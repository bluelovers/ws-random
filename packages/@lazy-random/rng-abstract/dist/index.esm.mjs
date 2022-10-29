import { randomSeedStr as r, seedToken as e, hashAny as t } from "@lazy-random/seed-token";

import { RNGCore as s } from "@lazy-random/rng-abstract-core";

class RNG extends s {
  static create(r, e, ...t) {
    if (this === RNG || this === s || !this) throw new ReferenceError("RNG is abstract class");
    return new this(r, e, ...t);
  }
  _seedNum(t, s, ...a) {
    return null != t && 0 !== t || (t = r()), e(t, s, ...a);
  }
  _seedStr(r, e, ...s) {
    return t(r, e, ...s);
  }
}

export { RNG, RNG as default };
//# sourceMappingURL=index.esm.mjs.map
