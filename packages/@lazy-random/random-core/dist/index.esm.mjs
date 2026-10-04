import { hashArgv as e } from "@lazy-random/shared-lib";

import r from "@lazy-random/distributions";

import { _assertInstanceOfRNG as t } from "@lazy-random/rng-abstract";

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
  _init(e, ...r) {
    e && t(e), this.use(e);
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
  use(e, ...r) {
    return t(e), this._rng = e, this;
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
    return this._memoize("byte", r.dfUniformByte, e);
  }
  bytes(e = 1, r) {
    return this.dfBytes(e, r)();
  }
  dfBytes(e = 1, t) {
    return this._memoize("bytes", r.dfUniformBytes, e, t);
  }
  randomBytes(e) {
    return Buffer.from(this.bytes(e));
  }
  dfRandomBytes(e) {
    let r = this.dfBytes(e);
    return this._memoize("dfRandomBytes", () => () => Buffer.from(r()), e);
  }
  charID(e, t) {
    return r.dfCharID(this, e, t)();
  }
  dfCharID(e, t) {
    return this._memoize("dfCharID", r.dfCharID, e, t);
  }
  uuidv4(e) {
    return this.dfUuidv4(e)();
  }
  dfUuidv4(e) {
    return this._memoize("uuidv4", r.dfUuidV4, e);
  }
  arrayIndex(e, r = 1, t = 0, n) {
    return this.dfArrayIndex(e, r, t, n)();
  }
  dfArrayIndex(e, t = 1, n = 0, i) {
    return this._memoizeFake("dfArrayIndex", r.dfArrayIndex, e, t, n, i);
  }
  arrayIndexOne(e, r = 0, t) {
    return this.dfArrayIndexOne(e, r, t)();
  }
  dfArrayIndexOne(e, t = 0, n) {
    return this._memoizeFake("dfArrayIndexOne", r.dfArrayIndexOne, e, t, n);
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
  arrayShuffle(e, t) {
    return this._memoizeFake("dfArrayShuffle", r.dfArrayShuffle, e, t)();
  }
  dfArrayShuffle(e, t) {
    return this._callDistributions(r.dfArrayShuffle, e, t);
  }
  arrayUnique(e, r, t, n, i) {
    return this.dfArrayUnique(e, r, t, n, i)();
  }
  dfArrayUnique(e, t, n, i, o) {
    return r.dfArrayUnique(this, e, t, n, i, o);
  }
  arrayFill(e, r, t, n) {
    return this.dfArrayFill(r, t, n)(e);
  }
  dfArrayFill(e, t, n) {
    return this._memoize("dfArrayFill", r.dfArrayFill, e, t, n);
  }
  dfUniform(e, t, n) {
    return this._memoize("dfUniform", r.dfUniformFloat, e, t, n);
  }
  dfUniformInt(e, t) {
    return this._memoize("dfUniformInt", r.dfUniformInt, e, t);
  }
  dfUniformBoolean(e) {
    return this._memoize("dfUniformBoolean", r.dfUniformBoolean, e);
  }
  dfNormal(e, t) {
    return r.dfNormal(this, e, t);
  }
  dfLogNormal(e, t) {
    return r.dfLogNormal(this, e, t);
  }
  dfBernoulli(e) {
    return r.dfBernoulli(this, e);
  }
  dfBinomial(e, t) {
    return r.dfBinomial(this, e, t);
  }
  dfGeometric(e) {
    return r.dfGeometric(this, e);
  }
  dfPoisson(e) {
    return r.dfPoisson(this, e);
  }
  dfExponential(e) {
    return r.dfExponential(this, e);
  }
  dfIrwinHall(e = 1) {
    return r.dfIrwinHall(this, e);
  }
  dfBates(e = 1) {
    return r.dfBates(this, e);
  }
  dfPareto(e = 1) {
    return r.dfPareto(this, e);
  }
  itemByWeight(e, r, ...t) {
    return this.dfItemByWeight(e, r, ...t)();
  }
  dfItemByWeight(e, t, ...n) {
    return this._callDistributions(r.dfItemByWeight, e, t, ...n);
  }
  itemByWeightUnique(e, r, t, ...n) {
    return this.dfItemByWeightUnique(e, r, t, ...n)();
  }
  dfItemByWeightUnique(e, t, n, ...i) {
    return this._callDistributions(r.dfItemByWeightUnique, e, t, n, ...i);
  }
  sumInt(e, r, t, n, i) {
    return this.dfSumInt(e, r, t, n, i)();
  }
  dfSumInt(e, t, n, i, o) {
    return this._memoize("sumInt", r.dfRandSumInt, e, t, n, i, o);
  }
  sumFloat(e, r, t, n, i) {
    return this.dfSumFloat(e, r, t, n, i)();
  }
  dfSumFloat(e, t, n, i, o) {
    return this._memoize("sumFloat", r.dfRandSumFloat, e, t, n, i, o);
  }
  _memoize(r, t, ...n) {
    const i = e(n);
    let o = this._cache[r];
    return void 0 !== o && o.key === i || (o = {
      key: i,
      distribution: t(this, ...n)
    }, this._cache[r] = o), o.distribution;
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

export { RandomCore, RandomCore as default };
//# sourceMappingURL=index.esm.mjs.map
