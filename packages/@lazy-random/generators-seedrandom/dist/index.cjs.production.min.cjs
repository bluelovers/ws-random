"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/generators-function"), t = require("seedrandom"), s = require("@lazy-random/clone-class");

const r = Object.freeze({
  entropy: !0
});

class RNGSeedRandom extends e.RNGFunction {
  _seedable=!0;
  constructor(e, t, ...s) {
    super(e, t, ...s);
  }
  static createLib(...e) {
    return new this(e[1], e[2], e[0], ...e.slice(3));
  }
  static create(...e) {
    return new this(...e);
  }
  _init_check(e, t, ...s) {}
  _init(e, t, ...s) {
    this._opts = this._opts || Object.assign({}, r), this._seedrandom = this.__generator(...s), 
    super._init(e, t, ...s);
  }
  _NAME="seedrandom";
  _TYPE=null;
  get name() {
    return `${this._NAME}${this._TYPE ? ":" + this._TYPE : ""}`;
  }
  __generator(e) {
    if (e && "string" == typeof e) switch (this._TYPE = null, e) {
     case "alea":
     case "tychei":
     case "xor128":
     case "xor4096":
     case "xorshift7":
     case "xorwow":
      this._TYPE = e = t[e];
      break;

     default:
      if (!e.includes("..") && /^[a-z\-\.]+$/i.test(e)) {
        this._TYPE = e, e = require(`seedrandom/lib/${e}`);
        break;
      }
      throw new RangeError(`unknow seedrandom lib name: ${e}`);
    } else this._TYPE = e ? e.name : null;
    return e || t;
  }
  get options() {
    return this._opts;
  }
  get state() {
    const e = this._rng.state;
    if ("function" == typeof e) return e();
  }
  seed(e, t, ...s) {
    this._opts = null === t ? void 0 : t || this._opts, this._rng = this._seedrandom(this._seedAuto(e), this._opts, ...s);
  }
  clone(e, t, ...r) {
    return s.cloneClass(RNGSeedRandom, this, e, t, ...r);
  }
}

exports.RNGSeedRandom = RNGSeedRandom, exports.default = RNGSeedRandom, exports.defaultOptions = r;
//# sourceMappingURL=index.cjs.production.min.cjs.map
