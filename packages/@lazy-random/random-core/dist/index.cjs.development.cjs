'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sharedLib = require('@lazy-random/shared-lib');
var Distributions = require('@lazy-random/distributions');
var rngAbstract = require('@lazy-random/rng-abstract');

/// <reference types="node" />

/**
 * 取代 `core-decorators` 的 `@autobind` 裝飾器
 *
 * 將原型鏈上的方法綁定到實例，使方法脫離實例呼叫時仍保有正確的 `this`
 * Bind prototype methods onto the instance, so detached calls keep the right `this`
 *
 * 從最衍生的原型開始遍歷，子類別覆寫的方法會優先被綁定
 * Walk from the most derived prototype so subclass overrides win
 *
 * getter/setter（例如 `random`、`rng`）與非方法屬性會被略過
 * Accessors (e.g. `random`, `rng`) and non-method properties are skipped
 */
function autoBindMethods(instance) {
  const bound = new Set();
  let proto = Object.getPrototypeOf(instance);
  while (proto && proto !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      if (key === 'constructor' || bound.has(key)) {
        continue;
      }
      bound.add(key);
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (!desc || typeof desc.value !== 'function') {
        continue;
      }
      Object.defineProperty(instance, key, {
        configurable: true,
        enumerable: desc.enumerable,
        writable: true,
        value: desc.value.bind(instance)
      });
    }
    proto = Object.getPrototypeOf(proto);
  }
  return instance;
}
/**
 * 取代 `core-decorators` 的 `@deprecate` 裝飾器
 *
 * 於方法被呼叫時輸出棄用警告 / Emit a deprecation warning when the method is called
 */
