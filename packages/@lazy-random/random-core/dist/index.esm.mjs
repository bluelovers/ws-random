import { __decorate as r, __metadata as t } from "tslib";

import { expect as e } from "@lazy-random/expect";

import { deprecate as n, autobind as i } from "core-decorators";

import { hashArgv as d } from "@lazy-random/shared-lib";

import o from "@lazy-random/distributions";

import { RNG as s } from "@lazy-random/rng-abstract";

let a = class RandomCore {
  _cache={};
  constructor(r, ...t) {
    this._init(r, ...t);
  }
  _init(r, ...t) {
    r && e(r).instanceof(s), this.use(r);
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
  seed(...r) {
    return this._rng.seed(...r), this;
  }
  get srandom() {
    return this.srand;
  }
  srand(...r) {
    return this.seed(...r).next();
  }
  clone(r, ...t) {
    throw new Error("not implemented");
  }
  use(r, ...t) {
    return e(r).instanceof(s), this._rng = r, this;
  }
  newUse(r, ...t) {
    throw new Error("not implemented");
  }
  cloneUse(r, ...t) {
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
  float(r, t, e) {
    return this.dfUniform(r, t, e)();
  }
  int(r = 100, t) {
    return this.dfUniformInt(r, t)();
  }
  integer(r, t) {
    return this.int(r, t);
  }
  bool(r) {
    return this.boolean(r);
  }
  boolean(r) {
    return this.dfUniformBoolean(r)();
  }
  byte(r) {
    return this.dfByte(r)();
  }
  dfByte(r) {
    return this._memoize("byte", o.dfUniformByte, r);
  }
  bytes(r = 1, t) {
    return this.dfBytes(r, t)();
  }
  dfBytes(r = 1, t) {
    return this._memoize("bytes", o.dfUniformBytes, r, t);
  }
  randomBytes(r) {
    return Buffer.from(this.bytes(r));
  }
  dfRandomBytes(r) {
    let t = this.dfBytes(r);
    return this._memoize("dfRandomBytes", (() => () => Buffer.from(t())), r);
  }
  charID(r, t) {
    return o.dfCharID(this, r, t)();
  }
  dfCharID(r, t) {
    return this._memoize("dfCharID", o.dfCharID, r, t);
  }
  uuidv4(r) {
    return this.dfUuidv4(r)();
  }
  dfUuidv4(r) {
    return this._memoize("uuidv4", o.dfUuidV4, r);
  }
  arrayIndex(r, t = 1, e = 0, n) {
    return this.dfArrayIndex(r, t, e, n)();
  }
  dfArrayIndex(r, t = 1, e = 0, n) {
    return this._memoizeFake("dfArrayIndex", o.dfArrayIndex, r, t, e, n);
  }
  arrayIndexOne(r, t = 1, e = 0, n) {
    return this.dfArrayIndexOne(r, e, n)();
  }
  dfArrayIndexOne(r, t = 0, e) {
    return this._memoizeFake("dfArrayIndexOne", o.dfArrayIndexOne, r, t, e);
  }
  arrayItem(r, t = 1, e = 0, n) {
    return this.dfArrayItem(r, t, e, n)();
  }
  dfArrayItem(r, t = 1, e = 0, n) {
    const i = this.dfArrayIndex(r, t, e, n);
    return () => i().reduce((function(t, e) {
      return t.push(r[e]), t;
    }), []);
  }
  arrayItemOne(r, t = 0, e) {
    return this.dfArrayItemOne(r, t, e)();
  }
  dfArrayItemOne(r, t = 0, e) {
    const n = this.dfArrayIndexOne(r, t, e);
    return () => r[n()];
  }
  arrayShuffle(r, t) {
    return this._memoizeFake("dfArrayShuffle", o.dfArrayShuffle, r, t)();
  }
  dfArrayShuffle(r, t) {
    return this._callDistributions(o.dfArrayShuffle, r, t);
  }
  arrayUnique(r, t, e, n, i) {
    return this.dfArrayUnique(r, t, e, n, i)();
  }
  dfArrayUnique(r, t, e, n, i) {
    return o.dfArrayUnique(this, r, t, e, n, i);
  }
  arrayFill(r, t, e, n) {
    return this.dfArrayFill(t, e, n)(r);
  }
  dfArrayFill(r, t, e) {
    return this._memoize("dfArrayFill", o.dfArrayFill, r, t, e);
  }
  dfUniform(r, t, e) {
    return this._memoize("dfUniform", o.dfUniformFloat, r, t, e);
  }
  dfUniformInt(r, t) {
    return this._memoize("dfUniformInt", o.dfUniformInt, r, t);
  }
  dfUniformBoolean(r) {
    return this._memoize("dfUniformBoolean", o.dfUniformBoolean, r);
  }
  dfNormal(r, t) {
    return o.dfNormal(this, r, t);
  }
  dfLogNormal(r, t) {
    return o.dfLogNormal(this, r, t);
  }
  dfBernoulli(r) {
    return o.dfBernoulli(this, r);
  }
  dfBinomial(r, t) {
    return o.dfBinomial(this, r, t);
  }
  dfGeometric(r) {
    return o.dfGeometric(this, r);
  }
  dfPoisson(r) {
    return o.dfPoisson(this, r);
  }
  dfExponential(r) {
    return o.dfExponential(this, r);
  }
  dfIrwinHall(r = 1) {
    return o.dfIrwinHall(this, r);
  }
  dfBates(r = 1) {
    return o.dfBates(this, r);
  }
  dfPareto(r = 1) {
    return o.dfPareto(this, r);
  }
  itemByWeight(r, t, ...e) {
    return this.dfItemByWeight(r, t, ...e)();
  }
  dfItemByWeight(r, t, ...e) {
    return this._callDistributions(o.dfItemByWeight, r, t, ...e);
  }
  itemByWeightUnique(r, t, e, ...n) {
    return this.dfItemByWeightUnique(r, t, e, ...n)();
  }
  dfItemByWeightUnique(r, t, e, ...n) {
    return this._callDistributions(o.dfItemByWeightUnique, r, t, e, ...n);
  }
  sumInt(r, t, e, n, i) {
    return this.dfSumInt(r, t, e, n, i)();
  }
  dfSumInt(r, t, e, n, i) {
    return this._memoize("sumInt", o.dfRandSumInt, r, t, e, n, i);
  }
  sumFloat(r, t, e, n, i) {
    return this.dfSumFloat(r, t, e, n, i)();
  }
  dfSumFloat(r, t, e, n, i) {
    return this._memoize("sumFloat", o.dfRandSumFloat, r, t, e, n, i);
  }
  _memoize(r, t, ...e) {
    const n = d(e);
    let i = this._cache[r];
    return void 0 !== i && i.key === n || (i = {
      key: n,
      distribution: t(this, ...e)
    }, this._cache[r] = i), i.distribution;
  }
  _memoizeFake(r, t, ...e) {
    return t(this, ...e);
  }
  _callDistributions(r, ...t) {
    return r(this, ...t);
  }
  reset() {
    return this._cache = {}, this;
  }
  get [Symbol.toStringTag]() {
    var r;
    return null === (r = this._rng) || void 0 === r ? void 0 : r.name;
  }
};

r([ n("not recommended use"), t("design:type", Function), t("design:paramtypes", []), t("design:returntype", void 0) ], a.prototype, "patch", null), 
r([ n("not recommended use"), t("design:type", Function), t("design:paramtypes", []), t("design:returntype", void 0) ], a.prototype, "unpatch", null), 
a = r([ i, t("design:paramtypes", [ Object, Object ]) ], a);

var f = a;

export { a as RandomCore, f as default };
//# sourceMappingURL=index.esm.mjs.map
