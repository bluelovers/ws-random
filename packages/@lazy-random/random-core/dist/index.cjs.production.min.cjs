"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("tslib"), r = require("@lazy-random/expect"), t = require("core-decorators"), n = require("@lazy-random/shared-lib"), i = require("@lazy-random/distributions"), a = require("@lazy-random/rng-abstract");

exports.RandomCore = class RandomCore {
  _cache={};
  constructor(e, ...r) {
    this._init(e, ...r);
  }
  _init(e, ...t) {
    e && r.expect(e).instanceof(a.RNG), this.use(e);
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
  use(e, ...t) {
    return r.expect(e).instanceof(a.RNG), this._rng = e, this;
  }
  newUse(e, ...r) {
    throw new Error("not implemented");
  }
  cloneUse(e, ...r) {
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
    return this._memoize("byte", i.dfUniformByte, e);
  }
  bytes(e = 1, r) {
    return this.dfBytes(e, r)();
  }
  dfBytes(e = 1, r) {
    return this._memoize("bytes", i.dfUniformBytes, e, r);
  }
  randomBytes(e) {
    return Buffer.from(this.bytes(e));
  }
  dfRandomBytes(e) {
    let r = this.dfBytes(e);
    return this._memoize("dfRandomBytes", (() => () => Buffer.from(r())), e);
  }
  charID(e, r) {
    return i.dfCharID(this, e, r)();
  }
  dfCharID(e, r) {
    return this._memoize("dfCharID", i.dfCharID, e, r);
  }
  uuidv4(e) {
    return this.dfUuidv4(e)();
  }
  dfUuidv4(e) {
    return this._memoize("uuidv4", i.dfUuidV4, e);
  }
  arrayIndex(e, r = 1, t = 0, n) {
    return this.dfArrayIndex(e, r, t, n)();
  }
  dfArrayIndex(e, r = 1, t = 0, n) {
    return this._memoizeFake("dfArrayIndex", i.dfArrayIndex, e, r, t, n);
  }
  arrayIndexOne(e, r = 1, t = 0, n) {
    return this.dfArrayIndexOne(e, t, n)();
  }
  dfArrayIndexOne(e, r = 0, t) {
    return this._memoizeFake("dfArrayIndexOne", i.dfArrayIndexOne, e, r, t);
  }
  arrayItem(e, r = 1, t = 0, n) {
    return this.dfArrayItem(e, r, t, n)();
  }
  dfArrayItem(e, r = 1, t = 0, n) {
    const i = this.dfArrayIndex(e, r, t, n);
    return () => i().reduce((function(r, t) {
      return r.push(e[t]), r;
    }), []);
  }
  arrayItemOne(e, r = 0, t) {
    return this.dfArrayItemOne(e, r, t)();
  }
  dfArrayItemOne(e, r = 0, t) {
    const n = this.dfArrayIndexOne(e, r, t);
    return () => e[n()];
  }
  arrayShuffle(e, r) {
    return this._memoizeFake("dfArrayShuffle", i.dfArrayShuffle, e, r)();
  }
  dfArrayShuffle(e, r) {
    return this._callDistributions(i.dfArrayShuffle, e, r);
  }
  arrayUnique(e, r, t, n, i) {
    return this.dfArrayUnique(e, r, t, n, i)();
  }
  dfArrayUnique(e, r, t, n, a) {
    return i.dfArrayUnique(this, e, r, t, n, a);
  }
  arrayFill(e, r, t, n) {
    return this.dfArrayFill(r, t, n)(e);
  }
  dfArrayFill(e, r, t) {
    return this._memoize("dfArrayFill", i.dfArrayFill, e, r, t);
  }
  dfUniform(e, r, t) {
    return this._memoize("dfUniform", i.dfUniformFloat, e, r, t);
  }
  dfUniformInt(e, r) {
    return this._memoize("dfUniformInt", i.dfUniformInt, e, r);
  }
  dfUniformBoolean(e) {
    return this._memoize("dfUniformBoolean", i.dfUniformBoolean, e);
  }
  dfNormal(e, r) {
    return i.dfNormal(this, e, r);
  }
  dfLogNormal(e, r) {
    return i.dfLogNormal(this, e, r);
  }
  dfBernoulli(e) {
    return i.dfBernoulli(this, e);
  }
  dfBinomial(e, r) {
    return i.dfBinomial(this, e, r);
  }
  dfGeometric(e) {
    return i.dfGeometric(this, e);
  }
  dfPoisson(e) {
    return i.dfPoisson(this, e);
  }
  dfExponential(e) {
    return i.dfExponential(this, e);
  }
  dfIrwinHall(e = 1) {
    return i.dfIrwinHall(this, e);
  }
  dfBates(e = 1) {
    return i.dfBates(this, e);
  }
  dfPareto(e = 1) {
    return i.dfPareto(this, e);
  }
  itemByWeight(e, r, ...t) {
    return this.dfItemByWeight(e, r, ...t)();
  }
  dfItemByWeight(e, r, ...t) {
    return this._callDistributions(i.dfItemByWeight, e, r, ...t);
  }
  itemByWeightUnique(e, r, t, ...n) {
    return this.dfItemByWeightUnique(e, r, t, ...n)();
  }
  dfItemByWeightUnique(e, r, t, ...n) {
    return this._callDistributions(i.dfItemByWeightUnique, e, r, t, ...n);
  }
  sumInt(e, r, t, n, i) {
    return this.dfSumInt(e, r, t, n, i)();
  }
  dfSumInt(e, r, t, n, a) {
    return this._memoize("sumInt", i.dfRandSumInt, e, r, t, n, a);
  }
  sumFloat(e, r, t, n, i) {
    return this.dfSumFloat(e, r, t, n, i)();
  }
  dfSumFloat(e, r, t, n, a) {
    return this._memoize("sumFloat", i.dfRandSumFloat, e, r, t, n, a);
  }
  _memoize(e, r, ...t) {
    const i = n.hashArgv(t);
    let a = this._cache[e];
    return void 0 !== a && a.key === i || (a = {
      key: i,
      distribution: r(this, ...t)
    }, this._cache[e] = a), a.distribution;
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
}, e.__decorate([ t.deprecate("not recommended use"), e.__metadata("design:type", Function), e.__metadata("design:paramtypes", []), e.__metadata("design:returntype", void 0) ], exports.RandomCore.prototype, "patch", null), 
e.__decorate([ t.deprecate("not recommended use"), e.__metadata("design:type", Function), e.__metadata("design:paramtypes", []), e.__metadata("design:returntype", void 0) ], exports.RandomCore.prototype, "unpatch", null), 
exports.RandomCore = e.__decorate([ t.autobind, e.__metadata("design:paramtypes", [ Object, Object ]) ], exports.RandomCore);

var d = exports.RandomCore;

exports.default = d;
//# sourceMappingURL=index.cjs.production.min.cjs.map
