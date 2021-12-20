import { __decorate, __metadata } from 'tslib';
import { expect } from '@lazy-random/expect';
import { deprecate, autobind } from 'core-decorators';
import Distributions from '@lazy-random/distributions';
import { RNG } from '@lazy-random/rng-abstract';
import { hashArgv } from '@lazy-random/shared-lib';

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
let RandomCore = (_Symbol$toStringTag = Symbol.toStringTag, class RandomCore {
  constructor(rng, ...argv) {
    _defineProperty(this, "_cache", {});

    this._init(rng, ...argv);
  }

  _init(rng, ...argv) {
    if (rng) {
      expect(rng).instanceof(RNG);
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
    expect(rng).instanceof(RNG);
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
    return this._memoize('byte', Distributions.dfUniformByte, toStr);
  }

  bytes(size = 1, toStr) {
    return this.dfBytes(size, toStr)();
  }

  dfBytes(size = 1, toStr) {
    return this._memoize('bytes', Distributions.dfUniformBytes, size, toStr);
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
    return Distributions.dfCharID(this, char, size)();
  }

  dfCharID(char, size) {
    return this._memoize('dfCharID', Distributions.dfCharID, char, size);
  }

  uuidv4(toUpperCase) {
    return this.dfUuidv4(toUpperCase)();
  }

  dfUuidv4(toUpperCase) {
    return this._memoize('uuidv4', Distributions.dfUuidV4, toUpperCase);
  }

  arrayIndex(arr, size = 1, start = 0, end) {
    return this.dfArrayIndex(arr, size, start, end)();
  }

  dfArrayIndex(arr, size = 1, start = 0, end) {
    return this._memoizeFake('dfArrayIndex', Distributions.dfArrayIndex, arr, size, start, end);
  }

  arrayItem(arr, size = 1, start = 0, end) {
    let ids = this.arrayIndex(arr, size, start, end);
    return ids.reduce(function (a, idx) {
      a.push(arr[idx]);
      return a;
    }, []);
  }

  arrayShuffle(arr, overwrite) {
    return this._memoizeFake('dfArrayShuffle', Distributions.dfArrayShuffle, arr, overwrite)();
  }

  dfArrayShuffle(arr, overwrite) {
    return this._callDistributions(Distributions.dfArrayShuffle, arr, overwrite);
  }

  arrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit) {
    return this.dfArrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit)();
  }

  dfArrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit) {
    return Distributions.dfArrayUnique(this, arr, limit, loop, fnRandIndex, fnOutOfLimit);
  }

  arrayFill(arr, min, max, float) {
    return this.dfArrayFill(min, max, float)(arr);
  }

  dfArrayFill(min, max, float) {
    return this._memoize('dfArrayFill', Distributions.dfArrayFill, min, max, float);
  }

  dfUniform(min, max, fractionDigits) {
    return this._memoize('dfUniform', Distributions.dfUniformFloat, min, max, fractionDigits);
  }

  dfUniformInt(min, max) {
    return this._memoize('dfUniformInt', Distributions.dfUniformInt, min, max);
  }

  dfUniformBoolean(likelihood) {
    return this._memoize('dfUniformBoolean', Distributions.dfUniformBoolean, likelihood);
  }

  dfNormal(mu, sigma) {
    return Distributions.dfNormal(this, mu, sigma);
  }

  dfLogNormal(mu, sigma) {
    return Distributions.dfLogNormal(this, mu, sigma);
  }

  dfBernoulli(p) {
    return Distributions.dfBernoulli(this, p);
  }

  dfBinomial(n, p) {
    return Distributions.dfBinomial(this, n, p);
  }

  dfGeometric(p) {
    return Distributions.dfGeometric(this, p);
  }

  dfPoisson(lambda) {
    return Distributions.dfPoisson(this, lambda);
  }

  dfExponential(lambda) {
    return Distributions.dfExponential(this, lambda);
  }

  dfIrwinHall(n = 1) {
    return Distributions.dfIrwinHall(this, n);
  }

  dfBates(n = 1) {
    return Distributions.dfBates(this, n);
  }

  dfPareto(alpha = 1) {
    return Distributions.dfPareto(this, alpha);
  }

  itemByWeight(arr, options, ...argv) {
    return this.dfItemByWeight(arr, options, ...argv)();
  }

  dfItemByWeight(arr, options, ...argv) {
    return this._callDistributions(Distributions.dfItemByWeight, arr, options, ...argv);
  }

  itemByWeightUnique(arr, size, options, ...argv) {
    return this.dfItemByWeightUnique(arr, size, options, ...argv)();
  }

  dfItemByWeightUnique(arr, size, options, ...argv) {
    return this._callDistributions(Distributions.dfItemByWeightUnique, arr, size, options, ...argv);
  }

  sumInt(size, sum, min, max, limit) {
    return this.dfSumInt(size, sum, min, max, limit)();
  }

  dfSumInt(size, sum, min, max, limit) {
    return this._memoize('sumInt', Distributions.dfRandSumInt, size, sum, min, max, limit);
  }

  sumFloat(size, sum, min, max, fractionDigits) {
    return this.dfSumFloat(size, sum, min, max, fractionDigits)();
  }

  dfSumFloat(size, sum, min, max, fractionDigits) {
    return this._memoize('sumFloat', Distributions.dfRandSumFloat, size, sum, min, max, fractionDigits);
  }

  _memoize(label, getter, ...args) {
    const key = hashArgv(args);
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
    return this._rng.name;
  }

});

__decorate([deprecate('not recommended use'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], RandomCore.prototype, "patch", null);

__decorate([deprecate('not recommended use'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], RandomCore.prototype, "unpatch", null);

RandomCore = /*#__PURE__*/__decorate([autobind, /*#__PURE__*/__metadata("design:paramtypes", [Object, Object])], RandomCore);
var RandomCore$1 = RandomCore;

export { RandomCore, RandomCore$1 as default };
//# sourceMappingURL=index.esm.mjs.map
