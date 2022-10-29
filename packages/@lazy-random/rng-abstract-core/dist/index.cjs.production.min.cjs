"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class RNGCore {
  constructor(e, r, ...t) {}
  _init_check(e, r, ...t) {}
  _init(e, r, ...t) {
    this._init_check(e, r, ...t);
  }
  static create(e, r, ...t) {
    if (this === RNGCore || !this) throw new ReferenceError("RNG is abstract class");
    return new this(e, r, ...t);
  }
  get name() {
    throw new Error("RNG.name must be overridden");
  }
  get options() {
    return null;
  }
  get seedable() {
    return null;
  }
  next() {
    throw new ReferenceError("RNG.next must be overridden");
  }
  seed(e, r, ...t) {}
  clone(e, r, ...t) {
    throw new ReferenceError("RNG.clone must be overridden");
  }
  _seedAuto(e, r, ...t) {
    return e && "number" == typeof e ? this._seedNum(e, r, ...t) : this._seedStr(e, r, ...t);
  }
  _seedNum(e, r, ...t) {
    throw new ReferenceError("RNG._seedNum must be overridden");
  }
  _seedStr(e, r, ...t) {
    throw new ReferenceError("RNG._seedStr must be overridden");
  }
}

exports.RNGCore = RNGCore, exports.default = RNGCore;
//# sourceMappingURL=index.cjs.production.min.cjs.map
