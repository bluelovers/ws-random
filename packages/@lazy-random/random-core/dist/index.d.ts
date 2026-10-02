import { ENUM_ALPHABET, IArrayInput02 } from '@lazy-random/shared-lib';
import Distributions from '@lazy-random/distributions';
import { RNG } from '@lazy-random/rng-abstract';
import { IArrayUniqueOutOfLimitCallback, IRandIndex } from '@lazy-random/df-array';
import { IObjectInput, IWeightEntrie, IOptionsItemByWeight } from '@lazy-random/df-item-by-weight';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
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
export declare class RandomCore<R extends RNG = RNG> {
    protected _patch: typeof Math.random;
    protected _cache: {
        [k: string]: IRandomDistributionsCacheRow;
    };
    protected _rng: R;
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
    constructor(rng?: R, ...argv: any[]);
    protected _init(rng?: R, ...argv: any[]): void;
    /**
     * @member {Rng} Underlying pseudo-random number generator
     */
    get rng(): R;
    /**
     * 底層亂數產生器 (RNG) 是否支援重新設定種子 (Seed)
     * Whether the underlying RNG supports reseeding
     */
    get seedable(): boolean;
    /**
     * @see random.next
     */
    get random(): () => number;
    /**
     * create random numbers like Math.random()
     *
     * @see random.next
     */
    get rand(): () => number;
    /**
     * initialize new seeds
     */
    seed(...argv: any[]): this;
    /**
     * @see random.srand
     */
    get srandom(): (...argv: any[]) => number;
    /**
     * initialize seeds for rand() to create random numbers
     */
    srand(...argv: any[]): number;
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
    clone<T>(seed?: T, ...args: any[]): void;
    /**
     * 切換底層亂數產生器 (RNG)
     * Switch the underlying RNG
     *
     * 任何輸入都會先經 `expect()` 驗證，非 `RNG` 實例會拋出驗證錯誤
     * Every input is validated by `expect()` first; a non-`RNG` value throws a validation error
     *
     * @param rng - 新的 `RNG` 實例 / the new `RNG` instance
     * @param args - 目前未使用，保留給子類別覆寫 / currently unused, reserved for subclass overrides
     * @returns 回傳自身以便鏈式呼叫 (Chain) / returns `this` for chaining
     */
    use(rng: any, ...args: any[]): this;
    /**
     * create new Random and use
     */
    newUse<R extends RNG>(rng: any, ...args: any[]): RandomCore<R>;
    /**
     * clone current Random and use
     */
    cloneUse<R extends RNG = RNG>(rng: RNG, ...args: any[]): RandomCore<R>;
    /**
     * Patches `Math.random` with this Random instance's PRNG.
     * @deprecated unsafe method
     */
    patch(): void;
    /**
     * Restores a previously patched `Math.random` to its original value.
     *
     * @deprecated unsafe method
     */
    unpatch(): void;
    /**
     * Convenience wrapper around `this.rng.next()`
     *
     * Returns a floating point number in [0, 1).
     *
     * @return {number}
     */
    next(): number;
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
    float(min?: number, max?: number, fractionDigits?: number): number;
    /**
     * TODO: 程式碼預設 `min = 100`，與既有 JSDoc 所述 `[min=0]` 不一致；
     * `max` 未傳入時的實際邊界取決於 `dfUniformInt()` 的行為，需另行確認；僅記錄、不修改邏輯
     * TODO: the code defaults `min = 100`, which contradicts the JSDoc saying `[min=0]`;
     * the actual bounds when `max` is omitted depend on `dfUniformInt()` and need verification; recorded only, logic untouched
     */
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
    int(min?: number, max?: number): number;
    /**
     * @see `random.int`
     */
    integer(min?: number, max?: number): number;
    /**
     * @see `random.boolean`
     */
    bool(likelihood?: number): boolean;
    /**
     * Samples a dfUniform random boolean value.
     *
     * Convence wrapper around `random.dfUniformBoolean()`
     *
     * @return {boolean}
     */
    boolean(likelihood?: number): boolean;
    /**
     * random byte
     */
    byte(toStr: true): string;
    byte(toStr?: false): number;
    byte(toStr?: boolean): string | number;
    /**
     * 取得建立「隨機位元組 (Byte)」分佈的函式；`toStr` 決定產出字串或數字
     * Get a function that builds a random byte distribution; `toStr` decides string vs. number output
     *
     * @param toStr - `true` 時產出字串 / produce a string when `true`
     */
    dfByte(toStr: true): () => string;
    dfByte(toStr?: false): () => number;
    dfByte(toStr?: boolean): (() => string) | (() => number);
    /**
     * random bytes, with size
     *
     * @example Buffer.from(random.bytes(10)) // => <Buffer 5d 4b 06 94 08 e2 85 5b 79 4f>
     */
    bytes(size: number, toStr: true): string[];
    bytes(size?: number, toStr?: false): number[];
    bytes(size?: number, toStr?: boolean): string[] | number[];
    /**
     * 取得建立「隨機位元組 (Byte) 序列」分佈的函式；`size` 為每次產生的數量
     * Get a function that builds a random byte sequence distribution; `size` is the amount produced per call
     *
     * @param size - 每次產生的位元組數 / number of bytes per call
     * @param toStr - `true` 時產出字串陣列 / produce an array of strings when `true`
     */
    dfBytes(size: number, toStr: true): () => string[];
    dfBytes(size?: number, toStr?: false): () => number[];
    dfBytes(size?: number, toStr?: boolean): (() => string[]) | (() => number[]);
    /**
     * same as crypto.randomBytes(size)
     *
     * @param size
     */
    randomBytes(size?: number): Buffer<ArrayBuffer>;
    /**
     * 取得建立 `Buffer` 位元組序列的分佈函式
     * Get a function that builds a distribution producing a `Buffer` of bytes
     *
     * @param size - 每次產生的位元組數 / number of bytes per call
     */
    dfRandomBytes(size?: number): () => Buffer<ArrayBuffer>;
    charID(size: number): string;
    charID(char?: ENUM_ALPHABET | string | Buffer | number, size?: number): string;
    /**
     * generate random by input string, support unicode
     *
     * @example random.dfCharID() // => QcVH6FAi
     */
    dfCharID(size: number): ReturnType<typeof Distributions.dfCharID>;
    /**
     * generate random by input string, support unicode
     *
     * @example random.dfCharID() // => QcVH6FAi
     */
    dfCharID(char?: ENUM_ALPHABET | string | Buffer | number, size?: number): ReturnType<typeof Distributions.dfCharID>;
    /**
     * 產生 UUID v4 字串並立即回傳
     * Generate a UUID v4 string and return it immediately
     *
     * @param toUpperCase - 是否回傳大寫 (Uppercase) / whether to return uppercase
     */
    uuidv4(toUpperCase?: boolean): string;
    /**
     * 取得建立 UUID v4 分佈的函式
     * Get a function that builds a UUID v4 distribution
     *
     * @param toUpperCase - 是否回傳大寫 (Uppercase) / whether to return uppercase
     */
    dfUuidv4(toUpperCase?: boolean): () => string;
    /**
     * 取得陣列中的隨機索引 (Index)，立即回傳結果
     * Get random indices from an array and return the result immediately
     *
     * @param arr - 目標陣列 / target array
     * @param size - 取得的索引數量 / number of indices to draw
     * @param start - 起始位置（含）/ start position (inclusive)
     * @param end - 結束位置 / end position
     */
    arrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size?: number, start?: number, end?: number): number[];
    /**
     * get random index in array
     *
     * @example console.log(random.dfArrayIndex([11, 22, 33], 1, 0));
     */
    dfArrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size?: number, start?: number, end?: number): () => number[];
    /**
     * TODO: `size` 參數未被使用（呼叫 `dfArrayIndexOne()` 時未轉交），疑似 bug；依規範僅記錄、不修改邏輯
     * TODO: the `size` parameter is unused (not forwarded to `dfArrayIndexOne()`); suspected bug, recorded only, logic untouched
     *
     * 取得單一隨機索引 (Index)，立即回傳結果
     * Get a single random index and return it immediately
     *
     * @param arr - 目標陣列 / target array
     * @param size - 目前未生效（見上方 TODO）/ currently ineffective (see TODO above)
     * @param start - 起始位置（含）/ start position (inclusive)
     * @param end - 結束位置 / end position
     */
    arrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size?: number, start?: number, end?: number): number;
    /**
     * 取得建立「單一隨機索引 (Index)」分佈的函式，不使用快取 (Cache)
     * Get a function that builds a single random index distribution, without using the cache
     *
     * @param arr - 目標陣列 / target array
     * @param start - 起始位置（含）/ start position (inclusive)
     * @param end - 結束位置 / end position
     */
    dfArrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, start?: number, end?: number): () => number;
    /**
     * get random item in array
     *
     * @example console.log(random.dfArrayItem([11, 22, 33], 2));
     */
    arrayItem<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, size?: number, start?: number, end?: number): T[];
    /**
     * 取得建立「隨機陣列元素序列」分佈的函式
     * Get a function that builds a distribution producing a sequence of random array elements
     *
     * @param arr - 目標陣列 / target array
     * @param size - 取得的元素數量 / number of elements to draw
     * @param start - 起始位置（含）/ start position (inclusive)
     * @param end - 結束位置 / end position
     */
    dfArrayItem<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, size?: number, start?: number, end?: number): () => T[];
    /**
     * 取得單一隨機陣列元素，立即回傳結果
     * Get a single random array element and return it immediately
     *
     * @param arr - 目標陣列 / target array
     * @param start - 起始位置（含）/ start position (inclusive)
     * @param end - 結束位置 / end position
     */
    arrayItemOne<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, start?: number, end?: number): T;
    /**
     * 取得建立「單一隨機陣列元素」分佈的函式
     * Get a function that builds a single random array element distribution
     *
     * @param arr - 目標陣列 / target array
     * @param start - 起始位置（含）/ start position (inclusive)
     * @param end - 結束位置 / end position
     */
    dfArrayItemOne<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, start?: number, end?: number): () => T;
    /**
     * Shuffle an array
     *
     * @example random.dfArrayShuffle([11, 22, 33])
     */
    arrayShuffle<T extends IArrayInput02<any> | ITSArrayListMaybeReadonly<any>>(arr: T, overwrite?: boolean): T;
    /**
     * 取得建立「洗牌 (Shuffle)」分佈的函式，可選擇是否覆寫原陣列
     * Get a function that builds a shuffle distribution, optionally overwriting the original array
     *
     * @param arr - 目標陣列 / target array
     * @param overwrite - 是否覆寫原陣列 / whether to overwrite the original array
     */
    dfArrayShuffle<T extends IArrayInput02<any> | ITSArrayListMaybeReadonly<any>>(arr: T, overwrite?: boolean): () => T;
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
    arrayUnique<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>): T;
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
    dfArrayUnique<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>): () => T;
    /**
     * fill random value into any array-like object
     *
     * @example
     * arr_bytes = random.dfArrayFill()(new Uint8Array(10))
     * arr_bytes = random.dfArrayFill()(Buffer.alloc(10))
     * arr_ints = random.dfArrayFill(10, 20)(new Array(10)) // => [ 13, 13, 12, 11, 12, 15, 12, 12, 13, 16 ]
     * arr_floats = random.dfArrayFill(10, 20)(new Array(10)) // => [ 14.763857298282993, 10.858143742391624, 17.38883617551437, 15.298810484359247, 16.81798563879964, 16.274271855177005, 18.13149197984974, 13.43840784370765, 14.129283708144884, 11.243691805289316 ]
     */
    arrayFill<T extends IArrayInput02<number>>(arr: T, min?: number, max?: number, float?: boolean): T;
    /**
     * @see arrayFill
     */
    dfArrayFill(min?: number, max?: number, float?: boolean): <T extends IArrayInput02<number>>(arr: T) => T;
    /**
     * Generates a [Continuous dfUniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
     *
     * @param {number} [min=0] - Lower bound (float, inclusive)
     * @param {number} [max=1] - Upper bound (float, exclusive)
     * @return {function}
     */
    dfUniform(min?: number, max?: number, fractionDigits?: number): () => number;
    /**
     * Generates a [Discrete dfUniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {function}
     */
    dfUniformInt(min?: number, max?: number): () => number;
    /**
     * Generates a [Discrete dfUniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
     * with two possible outcomes, `true` or `false.
     *
     * This method is analogous to flipping a coin.
     *
     * @return {function}
     */
    dfUniformBoolean(likelihood?: number): () => boolean;
    /**
     * Generates a [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
     *
     * @param {number} [mu=0] - Mean
     * @param {number} [sigma=1] - Standard deviation
     * @return {function}
     */
    dfNormal(mu?: number, sigma?: number): () => number;
    /**
     * Generates a [Log-dfNormal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
     *
     * @param {number} [mu=0] - Mean of underlying dfNormal distribution
     * @param {number} [sigma=1] - Standard deviation of underlying dfNormal distribution
     * @return {function}
     */
    dfLogNormal(mu?: number, sigma?: number): () => number;
    /**
     * Generates a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    dfBernoulli(p?: number): () => number;
    /**
     * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
     *
     * @param {number} [n=1] - Number of trials.
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    dfBinomial(n?: number, p?: number): () => number;
    /**
     * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    dfGeometric(p?: number): () => number;
    /**
     * Generates a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
     *
     * @param {number} [lambda=1] - Mean (lambda > 0)
     * @return {function}
     */
    dfPoisson(lambda?: number): () => number;
    /**
     * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
     *
     * @param {number} [lambda=1] - Inverse mean (lambda > 0)
     * @return {function}
     */
    dfExponential(lambda?: number): () => number;
    /**
     * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
     *
     * @param {number} n - Number of dfUniform samples to sum (n >= 0)
     * @return {function}
     */
    dfIrwinHall(n?: number): () => number;
    /**
     * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
     *
     * @param {number} n - Number of dfUniform samples to average (n >= 1)
     * @return {function}
     */
    dfBates(n?: number): () => number;
    /**
     * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
     *
     * @param {number} alpha - Alpha
     * @return {function}
     */
    dfPareto(alpha?: number): () => number;
    itemByWeight<T extends unknown>(arr: T[], options?: IOptionsItemByWeight<T>, ...argv: any[]): IWeightEntrie<T>;
    itemByWeight<T extends unknown, K extends string = string>(arr: IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>, ...argv: any[]): IWeightEntrie<T, K>;
    /**
     * returns random weighted item by give array/object
     */
    dfItemByWeight<T extends unknown>(arr: T[], options?: IOptionsItemByWeight<T>, ...argv: any[]): () => IWeightEntrie<T>;
    dfItemByWeight<T extends unknown, K extends string = string>(arr: IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>, ...argv: any[]): () => IWeightEntrie<T, K>;
    /**
     * returns random weighted item by give array/object with size and unique
     */
    itemByWeightUnique<T extends unknown>(arr: T[], size: number, options?: IOptionsItemByWeight<T>, ...argv: any[]): IWeightEntrie<T>[];
    itemByWeightUnique<T extends unknown, K extends string = string>(arr: IObjectInput<T, K>, size: number, options?: IOptionsItemByWeight<T, K>, ...argv: any[]): IWeightEntrie<T, K>[];
    /**
     * returns random weighted item by give array/object with size and unique
     */
    dfItemByWeightUnique<T extends unknown>(arr: T[], size: number, options?: IOptionsItemByWeight<T>, ...argv: any[]): () => IWeightEntrie<T>[];
    dfItemByWeightUnique<T extends unknown, K extends string = string>(arr: IObjectInput<T, K>, size: number, options?: IOptionsItemByWeight<T, K>, ...argv: any[]): () => IWeightEntrie<T, K>[];
    /**
     * returns n random numbers to get a sum k
     *
     * @see https://www.npmjs.com/package/random-sum
     *
     * @example
     * random.sumInt(3, -5)
     * random.sumInt(3, 52)
     */
    sumInt(size: number, sum?: number, min?: number, max?: number, limit?: number): number[];
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
    dfSumInt(size: number, sum?: number, min?: number, max?: number, limit?: number): () => number[];
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
    sumFloat(size: number, sum?: number, min?: number, max?: number, fractionDigits?: number): number[];
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
    dfSumFloat(size: number, sum?: number, min?: number, max?: number, fractionDigits?: number): () => number[];
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
    protected _memoize<F extends IRandomDistributions<F>>(label: string, getter: F, ...args: any[]): ReturnType<F>;
    /**
     * `_memoize()` 的對照版本：刻意不寫入 `_cache` (Cache)，每次呼叫都直接建立新的分佈
     * Counterpart of `_memoize()`: deliberately skips the `_cache` and builds a fresh distribution on every call
     *
     * `label` 僅用於維持與 `_memoize()` 一致的簽章 (Signature)，不參與快取
     * `label` only keeps the signature consistent with `_memoize()` and takes no part in caching
     */
    protected _memoizeFake<F extends IRandomDistributions<F>>(label: string, getter: F, ...args: any[]): ReturnType<F>;
    /**
     * 不經任何快取 (Cache)，直接以傳入參數建立分佈
     * Build a distribution from the given arguments without any caching
     *
     * @param getter - 分佈建立函式 / the distribution builder
     * @param args - 交給分佈建立函式的參數 / arguments passed to the builder
     */
    protected _callDistributions<F extends IRandomDistributions<F>>(getter: F, ...args: any[]): ReturnType<F>;
    /**
     * reset Memoizes distributions
     */
    reset(): this;
    /**
     * 作為 `Object.prototype.toString()` 的字串標籤 (Tag)，回傳底層 RNG 的名稱
     * Serves as the tag for `Object.prototype.toString()`, returning the underlying RNG's name
     *
     * 底層 RNG 未設定名稱時以 `?.` 安全回傳 `undefined`（邊界情況）
     * Falls back safely to `undefined` via `?.` when the underlying RNG has no name (edge case)
     */
    get [Symbol.toStringTag](): string;
}
/**
 * 分佈建立函式的型別 (Type)：可只傳入 `RandomCore`，或再附加任意參數
 * Type of a distribution builder: accepts either just the `RandomCore`, or additional arguments
 */
export interface IRandomDistributionsFn<R = any> extends Function {
    (random: RandomCore): R;
    (random: RandomCore, ...argv: any[]): R;
}
/**
 * 分佈快取 (Cache) 的單一列 (Row)：以 `key` 記錄建立時的參數雜湊 (Hash)，`distribution` 為已建立的分佈
 * A single row in the distribution cache: `key` records the argument hash at creation time and `distribution` holds the built distribution
 */
export interface IRandomDistributionsCacheRow<F extends IRandomDistributionsFn = IRandomDistributionsFn> {
    key: string;
    distribution: IRandomDistributions<F>;
}
/**
 * 分佈函式 (Distribution Function) 的呼叫簽章 (Call Signature)：回傳值與建立函式一致
 * Call signature of a distribution function: the return value matches the builder's
 */
export interface IRandomDistributions<F extends IRandomDistributionsFn = IRandomDistributionsFn> {
    (...argv: Parameters<F>): ReturnType<F>;
    (random: RandomCore, ...argv: any[]): ReturnType<F>;
}
export default RandomCore;
