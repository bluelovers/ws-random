'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var expect = require('@lazy-random/expect');
var coreDecorators = require('core-decorators');
var sharedLib = require('@lazy-random/shared-lib');
var Distributions = require('@lazy-random/distributions');
var rngAbstract = require('@lazy-random/rng-abstract');

/**
 * Seedable random number generator supporting many common distributions.
 *
 * Defaults to Math.random as its underlying pseudorandom number generator.
 *
 * @name Random
 * @class
 *
 * @param {Rng|function} [rng=Math.random] - Underlying pseudorandom number generator.
 */
exports.RandomCore = class RandomCore {
  _cache = {};
  constructor(rng, ...argv) {
    this._init(rng, ...argv);
  }
  _init(rng, ...argv) {
    if (rng) {
      //ow(rng, ow.object.instanceOf(RNG))
      expect.expect(rng).instanceof(rngAbstract.RNG);
    }
    this.use(rng);
  }
  /**
   * @member {Rng} Underlying pseudo-random number generator
   */
  get rng() {
    return this._rng;
  }
  get seedable() {
    return this._rng.seedable;
  }
  /**
   * @see random.next
   */
  get random() {
    return this.next;
  }
  /**
   * create random numbers like Math.random()
   *
   * @see random.next
   */
  get rand() {
    return this.next;
  }
  /**
   * initialize new seeds
   */
  seed(...argv) {
    this._rng.seed(...argv);
    return this;
  }
  /**
   * @see random.srand
   */
  get srandom() {
    return this.srand;
  }
  /**
   * initialize seeds for rand() to create random numbers
   */
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
  /**
   * create new Random and use
   */
  newUse(rng, ...args) {
    throw new Error(`not implemented`);
  }
  /**
   * clone current Random and use
   */
  cloneUse(rng, ...args) {
    throw new Error(`not implemented`);
  }
  /**
   * Patches `Math.random` with this Random instance's PRNG.
   * @deprecated unsafe method
   */
  patch() {
    if (this._patch) {
      throw new Error('Math.random already patched');
    }
    this._patch = Math.random;
    // @ts-ignore
    Math.random = this.dfUniform();
  }
  /**
   * Restores a previously patched `Math.random` to its original value.
   *
   * @deprecated unsafe method
   */
  unpatch() {
    if (this._patch) {
      Math.random = this._patch;
      delete this._patch;
    }
  }
  // --------------------------------------------------------------------------
  // Uniform utility functions
  // --------------------------------------------------------------------------
  /**
   * Convenience wrapper around `this.rng.next()`
   *
   * Returns a floating point number in [0, 1).
   *
   * @return {number}
   */
  next() {
    return this._rng.next();
  }
  /**
   * Samples a dfUniform random floating point number, optionally specifying
   * lower and upper bounds.
   *
   * Convence wrapper around `random.dfUniform()`
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   * @return {number}
   */
  float(min, max, fractionDigits) {
    return this.dfUniform(min, max, fractionDigits)();
  }
  /**
   * Samples a dfUniform random integer, optionally specifying lower and upper
   * bounds.
   *
   * Convence wrapper around `random.dfUniformInt()`
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   * @return {number}
   */
  int(min = 100, max) {
    return this.dfUniformInt(min, max)();
  }
  /**
   * @see `random.int`
   */
  integer(min, max) {
    return this.int(min, max);
  }
  /**
   * @see `random.boolean`
   */
  bool(likelihood) {
    return this.boolean(likelihood);
  }
  /**
   * Samples a dfUniform random boolean value.
   *
   * Convence wrapper around `random.dfUniformBoolean()`
   *
   * @return {boolean}
   */
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
  /**
   * same as crypto.randomBytes(size)
   *
   * @param size
   */
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
  /**
   * generate random by input string, support unicode
   *
   * @example random.dfCharID() // => QcVH6FAi
   */
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
  /**
   * get random index in array
   *
   * @example console.log(random.dfArrayIndex([11, 22, 33], 1, 0));
   */
  dfArrayIndex(arr, size = 1, start = 0, end) {
    return this._memoizeFake('dfArrayIndex', Distributions.dfArrayIndex, arr, size, start, end);
  }
  arrayIndexOne(arr, size = 1, start = 0, end) {
    return this.dfArrayIndexOne(arr, start, end)();
  }
  dfArrayIndexOne(arr, start = 0, end) {
    return this._memoizeFake('dfArrayIndexOne', Distributions.dfArrayIndexOne, arr, start, end);
  }
  /**
   * get random item in array
   *
   * @example console.log(random.dfArrayItem([11, 22, 33], 2));
   */
  arrayItem(arr, size = 1, start = 0, end) {
    return this.dfArrayItem(arr, size, start, end)();
  }
  dfArrayItem(arr, size = 1, start = 0, end) {
    const fn = this.dfArrayIndex(arr, size, start, end);
    return () => {
      return fn().reduce(function (a, idx) {
        a.push(arr[idx]);
        return a;
      }, []);
    };
  }
  arrayItemOne(arr, start = 0, end) {
    return this.dfArrayItemOne(arr, start, end)();
  }
  dfArrayItemOne(arr, start = 0, end) {
    const fn = this.dfArrayIndexOne(arr, start, end);
    return () => arr[fn()];
  }
  /**
   * Shuffle an array
   *
   * @example random.dfArrayShuffle([11, 22, 33])
   */
  arrayShuffle(arr, overwrite) {
    return this._memoizeFake('dfArrayShuffle', Distributions.dfArrayShuffle, arr, overwrite)();
  }
  dfArrayShuffle(arr, overwrite) {
    //		return Distributions.arrayShuffle(this, arr, overwrite);
    return this._callDistributions(Distributions.dfArrayShuffle, arr, overwrite);
  }
  arrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit) {
    return this.dfArrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit)();
  }
  /**
   * Get consecutively unique elements from an array
   *
   * @example
   * let fn = random.dfArrayUnique([1, 2, 3, 4], 3);
   * console.log(fn(), fn(), fn());
   *
   * // will throw error
   * console.log(fn());
   */
  dfArrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit) {
    return Distributions.dfArrayUnique(this, arr, limit, loop, fnRandIndex, fnOutOfLimit);
  }
  /**
   * fill random value into any array-like object
   *
   * @example
   * arr_bytes = random.dfArrayFill()(new Uint8Array(10))
   * arr_bytes = random.dfArrayFill()(Buffer.alloc(10))
   * arr_ints = random.dfArrayFill(10, 20)(new Array(10)) // => [ 13, 13, 12, 11, 12, 15, 12, 12, 13, 16 ]
   * arr_floats = random.dfArrayFill(10, 20)(new Array(10)) // => [ 14.763857298282993, 10.858143742391624, 17.38883617551437, 15.298810484359247, 16.81798563879964, 16.274271855177005, 18.13149197984974, 13.43840784370765, 14.129283708144884, 11.243691805289316 ]
   */
  arrayFill(arr, min, max, float) {
    return this.dfArrayFill(min, max, float)(arr);
  }
  /**
   * @see arrayFill
   */
  dfArrayFill(min, max, float) {
    return this._memoize('dfArrayFill', Distributions.dfArrayFill, min, max, float);
  }
  // --------------------------------------------------------------------------
  // Uniform distributions
  // --------------------------------------------------------------------------
  /**
   * Generates a [Continuous dfUniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   * @return {function}
   */
  dfUniform(min, max, fractionDigits) {
    return this._memoize('dfUniform', Distributions.dfUniformFloat, min, max, fractionDigits);
  }
  /**
   * Generates a [Discrete dfUniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   * @return {function}
   */
  dfUniformInt(min, max) {
    return this._memoize('dfUniformInt', Distributions.dfUniformInt, min, max);
  }
  /**
   * Generates a [Discrete dfUniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
   * with two possible outcomes, `true` or `false.
   *
   * This method is analogous to flipping a coin.
   *
   * @return {function}
   */
  dfUniformBoolean(likelihood) {
    return this._memoize('dfUniformBoolean', Distributions.dfUniformBoolean, likelihood);
  }
  // --------------------------------------------------------------------------
  // Normal distributions
  // --------------------------------------------------------------------------
  /**
   * Generates a [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
   *
   * @param {number} [mu=0] - Mean
   * @param {number} [sigma=1] - Standard deviation
   * @return {function}
   */
  dfNormal(mu, sigma) {
    return Distributions.dfNormal(this, mu, sigma);
  }
  /**
   * Generates a [Log-dfNormal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
   *
   * @param {number} [mu=0] - Mean of underlying dfNormal distribution
   * @param {number} [sigma=1] - Standard deviation of underlying dfNormal distribution
   * @return {function}
   */
  dfLogNormal(mu, sigma) {
    return Distributions.dfLogNormal(this, mu, sigma);
  }
  // --------------------------------------------------------------------------
  // Bernoulli distributions
  // --------------------------------------------------------------------------
  /**
   * Generates a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution).
   *
   * @param {number} [p=0.5] - Success probability of each trial.
   * @return {function}
   */
  dfBernoulli(p) {
    return Distributions.dfBernoulli(this, p);
  }
  /**
   * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
   *
   * @param {number} [n=1] - Number of trials.
   * @param {number} [p=0.5] - Success probability of each trial.
   * @return {function}
   */
  dfBinomial(n, p) {
    return Distributions.dfBinomial(this, n, p);
  }
  /**
   * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
   *
   * @param {number} [p=0.5] - Success probability of each trial.
   * @return {function}
   */
  dfGeometric(p) {
    return Distributions.dfGeometric(this, p);
  }
  // --------------------------------------------------------------------------
  // Poisson distributions
  // --------------------------------------------------------------------------
  /**
   * Generates a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
   *
   * @param {number} [lambda=1] - Mean (lambda > 0)
   * @return {function}
   */
  dfPoisson(lambda) {
    return Distributions.dfPoisson(this, lambda);
  }
  /**
   * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
   *
   * @param {number} [lambda=1] - Inverse mean (lambda > 0)
   * @return {function}
   */
  dfExponential(lambda) {
    return Distributions.dfExponential(this, lambda);
  }
  // --------------------------------------------------------------------------
  // Misc distributions
  // --------------------------------------------------------------------------
  /**
   * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
   *
   * @param {number} n - Number of dfUniform samples to sum (n >= 0)
   * @return {function}
   */
  dfIrwinHall(n = 1) {
    return Distributions.dfIrwinHall(this, n);
  }
  /**
   * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
   *
   * @param {number} n - Number of dfUniform samples to average (n >= 1)
   * @return {function}
   */
  dfBates(n = 1) {
    return Distributions.dfBates(this, n);
  }
  /**
   * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
   *
   * @param {number} alpha - Alpha
   * @return {function}
   */
  dfPareto(alpha = 1) {
    return Distributions.dfPareto(this, alpha);
  }
  itemByWeight(arr, options, ...argv) {
    return this.dfItemByWeight(arr, options, ...argv)();
  }
  /**
   * returns random weighted item by give array/object
   *
   * @example
   * const obj = {
      a: {
          w: 5,
      },
      b: {
          w: 5,
      },
      c: {
          w: 1,
      },
  }
   * const getWeight = (value, index) => value.w
   * const fn = random.dfItemByWeight(obj, getWeight)
   *
   * console.log(fn())
   *
   * @example
   * const array = [3, 7, 1, 4, 2]
   * const fn = random.dfItemByWeight(array)
   *
   * console.log(fn())
   *
   * @example
   * const array = [3, 7, 1, 4, 2]
   * const getWeight = (value, index) => +index + 1
   * const fn = random.dfItemByWeight(array, getWeight)
   *
   * console.log(fn())
   *
   */
  dfItemByWeight(arr, options, ...argv) {
    return this._callDistributions(Distributions.dfItemByWeight, arr, options, ...argv);
  }
  itemByWeightUnique(arr, size, options, ...argv) {
    return this.dfItemByWeightUnique(arr, size, options, ...argv)();
  }
  dfItemByWeightUnique(arr, size, options, ...argv) {
    return this._callDistributions(Distributions.dfItemByWeightUnique, arr, size, options, ...argv);
  }
  /**
   * returns n random numbers to get a sum k
   *
   * @see https://www.npmjs.com/package/random-sum
   *
   * @example
   * random.sumInt(3, -5)
   * random.sumInt(3, 52)
   */
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
  // --------------------------------------------------------------------------
  // Internal
  // --------------------------------------------------------------------------
  /**
   * Memoizes distributions to ensure they're only created when necessary.
   *
   * Returns a thunk which that returns independent, identically distributed
   * samples from the specified distribution.
   *
   * @private
   *
   * @param {string} label - Name of distribution
   * @param {function} getter - Function which generates a new distribution
   * @param {...*} args - Distribution-specific arguments
   *
   * @return {function}
   */
  _memoize(label, getter, ...args) {
    const key = sharedLib.hashArgv(args);
    let value = this._cache[label];
    if (value === undefined || value.key !== key) {
      value = {
        key,
        // @ts-ignore
        distribution: getter(this, ...args)
      };
      this._cache[label] = value;
    }
    // @ts-ignore
    return value.distribution;
  }
  _memoizeFake(label, getter, ...args) {
    return getter(this, ...args);
  }
  _callDistributions(getter, ...args) {
    return getter(this, ...args);
  }
  /**
   * reset Memoizes distributions
   */
  reset() {
    this._cache = {};
    return this;
  }
  get [Symbol.toStringTag]() {
    var _this$_rng;
    return (_this$_rng = this._rng) === null || _this$_rng === void 0 ? void 0 : _this$_rng.name;
  }
};
tslib.__decorate([coreDecorators.deprecate('not recommended use'), tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], exports.RandomCore.prototype, "patch", null);
tslib.__decorate([coreDecorators.deprecate('not recommended use'), tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], exports.RandomCore.prototype, "unpatch", null);
exports.RandomCore = /*#__PURE__*/tslib.__decorate([coreDecorators.autobind, /*#__PURE__*/tslib.__metadata("design:paramtypes", [Object, Object])], exports.RandomCore);
var RandomCore = exports.RandomCore;

exports.default = RandomCore;
//# sourceMappingURL=index.cjs.development.cjs.map
