import { RNG as t } from "@lazy-random/rng-abstract";

import { randomSeedNum as s } from "@lazy-random/seed-token";

import { cloneClass as e } from "@lazy-random/clone-class";

class RNGXOR128 extends t {
  constructor(...t) {
    super(), this._init(...t), this.seed(this.x);
  }
  get name() {
    return "xor128";
  }
  get seedable() {
    return !0;
  }
  next() {
    const t = this.x ^ this.x << 1;
    return this.x = this.y, this.y = this.z, this.z = this.w, this.w = this.w ^ this.w >>> 19 ^ t ^ t >>> 8, 
    (this.w >>> 0) / 0x100000000;
  }
  seed(t, s, ...e) {
    this._seed(t, s, ...e);
    let i = 64;
    for (;i--; ) this.next();
  }
  clone(t, s, ...i) {
    return e(RNGXOR128, this, t, s, ...i);
  }
  _init(...t) {
    let [e = s(), i = s(), h = s(), r = s()] = t;
    this._seed(e, i, h, r);
  }
  _seed(...t) {
    let [s = this.x, e = this.y, i = this.z, h = this.w] = t;
    "number" != typeof s && (s = this._seedNum(s) || this.x), "number" != typeof e && (e = this.y), 
    "number" != typeof i && (i = this.z), "number" != typeof s && (h = this.w), this.x = s, 
    this.y = e, this.z = i, this.w = h;
  }
}

export { RNGXOR128, RNGXOR128 as default };
//# sourceMappingURL=index.esm.mjs.map
