'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var expect = require('@lazy-random/expect');
var coreDecorators = require('core-decorators');
var Distributions = require('@lazy-random/distributions');
var rngAbstract = require('@lazy-random/rng-abstract');
var sharedLib = require('@lazy-random/shared-lib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Distributions__default = /*#__PURE__*/_interopDefaultLegacy(Distributions);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

let _Symbol$toStringTag;
exports.RandomCore = (_Symbol$toStringTag = Symbol.toStringTag, class RandomCore {
  constructor(rng, ...argv) {
    _defineProperty(this, "_cache", {});

    this._init(rng, ...argv);
  }

  _init(rng, ...argv) {
    if (rng) {
      expect.expect(rng).instanceof(rngAbstract.RNG);
    }

    this.use(rng);
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

  seed(...argv) {
    this._rng.seed(...argv);

    return this;
  }

  get srandom() {
    return this.srand;
  }

  srand(...argv) {
    return this.seed(...argv).next();
  }

  clone(seed, ...args) {
    throw new Error(`not implemented`);
  }

  use(rng, ...args) {
    expect.expect(rng).instanceof(rngAbstract.RNG);
    this._rng = rng;
    return this;
  }

  newUse(rng, ...args) {
    throw new Error(`not implemented`);
  }

  cloneUse(rng, ...args) {
    throw new Error(`not implemented`);
  }

  patch() {
    if (this._patch) {
      throw new Error('Math.random already patched');
    }

    this._patch = Math.random;
    Math.random = this.dfUniform();
  }

  unpatch() {
    if (this._patch) {
      Math.random = this._patch;
      delete this._patch;
    }
  }

  next() {
    return this._rng.next();
  }

  float(min, max, fractionDigits) {
    return this.dfUniform(min, max, fractionDigits)();
  }

  int(min = 100, max) {
    return this.dfUniformInt(min, max)();
  }

  integer(min, max) {
    return this.int(min, max);
  }

  bool(likelihood) {
    return this.boolean(likelihood);
  }

  boolean(likelihood) {
    return this.dfUniformBoolean(likelihood)();
  }

  byte(toStr) {
    return this.dfByte(toStr)();
  }

  dfByte(toStr) {
    return this._memoize('byte', Distributions__default["default"].dfUniformByte, toStr);
  }

  bytes(size = 1, toStr) {
    return this.dfBytes(size, toStr)();
  }

  dfBytes(size = 1, toStr) {
    return this._memoize('bytes', Distributions__default["default"].dfUniformBytes, size, toStr);
  }

  randomBytes(size) {
    return Buffer.from(this.bytes(size));
  }

  dfRandomBytes(size) {
    let fn = this.dfBytes(size);

    let warp = () => () => Buffer.from(fn());

    return this._memoize('dfRandomBytes', warp, size);
  }

  charID(char, size) {
    return Distributions__default["default"].dfCharID(this, char, size)();
  }

  dfCharID(char, size) {
    return this._memoize('dfCharID', Distributions__default["default"].dfCharID, char, size);
  }

  uuidv4(toUpperCase) {
    return this.dfUuidv4(toUpperCase)();
  }

  dfUuidv4(toUpperCase) {
    return this._memoize('uuidv4', Distributions__default["default"].dfUuidV4, toUpperCase);
  }

  arrayIndex(arr, size = 1, start = 0, end) {
    return this.dfArrayIndex(arr, size, start, end)();
  }

  dfArrayIndex(arr, size = 1, start = 0, end) {
    return this._memoizeFake('dfArrayIndex', Distributions__default["default"].dfArrayIndex, arr, size, start, end);
  }

  arrayItem(arr, size = 1, start = 0, end) {
    let ids = this.arrayIndex(arr, size, start, end);
    return ids.reduce(function (a, idx) {
      a.push(arr[idx]);
      return a;
    }, []);
  }

  arrayShuffle(arr, overwrite) {
    return this._memoizeFake('dfArrayShuffle', Distributions__default["default"].dfArrayShuffle, arr, overwrite)();
  }

  dfArrayShuffle(arr, overwrite) {
    return this._callDistributions(Distributions__default["default"].dfArrayShuffle, arr, overwrite);
  }

  arrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit) {
    return this.dfArrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit)();
  }

  dfArrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit) {
    return Distributions__default["default"].dfArrayUnique(this, arr, limit, loop, fnRandIndex, fnOutOfLimit);
  }

  arrayFill(arr, min, max, float) {
    return this.dfArrayFill(min, max, float)(arr);
  }

  dfArrayFill(min, max, float) {
    return this._memoize('dfArrayFill', Distributions__default["default"].dfArrayFill, min, max, float);
  }

  dfUniform(min, max, fractionDigits) {
    return this._memoize('dfUniform', Distributions__default["default"].dfUniformFloat, min, max, fractionDigits);
  }

  dfUniformInt(min, max) {
    return this._memoize('dfUniformInt', Distributions__default["default"].dfUniformInt, min, max);
  }

  dfUniformBoolean(likelihood) {
    return this._memoize('dfUniformBoolean', Distributions__default["default"].dfUniformBoolean, likelihood);
  }

  dfNormal(mu, sigma) {
    return Distributions__default["default"].dfNormal(this, mu, sigma);
  }

  dfLogNormal(mu, sigma) {
    return Distributions__default["default"].dfLogNormal(this, mu, sigma);
  }

  dfBernoulli(p) {
    return Distributions__default["default"].dfBernoulli(this, p);
  }

  dfBinomial(n, p) {
    return Distributions__default["default"].dfBinomial(this, n, p);
  }

  dfGeometric(p) {
    return Distributions__default["default"].dfGeometric(this, p);
  }

  dfPoisson(lambda) {
    return Distributions__default["default"].dfPoisson(this, lambda);
  }

  dfExponential(lambda) {
    return Distributions__default["default"].dfExponential(this, lambda);
  }

  dfIrwinHall(n = 1) {
    return Distributions__default["default"].dfIrwinHall(this, n);
  }

  dfBates(n = 1) {
    return Distributions__default["default"].dfBates(this, n);
  }

  dfPareto(alpha = 1) {
    return Distributions__default["default"].dfPareto(this, alpha);
  }

  itemByWeight(arr, options, ...argv) {
    return this.dfItemByWeight(arr, options, ...argv)();
  }

  dfItemByWeight(arr, options, ...argv) {
    return this._callDistributions(Distributions__default["default"].dfItemByWeight, arr, options, ...argv);
  }

  itemByWeightUnique(arr, size, options, ...argv) {
    return this.dfItemByWeightUnique(arr, size, options, ...argv)();
  }

  dfItemByWeightUnique(arr, size, options, ...argv) {
    return this._callDistributions(Distributions__default["default"].dfItemByWeightUnique, arr, size, options, ...argv);
  }

  sumInt(size, sum, min, max, limit) {
    return this.dfSumInt(size, sum, min, max, limit)();
  }

  dfSumInt(size, sum, min, max, limit) {
    return this._memoize('sumInt', Distributions__default["default"].dfRandSumInt, size, sum, min, max, limit);
  }

  sumFloat(size, sum, min, max, fractionDigits) {
    return this.dfSumFloat(size, sum, min, max, fractionDigits)();
  }

  dfSumFloat(size, sum, min, max, fractionDigits) {
    return this._memoize('sumFloat', Distributions__default["default"].dfRandSumFloat, size, sum, min, max, fractionDigits);
  }

  _memoize(label, getter, ...args) {
    const key = sharedLib.hashArgv(args);
    let value = this._cache[label];

    if (value === undefined || value.key !== key) {
      value = {
        key,
        distribution: getter(this, ...args)
      };
      this._cache[label] = value;
    }

    return value.distribution;
  }

  _memoizeFake(label, getter, ...args) {
    return getter(this, ...args);
  }

  _callDistributions(getter, ...args) {
    return getter(this, ...args);
  }

  reset() {
    this._cache = {};
    return this;
  }

  get [_Symbol$toStringTag]() {
    var _this$_rng;

    return (_this$_rng = this._rng) === null || _this$_rng === void 0 ? void 0 : _this$_rng.name;
  }

});

tslib.__decorate([coreDecorators.deprecate('not recommended use'), tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], exports.RandomCore.prototype, "patch", null);

tslib.__decorate([coreDecorators.deprecate('not recommended use'), tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], exports.RandomCore.prototype, "unpatch", null);

exports.RandomCore = /*#__PURE__*/tslib.__decorate([coreDecorators.autobind, /*#__PURE__*/tslib.__metadata("design:paramtypes", [Object, Object])], exports.RandomCore);
var RandomCore = exports.RandomCore;

exports["default"] = RandomCore;
//# sourceMappingURL=index.cjs.development.cjs.map
