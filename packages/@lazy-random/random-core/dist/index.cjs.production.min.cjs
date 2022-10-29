"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("tslib"), t = require("@lazy-random/expect"), r = require("core-decorators"), n = require("@lazy-random/shared-lib"), i = require("@lazy-random/distributions"), a = require("@lazy-random/rng-abstract");

exports.RandomCore = class RandomCore {
  _cache={};
  constructor(e, ...t) {
    this._init(e, ...t);
  }
  _init(e, ...r) {
    e && t.expect(e).instanceof(a.RNG), this.use(e);
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
  clone(e, ...t) {
    throw new Error("not implemented");
  }
  use(e, ...r) {
    return t.expect(e).instanceof(a.RNG), this._rng = e, this;
  }
  newUse(e, ...t) {
    throw new Error("not implemented");
  }
  cloneUse(e, ...t) {
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
  float(e, t, r) {
    return this.dfUniform(e, t, r)();
  }
  int(e = 100, t) {
    return this.dfUniformInt(e, t)();
  }
  integer(e, t) {
    return this.int(e, t);
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
  bytes(e = 1, t) {
    return this.dfBytes(e, t)();
  }
  dfBytes(e = 1, t) {
    return this._memoize("bytes", i.dfUniformBytes, e, t);
  }
  randomBytes(e) {
    return Buffer.from(this.bytes(e));
  }
  dfRandomBytes(e) {
    let t = this.dfBytes(e);
    return this._memoize("dfRandomBytes", (() => () => Buffer.from(t())), e);
  }
  charID(e, t) {
    return i.dfCharID(this, e, t)();
  }
  dfCharID(e, t) {
    return this._memoize("dfCharID", i.dfCharID, e, t);
  }
  uuidv4(e) {
    return this.dfUuidv4(e)();
  }
  dfUuidv4(e) {
    return this._memoize("uuidv4", i.dfUuidV4, e);
  }
  arrayIndex(e, t = 1, r = 0, n) {
    return this.dfArrayIndex(e, t, r, n)();
  }
  dfArrayIndex(e, t = 1, r = 0, n) {
    return this._memoizeFake("dfArrayIndex", i.dfArrayIndex, e, t, r, n);
  }
  arrayItem(e, t = 1, r = 0, n) {
    return this.arrayIndex(e, t, r, n).reduce((function(t, r) {
      return t.push(e[r]), t;
    }), []);
  }
  arrayShuffle(e, t) {
    return this._memoizeFake("dfArrayShuffle", i.dfArrayShuffle, e, t)();
  }
  dfArrayShuffle(e, t) {
    return this._callDistributions(i.dfArrayShuffle, e, t);
  }
  arrayUnique(e, t, r, n, i) {
    return this.dfArrayUnique(e, t, r, n, i)();
  }
  dfArrayUnique(e, t, r, n, a) {
    return i.dfArrayUnique(this, e, t, r, n, a);
  }
  arrayFill(e, t, r, n) {
    return this.dfArrayFill(t, r, n)(e);
  }
  dfArrayFill(e, t, r) {
    return this._memoize("dfArrayFill", i.dfArrayFill, e, t, r);
  }
  dfUniform(e, t, r) {
    return this._memoize("dfUniform", i.dfUniformFloat, e, t, r);
  }
  dfUniformInt(e, t) {
    return this._memoize("dfUniformInt", i.dfUniformInt, e, t);
  }
  dfUniformBoolean(e) {
    return this._memoize("dfUniformBoolean", i.dfUniformBoolean, e);
  }
  dfNormal(e, t) {
    return i.dfNormal(this, e, t);
  }
  dfLogNormal(e, t) {
    return i.dfLogNormal(this, e, t);
  }
  dfBernoulli(e) {
    return i.dfBernoulli(this, e);
  }
  dfBinomial(e, t) {
    return i.dfBinomial(this, e, t);
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
  itemByWeight(e, t, ...r) {
    return this.dfItemByWeight(e, t, ...r)();
  }
  dfItemByWeight(e, t, ...r) {
    return this._callDistributions(i.dfItemByWeight, e, t, ...r);
  }
  itemByWeightUnique(e, t, r, ...n) {
    return this.dfItemByWeightUnique(e, t, r, ...n)();
  }
  dfItemByWeightUnique(e, t, r, ...n) {
    return this._callDistributions(i.dfItemByWeightUnique, e, t, r, ...n);
  }
  sumInt(e, t, r, n, i) {
    return this.dfSumInt(e, t, r, n, i)();
  }
  dfSumInt(e, t, r, n, a) {
    return this._memoize("sumInt", i.dfRandSumInt, e, t, r, n, a);
  }
  sumFloat(e, t, r, n, i) {
    return this.dfSumFloat(e, t, r, n, i)();
  }
  dfSumFloat(e, t, r, n, a) {
    return this._memoize("sumFloat", i.dfRandSumFloat, e, t, r, n, a);
  }
  _memoize(e, t, ...r) {
    const i = n.hashArgv(r);
    let a = this._cache[e];
    return void 0 !== a && a.key === i || (a = {
      key: i,
      distribution: t(this, ...r)
    }, this._cache[e] = a), a.distribution;
  }
  _memoizeFake(e, t, ...r) {
    return t(this, ...r);
  }
  _callDistributions(e, ...t) {
    return e(this, ...t);
  }
  reset() {
    return this._cache = {}, this;
  }
  get [Symbol.toStringTag]() {
    var e;
    return null === (e = this._rng) || void 0 === e ? void 0 : e.name;
  }
}, e.__decorate([ r.deprecate("not recommended use"), e.__metadata("design:type", Function), e.__metadata("design:paramtypes", []), e.__metadata("design:returntype", void 0) ], exports.RandomCore.prototype, "patch", null), 
e.__decorate([ r.deprecate("not recommended use"), e.__metadata("design:type", Function), e.__metadata("design:paramtypes", []), e.__metadata("design:returntype", void 0) ], exports.RandomCore.prototype, "unpatch", null), 
exports.RandomCore = e.__decorate([ r.autobind, e.__metadata("design:paramtypes", [ Object, Object ]) ], exports.RandomCore);

var d = exports.RandomCore;

exports.default = d;
//# sourceMappingURL=index.cjs.production.min.cjs.map
