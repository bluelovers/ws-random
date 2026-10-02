"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/expect"), r = require("@lazy-random/shared-lib"), t = require("@lazy-random/distributions"), n = require("@lazy-random/rng-abstract");

function deprecateWarning(e, r) {
  "undefined" != typeof console && "function" == typeof console.warn && console.warn(`DEPRECATION WARNING: '${e}' is deprecated. ${r}.`);
}

class RandomCore {
  _cache={};
  constructor(e, ...r) {
    !function autoBindMethods(e) {
      const r = new Set;
      let t = Object.getPrototypeOf(e);
      for (;t && t !== Object.prototype; ) {
        for (const n of Object.getOwnPropertyNames(t)) {
          if ("constructor" === n || r.has(n)) continue;
          r.add(n);
          const i = Object.getOwnPropertyDescriptor(t, n);
          i && "function" == typeof i.value && Object.defineProperty(e, n, {
            configurable: !0,
            enumerable: i.enumerable,
            writable: !0,
            value: i.value.bind(e)
          });
        }
        t = Object.getPrototypeOf(t);
      }
    }(this), this._init(e, ...r);
  }
  _init(r, ...t) {
    r && e.expect(r).instanceof(n.RNG), this.use(r);
  }
  get rng() {
    return this._rng;
  }
  get seedable() {
    return this._rng.seedable;
  }
  get random() {
    return this.next;
  }
  get rand() {
    return this.next;
  }
  seed(...e) {
    return this._rng.seed(...e), this;
  }
  get srandom() {
    return this.srand;
  }
  srand(...e) {
    return this.seed(...e).next();
  }
  clone(e, ...r) {
    throw new Error("not implemented");
  }
  use(r, ...t) {
    return e.expect(r).instanceof(n.RNG), this._rng = r, this;
  }
  newUse(e, ...r) {
    throw new Error("not implemented");
  }
  cloneUse(e, ...r) {
    throw new Error("not implemented");
  }
  patch() {
    if (deprecateWarning("patch", "not recommended use"), this._patch) throw new Error("Math.random already patched");
    this._patch = Math.random, Math.random = this.dfUniform();
  }
  unpatch() {
    deprecateWarning("unpatch", "not recommended use"), this._patch && (Math.random = this._patch, 
    delete this._patch);
  }
  next() {
    return this._rng.next();
  }
  float(e, r, t) {
    return this.dfUniform(e, r, t)();
  }
  int(e = 100, r) {
    return this.dfUniformInt(e, r)();
  }
  integer(e, r) {
    return this.int(e, r);
  }
  bool(e) {
    return this.boolean(e);
  }
  boolean(e) {
    return this.dfUniformBoolean(e)();
  }
  byte(e) {
    return this.dfByte(e)();
  }
  dfByte(e) {
    return this._memoize("byte", t.dfUniformByte, e);
  }
  bytes(e = 1, r) {
    return this.dfBytes(e, r)();
  }
  dfBytes(e = 1, r) {
    return this._memoize("bytes", t.dfUniformBytes, e, r);
  }
  randomBytes(e) {
    return Buffer.from(this.bytes(e));
  }
  dfRandomBytes(e) {
    let r = this.dfBytes(e);
    return this._memoize("dfRandomBytes", () => () => Buffer.from(r()), e);
  }
  charID(e, r) {
    return t.dfCharID(this, e, r)();
  }
  dfCharID(e, r) {
    return this._memoize("dfCharID", t.dfCharID, e, r);
  }
  uuidv4(e) {
    return this.dfUuidv4(e)();
  }
  dfUuidv4(e) {
    return this._memoize("uuidv4", t.dfUuidV4, e);
  }
  arrayIndex(e, r = 1, t = 0, n) {
    return this.dfArrayIndex(e, r, t, n)();
  }
  dfArrayIndex(e, r = 1, n = 0, i) {
    return this._memoizeFake("dfArrayIndex", t.dfArrayIndex, e, r, n, i);
  }
  arrayIndexOne(e, r = 1, t = 0, n) {
    return this.dfArrayIndexOne(e, t, n)();
  }
  dfArrayIndexOne(e, r = 0, n) {
    return this._memoizeFake("dfArrayIndexOne", t.dfArrayIndexOne, e, r, n);
  }
  arrayItem(e, r = 1, t = 0, n) {
    return this.dfArrayItem(e, r, t, n)();
  }
  dfArrayItem(e, r = 1, t = 0, n) {
    const i = this.dfArrayIndex(e, r, t, n);
    return () => i().reduce(function(r, t) {
      return r.push(e[t]), r;
    }, []);
  }
  arrayItemOne(e, r = 0, t) {
    return this.dfArrayItemOne(e, r, t)();
  }
  dfArrayItemOne(e, r = 0, t) {
    const n = this.dfArrayIndexOne(e, r, t);
    return () => e[n()];
  }
  arrayShuffle(e, r) {
    return this._memoizeFake("dfArrayShuffle", t.dfArrayShuffle, e, r)();
  }
  dfArrayShuffle(e, r) {
    return this._callDistributions(t.dfArrayShuffle, e, r);
  }
  arrayUnique(e, r, t, n, i) {
    return this.dfArrayUnique(e, r, t, n, i)();
  }
  dfArrayUnique(e, r, n, i, o) {
    return t.dfArrayUnique(this, e, r, n, i, o);
  }
  arrayFill(e, r, t, n) {
    return this.dfArrayFill(r, t, n)(e);
  }
  dfArrayFill(e, r, n) {
    return this._memoize("dfArrayFill", t.dfArrayFill, e, r, n);
  }
  dfUniform(e, r, n) {
    return this._memoize("dfUniform", t.dfUniformFloat, e, r, n);
  }
  dfUniformInt(e, r) {
    return this._memoize("dfUniformInt", t.dfUniformInt, e, r);
  }
  dfUniformBoolean(e) {
    return this._memoize("dfUniformBoolean", t.dfUniformBoolean, e);
  }
  dfNormal(e, r) {
    return t.dfNormal(this, e, r);
  }
  dfLogNormal(e, r) {
    return t.dfLogNormal(this, e, r);
  }
  dfBernoulli(e) {
    return t.dfBernoulli(this, e);
  }
  dfBinomial(e, r) {
    return t.dfBinomial(this, e, r);
  }
  dfGeometric(e) {
    return t.dfGeometric(this, e);
  }
  dfPoisson(e) {
    return t.dfPoisson(this, e);
  }
  dfExponential(e) {
    return t.dfExponential(this, e);
  }
  dfIrwinHall(e = 1) {
    return t.dfIrwinHall(this, e);
  }
  dfBates(e = 1) {
    return t.dfBates(this, e);
  }
  dfPareto(e = 1) {
    return t.dfPareto(this, e);
  }
  itemByWeight(e, r, ...t) {
    return this.dfItemByWeight(e, r, ...t)();
  }
  dfItemByWeight(e, r, ...n) {
    return this._callDistributions(t.dfItemByWeight, e, r, ...n);
  }
  itemByWeightUnique(e, r, t, ...n) {
    return this.dfItemByWeightUnique(e, r, t, ...n)();
  }
  dfItemByWeightUnique(e, r, n, ...i) {
    return this._callDistributions(t.dfItemByWeightUnique, e, r, n, ...i);
  }
  sumInt(e, r, t, n, i) {
    return this.dfSumInt(e, r, t, n, i)();
  }
  dfSumInt(e, r, n, i, o) {
    return this._memoize("sumInt", t.dfRandSumInt, e, r, n, i, o);
  }
  sumFloat(e, r, t, n, i) {
    return this.dfSumFloat(e, r, t, n, i)();
  }
  dfSumFloat(e, r, n, i, o) {
    return this._memoize("sumFloat", t.dfRandSumFloat, e, r, n, i, o);
  }
  _memoize(e, t, ...n) {
    const i = r.hashArgv(n);
    let o = this._cache[e];
    return void 0 !== o && o.key === i || (o = {
      key: i,
      distribution: t(this, ...n)
    }, this._cache[e] = o), o.distribution;
  }
  _memoizeFake(e, r, ...t) {
    return r(this, ...t);
  }
  _callDistributions(e, ...r) {
    return e(this, ...r);
  }
  reset() {
    return this._cache = {}, this;
  }
  get [Symbol.toStringTag]() {
    var e;
    return null === (e = this._rng) || void 0 === e ? void 0 : e.name;
  }
}

exports.RandomCore = RandomCore, exports.default = RandomCore;
//# sourceMappingURL=index.cjs.production.min.cjs.map
