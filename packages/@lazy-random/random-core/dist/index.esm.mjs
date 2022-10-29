import { __decorate as t, __metadata as r } from "tslib";

import { expect as e } from "@lazy-random/expect";

import { deprecate as n, autobind as i } from "core-decorators";

import { hashArgv as o } from "@lazy-random/shared-lib";

import s from "@lazy-random/distributions";

import { RNG as d } from "@lazy-random/rng-abstract";

let a = class RandomCore {
  _cache={};
  constructor(t, ...r) {
    this._init(t, ...r);
  }
  _init(t, ...r) {
    t && e(t).instanceof(d), this.use(t);
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
  seed(...t) {
    return this._rng.seed(...t), this;
  }
  get srandom() {
    return this.srand;
  }
  srand(...t) {
    return this.seed(...t).next();
  }
  clone(t, ...r) {
    throw new Error("not implemented");
  }
  use(t, ...r) {
    return e(t).instanceof(d), this._rng = t, this;
  }
  newUse(t, ...r) {
    throw new Error("not implemented");
  }
  cloneUse(t, ...r) {
    throw new Error("not implemented");
  }
  patch() {
    if (this._patch) throw new Error("Math.random already patched");
    this._patch = Math.random, Math.random = this.dfUniform();
  }
  unpatch() {
    this._patch && (Math.random = this._patch, delete this._patch);
  }
  next() {
    return this._rng.next();
  }
  float(t, r, e) {
    return this.dfUniform(t, r, e)();
  }
  int(t = 100, r) {
    return this.dfUniformInt(t, r)();
  }
  integer(t, r) {
    return this.int(t, r);
  }
  bool(t) {
    return this.boolean(t);
  }
  boolean(t) {
    return this.dfUniformBoolean(t)();
  }
  byte(t) {
    return this.dfByte(t)();
  }
  dfByte(t) {
    return this._memoize("byte", s.dfUniformByte, t);
  }
  bytes(t = 1, r) {
    return this.dfBytes(t, r)();
  }
  dfBytes(t = 1, r) {
    return this._memoize("bytes", s.dfUniformBytes, t, r);
  }
  randomBytes(t) {
    return Buffer.from(this.bytes(t));
  }
  dfRandomBytes(t) {
    let r = this.dfBytes(t);
    return this._memoize("dfRandomBytes", (() => () => Buffer.from(r())), t);
  }
  charID(t, r) {
    return s.dfCharID(this, t, r)();
  }
  dfCharID(t, r) {
    return this._memoize("dfCharID", s.dfCharID, t, r);
  }
  uuidv4(t) {
    return this.dfUuidv4(t)();
  }
  dfUuidv4(t) {
    return this._memoize("uuidv4", s.dfUuidV4, t);
  }
  arrayIndex(t, r = 1, e = 0, n) {
    return this.dfArrayIndex(t, r, e, n)();
  }
  dfArrayIndex(t, r = 1, e = 0, n) {
    return this._memoizeFake("dfArrayIndex", s.dfArrayIndex, t, r, e, n);
  }
  arrayItem(t, r = 1, e = 0, n) {
    return this.arrayIndex(t, r, e, n).reduce((function(r, e) {
      return r.push(t[e]), r;
    }), []);
  }
  arrayShuffle(t, r) {
    return this._memoizeFake("dfArrayShuffle", s.dfArrayShuffle, t, r)();
  }
  dfArrayShuffle(t, r) {
    return this._callDistributions(s.dfArrayShuffle, t, r);
  }
  arrayUnique(t, r, e, n, i) {
    return this.dfArrayUnique(t, r, e, n, i)();
  }
  dfArrayUnique(t, r, e, n, i) {
    return s.dfArrayUnique(this, t, r, e, n, i);
  }
  arrayFill(t, r, e, n) {
    return this.dfArrayFill(r, e, n)(t);
  }
  dfArrayFill(t, r, e) {
    return this._memoize("dfArrayFill", s.dfArrayFill, t, r, e);
  }
  dfUniform(t, r, e) {
    return this._memoize("dfUniform", s.dfUniformFloat, t, r, e);
  }
  dfUniformInt(t, r) {
    return this._memoize("dfUniformInt", s.dfUniformInt, t, r);
  }
  dfUniformBoolean(t) {
    return this._memoize("dfUniformBoolean", s.dfUniformBoolean, t);
  }
  dfNormal(t, r) {
    return s.dfNormal(this, t, r);
  }
  dfLogNormal(t, r) {
    return s.dfLogNormal(this, t, r);
  }
  dfBernoulli(t) {
    return s.dfBernoulli(this, t);
  }
  dfBinomial(t, r) {
    return s.dfBinomial(this, t, r);
  }
  dfGeometric(t) {
    return s.dfGeometric(this, t);
  }
  dfPoisson(t) {
    return s.dfPoisson(this, t);
  }
  dfExponential(t) {
    return s.dfExponential(this, t);
  }
  dfIrwinHall(t = 1) {
    return s.dfIrwinHall(this, t);
  }
  dfBates(t = 1) {
    return s.dfBates(this, t);
  }
  dfPareto(t = 1) {
    return s.dfPareto(this, t);
  }
  itemByWeight(t, r, ...e) {
    return this.dfItemByWeight(t, r, ...e)();
  }
  dfItemByWeight(t, r, ...e) {
    return this._callDistributions(s.dfItemByWeight, t, r, ...e);
  }
  itemByWeightUnique(t, r, e, ...n) {
    return this.dfItemByWeightUnique(t, r, e, ...n)();
  }
  dfItemByWeightUnique(t, r, e, ...n) {
    return this._callDistributions(s.dfItemByWeightUnique, t, r, e, ...n);
  }
  sumInt(t, r, e, n, i) {
    return this.dfSumInt(t, r, e, n, i)();
  }
  dfSumInt(t, r, e, n, i) {
    return this._memoize("sumInt", s.dfRandSumInt, t, r, e, n, i);
  }
  sumFloat(t, r, e, n, i) {
    return this.dfSumFloat(t, r, e, n, i)();
  }
  dfSumFloat(t, r, e, n, i) {
    return this._memoize("sumFloat", s.dfRandSumFloat, t, r, e, n, i);
  }
  _memoize(t, r, ...e) {
    const n = o(e);
    let i = this._cache[t];
    return void 0 !== i && i.key === n || (i = {
      key: n,
      distribution: r(this, ...e)
    }, this._cache[t] = i), i.distribution;
  }
  _memoizeFake(t, r, ...e) {
    return r(this, ...e);
  }
  _callDistributions(t, ...r) {
    return t(this, ...r);
  }
  reset() {
    return this._cache = {}, this;
  }
  get [Symbol.toStringTag]() {
    var t;
    return null === (t = this._rng) || void 0 === t ? void 0 : t.name;
  }
};

t([ n("not recommended use"), r("design:type", Function), r("design:paramtypes", []), r("design:returntype", void 0) ], a.prototype, "patch", null), 
t([ n("not recommended use"), r("design:type", Function), r("design:paramtypes", []), r("design:returntype", void 0) ], a.prototype, "unpatch", null), 
a = t([ i, r("design:paramtypes", [ Object, Object ]) ], a);

var f = a;

export { a as RandomCore, f as default };
//# sourceMappingURL=index.esm.mjs.map