function deprecateWarning(method, message) {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn(`DEPRECATION WARNING: '${method}' is deprecated. ${message}.`);
  }
}
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
class RandomCore {
  _cache = {};
  /**
   * 建立實例：先綁定原型方法，再由 `_init()` 解析底層亂數產生器 (RNG)
   * Create an instance: bind prototype methods first, then resolve the underlying RNG in `_init()`
   *
   * 先綁定再初始化，可確保整個 `_init()` 流程（含子類別覆寫的方法）都保有正確的 `this`
   * Binding before initialization keeps the right `this` throughout `_init()` (including subclass overrides)
   *
   * @param rng - 底層亂數產生器 (RNG) / the underlying RNG
   * @param argv - 轉交 `_init()` 的額外參數 / extra arguments forwarded to `_init()`
   */
  constructor(rng, ...argv) {
    autoBindMethods(this);
    this._init(rng, ...argv);
  }
  _init(rng, ...argv) {
    if (rng) {
      /**
       * 改用 `@lazy-random/rng-abstract` 自帶的 `_assertInstanceOfRNG()` 驗證，
       * 以品牌鍵 (Brand Key) 補足原生 `instanceof` 比對，避免 ESM / CJS 重複載入時
       * 同一個別被當成不同個體而誤判失敗；
       * 顯式傳入 `<R>` 讓收窄 (Narrowing) 結果與 `_init()` 的 `R` 一致。
       * Uses the package's own `_assertInstanceOfRNG()`: the brand check backs up the native
       * constructor comparison so a duplicate ESM/CJS copy is not misjudged; the explicit
       * `<R>` keeps the narrowed type aligned with the `R` used by `_init()`.
       */
      rngAbstract._assertInstanceOfRNG(rng);
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
  srand(...argv) {
    return this.seed(...argv).next();
  }
  /**
   * 複製目前實例（可指定新的種子 (Seed)）
   * Clone the current instance (optionally with a new seed)
   *
   * `RandomCore` 本體不提供實作，交由子類別決定如何複製
   * `RandomCore` itself provides no implementation; subclasses decide how to clone
   *
   * @param seed - 新實例使用的種子 (Seed) / seed for the new instance
   * @throws 恆拋出 `not implemented` / always throws `not implemented`
   */
  clone(seed, ...args) {
    throw new Error(`not implemented`);
  }
  /**
   * 切換底層亂數產生器 (RNG)
   * Switch the underlying RNG
   *
   * 任何輸入都會先經 `_assertInstanceOfRNG()` 驗證，非 `RNG` 實例會拋出 `RNGInstanceOfError`
   * Every input is validated by `_assertInstanceOfRNG()` first; a non-`RNG` value throws an `RNGInstanceOfError`
   *
   * @param rng - 新的 `RNG` 實例 / the new `RNG` instance
   * @param args - 目前未使用，保留給子類別覆寫 / currently unused, reserved for subclass overrides
   * @returns 回傳自身以便鏈式呼叫 (Chain) / returns `this` for chaining
   */
  use(rng, ...args) {
    /**
     * 改用 `@lazy-random/rng-abstract` 自帶的 `_assertInstanceOfRNG()` 驗證：
     * 品牌鍵 (Brand Key) 檢查不比對建構子個體，
     * 因此從 ESM / CJS 重複載入的另一份套件取得的 RNG 也不會被誤判為「不是實例」。
     * Uses the package's own `_assertInstanceOfRNG()`: the brand-key check does not compare
     * constructor identities, so an RNG obtained from a duplicated ESM/CJS copy of this
     * package is not rejected as "not an instance".
     *
     * 必須維持在 `this._rng` 賦值之前，失敗時才不會改動既有的底層 RNG，
     * 顯式傳入 `<R>` 則讓收窄後的型別仍可賦值給 `_rng: R`。
     * It must stay before the `this._rng` assignment so a failure leaves the current RNG untouched,
     * and the explicit `<R>` keeps the narrowed type assignable to `_rng: R`.
     */
    rngAbstract._assertInstanceOfRNG(rng);
    this._rng = rng;
    return this;
  }
  newUse(rng, ...args) {
    throw new Error(`not implemented`);
  }
  cloneUse(rng, ...args) {
    throw new Error(`not implemented`);
  }
  /**
   * Patches `Math.random` with this Random instance's PRNG.
   * @deprecated unsafe method
   */
  patch() {
    deprecateWarning('patch', 'not recommended use');
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
    deprecateWarning('unpatch', 'not recommended use');
    if (this._patch) {
      Math.random = this._patch;
      delete this._patch;
    }
  }
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
  /**
   * 取得建立「隨機位元組 (Byte)」分佈的函式；`toStr` 決定產出字串或數字
   * Get a function that builds a random byte distribution; `toStr` decides string vs. number output
   *
   * @param toStr - `true` 時產出字串 / produce a string when `true`
   */

  dfByte(toStr) {
    return this._memoize('byte', Distributions.dfUniformByte, toStr);
  }
  /**
   * random bytes, with size
   *
   * @example Buffer.from(random.bytes(10)) // => <Buffer 5d 4b 06 94 08 e2 85 5b 79 4f>
   */

  bytes(size = 1, toStr) {
    return this.dfBytes(size, toStr)();
  }
  /**
   * 取得建立「隨機位元組 (Byte) 序列」分佈的函式；`size` 為每次產生的數量
   * Get a function that builds a random byte sequence distribution; `size` is the amount produced per call
   *
   * @param size - 每次產生的位元組數 / number of bytes per call
   * @param toStr - `true` 時產出字串陣列 / produce an array of strings when `true`
   */

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
  /**
   * 取得建立 `Buffer` 位元組序列的分佈函式
   * Get a function that builds a distribution producing a `Buffer` of bytes
   *
   * @param size - 每次產生的位元組數 / number of bytes per call
   */
  dfRandomBytes(size) {
    let fn = this.dfBytes(size);
    let warp = () => () => Buffer.from(fn());
    return this._memoize('dfRandomBytes', warp, size);
  }
  /**
   * 依字元集 (Alphabet) 產生隨機字串 ID，並立即回傳結果
   * Generate a random string ID from an alphabet and return it immediately
   *
   * 多載 (Overload)：可只傳入長度，或傳入字元集搭配長度
   * Overloads: pass a length only, or an alphabet together with a length
   *
   * @param char - 字元集來源：`ENUM_ALPHABET`、字串、`Buffer`，為數字時視為長度 / alphabet source: `ENUM_ALPHABET`, string, or `Buffer`; a number is treated as the length
   * @param size - 產生的字串長度 / length of the generated string
   */
  charID(char, size) {
    return Distributions.dfCharID(this, char, size)();
  }
  /**
   * generate random by input string, support unicode
   *
   * @example random.dfCharID() // => QcVH6FAi
   */

  /**
   * generate random by input string, support unicode
   *
   * @example random.dfCharID() // => QcVH6FAi
   */

  /**
   * generate random by input string, support unicode
   *
   * @example random.dfCharID() // => QcVH6FAi
   */
  dfCharID(char, size) {
    return this._memoize('dfCharID', Distributions.dfCharID, char, size);
  }
  /**
   * 產生 UUID v4 字串並立即回傳
   * Generate a UUID v4 string and return it immediately
   *
   * @param toUpperCase - 是否回傳大寫 (Uppercase) / whether to return uppercase
   */
  uuidv4(toUpperCase) {
    return this.dfUuidv4(toUpperCase)();
  }
  /**
   * 取得建立 UUID v4 分佈的函式
   * Get a function that builds a UUID v4 distribution
   *
   * @param toUpperCase - 是否回傳大寫 (Uppercase) / whether to return uppercase
   */
  dfUuidv4(toUpperCase) {
    return this._memoize('uuidv4', Distributions.dfUuidV4, toUpperCase);
  }
  /**
   * 取得陣列中的隨機索引 (Index)，立即回傳結果
   * Get random indices from an array and return the result immediately
   *
   * @param arr - 目標陣列 / target array
   * @param size - 取得的索引數量 / number of indices to draw
   * @param start - 起始位置（含）/ start position (inclusive)
   * @param end - 結束位置 / end position
   */
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
  /**
   * 取得單一隨機索引 (Index)，立即回傳結果
   * Get a single random index and return it immediately
   *
   * @param arr - 目標陣列 / target array
   * @param start - 起始位置（含）/ start position (inclusive)
   * @param end - 結束位置 / end position
   */
  arrayIndexOne(arr, start = 0, end) {
    return this.dfArrayIndexOne(arr, start, end)();
  }
  /**
   * 取得建立「單一隨機索引 (Index)」分佈的函式，不使用快取 (Cache)
   * Get a function that builds a single random index distribution, without using the cache
   *
   * @param arr - 目標陣列 / target array
   * @param start - 起始位置（含）/ start position (inclusive)
   * @param end - 結束位置 / end position
   */
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
  /**
   * 取得建立「隨機陣列元素序列」分佈的函式
   * Get a function that builds a distribution producing a sequence of random array elements
   *
   * @param arr - 目標陣列 / target array
   * @param size - 取得的元素數量 / number of elements to draw
   * @param start - 起始位置（含）/ start position (inclusive)
   * @param end - 結束位置 / end position
   */
  dfArrayItem(arr, size = 1, start = 0, end) {
    const fn = this.dfArrayIndex(arr, size, start, end);
    return () => {
      return fn().reduce(function (a, idx) {
        a.push(arr[idx]);
        return a;
      }, []);
    };
  }
  /**
   * 取得單一隨機陣列元素，立即回傳結果
   * Get a single random array element and return it immediately
   *
   * @param arr - 目標陣列 / target array
   * @param start - 起始位置（含）/ start position (inclusive)
   * @param end - 結束位置 / end position
   */
  arrayItemOne(arr, start = 0, end) {
    return this.dfArrayItemOne(arr, start, end)();
  }
  /**
   * 取得建立「單一隨機陣列元素」分佈的函式
   * Get a function that builds a single random array element distribution
   *
   * @param arr - 目標陣列 / target array
   * @param start - 起始位置（含）/ start position (inclusive)
   * @param end - 結束位置 / end position
   */
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
  /**
   * 取得建立「洗牌 (Shuffle)」分佈的函式，可選擇是否覆寫原陣列
   * Get a function that builds a shuffle distribution, optionally overwriting the original array
   *
   * @param arr - 目標陣列 / target array
   * @param overwrite - 是否覆寫原陣列 / whether to overwrite the original array
   */
  dfArrayShuffle(arr, overwrite) {
    return this._callDistributions(Distributions.dfArrayShuffle, arr, overwrite);
  }
  /**
   * 連續不重複地取得陣列元素，立即回傳結果
   * Draw consecutively unique array elements and return the result immediately
   *
   * @param arr - 目標陣列 / target array
   * @param limit - 允許連續取樣的次數上限 / maximum number of consecutive draws
   * @param loop - 超過上限時是否循環重來 / whether to restart when the limit is exceeded
   * @param fnRandIndex - 自訂索引取得方式 / custom index getter
   * @param fnOutOfLimit - 超過上限時的處理回呼，預設行為由 `dfArrayUnique()` 決定 / callback invoked when the limit is exceeded; the default behavior is decided by `dfArrayUnique()`
   */
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
  /**
   * 依權重 (Weight) 從陣列或物件隨機取得一個項目，立即回傳結果
   * Randomly pick one item from an array or object by weight and return it immediately
   *
   * @param arr - 陣列或物件輸入 / array or object input
   * @param options - 取樣選項 (Options)，可含自訂權重取得方式 / sampling options, may include a custom weight getter
   * @param argv - 額外參數，轉交 `dfItemByWeight()` / extra arguments forwarded to `dfItemByWeight()`
   */
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
  /**
   * 取得建立「指定總和的隨機整數列」分佈的函式，行為同 `sumInt()`
   * Get a function that builds a distribution of random integers with a target sum; same behavior as `sumInt()`
   *
   * @param size - 整數的個數 / number of integers
   * @param sum - 目標總和 / target sum
   * @param min - 單一數值下界（含）/ lower bound per value (inclusive)
   * @param max - 單一數值上界 / upper bound per value
   * @param limit - 重試次數上限 / maximum number of retries
   */
  dfSumInt(size, sum, min, max, limit) {
    return this._memoize('sumInt', Distributions.dfRandSumInt, size, sum, min, max, limit);
  }
  /**
   * 產生總和為指定值的隨機浮點數列，立即回傳結果
   * Produce random floating point numbers that add up to a target sum, returning the result immediately
   *
   * @param size - 浮點數的個數 / number of floats
   * @param sum - 目標總和 / target sum
   * @param min - 單一數值下界（含）/ lower bound per value (inclusive)
   * @param max - 單一數值上界 / upper bound per value
   * @param fractionDigits - 保留的小數位數 / number of fraction digits to keep
   */
  sumFloat(size, sum, min, max, fractionDigits) {
    return this.dfSumFloat(size, sum, min, max, fractionDigits)();
  }
  /**
   * 取得建立「指定總和的隨機浮點數列」分佈的函式，行為同 `sumFloat()`
   * Get a function that builds a distribution of random floats with a target sum; same behavior as `sumFloat()`
   *
   * @param size - 浮點數的個數 / number of floats
   * @param sum - 目標總和 / target sum
   * @param min - 單一數值下界（含）/ lower bound per value (inclusive)
   * @param max - 單一數值上界 / upper bound per value
   * @param fractionDigits - 保留的小數位數 / number of fraction digits to keep
   */
  dfSumFloat(size, sum, min, max, fractionDigits) {
    return this._memoize('sumFloat', Distributions.dfRandSumFloat, size, sum, min, max, fractionDigits);
  }
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
  /**
   * 不經任何快取 (Cache)，直接以傳入參數建立分佈
   * Build a distribution from the given arguments without any caching
   *
   * @param getter - 分佈建立函式 / the distribution builder
   * @param args - 交給分佈建立函式的參數 / arguments passed to the builder
   */
  _callDistributions(getter, ...args) {
    return getter(this, ...args);
  }
  reset() {
    this._cache = {};
    return this;
  }
  get [Symbol.toStringTag]() {
    var _this$_rng;
    return (_this$_rng = this._rng) === null || _this$_rng === void 0 ? void 0 : _this$_rng.name;
  }
}

exports.RandomCore = RandomCore;
exports.default = RandomCore;
//# sourceMappingURL=index.cjs.development.cjs.map
