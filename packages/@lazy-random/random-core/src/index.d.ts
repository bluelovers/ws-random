/// <reference types="node" />
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
    constructor(rng?: R, ...argv: any[]);
    protected _init(rng?: R, ...argv: any[]): void;
    /**
     * @member {Rng} Underlying pseudo-random number generator
     */
    get rng(): R;
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
    clone<T>(seed?: T, ...args: any[]): void;
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
    dfBytes(size: number, toStr: true): () => string[];
    dfBytes(size?: number, toStr?: false): () => number[];
    dfBytes(size?: number, toStr?: boolean): (() => string[]) | (() => number[]);
    /**
     * same as crypto.randomBytes(size)
     *
     * @param size
     */
    randomBytes(size?: number): Buffer;
    dfRandomBytes(size?: number): () => Buffer;
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
    uuidv4(toUpperCase?: boolean): string;
    dfUuidv4(toUpperCase?: boolean): () => string;
    arrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size?: number, start?: number, end?: number): number[];
    /**
     * get random index in array
     *
     * @example console.log(random.dfArrayIndex([11, 22, 33], 1, 0));
     */
    dfArrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size?: number, start?: number, end?: number): () => number[];
    arrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size?: number, start?: number, end?: number): number;
    dfArrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, start?: number, end?: number): () => number;
    /**
     * get random item in array
     *
     * @example console.log(random.dfArrayItem([11, 22, 33], 2));
     */
    arrayItem<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, size?: number, start?: number, end?: number): T[];
    dfArrayItem<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, size?: number, start?: number, end?: number): () => T[];
    arrayItemOne<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, start?: number, end?: number): T;
    dfArrayItemOne<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, start?: number, end?: number): () => T;
    /**
     * Shuffle an array
     *
     * @example random.dfArrayShuffle([11, 22, 33])
     */
    arrayShuffle<T extends IArrayInput02<any> | ITSArrayListMaybeReadonly<any>>(arr: T, overwrite?: boolean): T;
    dfArrayShuffle<T extends IArrayInput02<any> | ITSArrayListMaybeReadonly<any>>(arr: T, overwrite?: boolean): () => T;
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
    dfArrayFill(min?: number, max?: number, float?: boolean): <T extends import("@lazy-random/df-array").IArrayInput02<number>>(arr: T) => T;
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
    dfSumInt(size: number, sum?: number, min?: number, max?: number, limit?: number): () => number[];
    sumFloat(size: number, sum?: number, min?: number, max?: number, fractionDigits?: number): number[];
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
    protected _memoizeFake<F extends IRandomDistributions<F>>(label: string, getter: F, ...args: any[]): ReturnType<F>;
    protected _callDistributions<F extends IRandomDistributions<F>>(getter: F, ...args: any[]): ReturnType<F>;
    /**
     * reset Memoizes distributions
     */
    reset(): this;
    get [Symbol.toStringTag](): string;
}
export interface IRandomDistributionsFn<R = any> extends Function {
    (random: RandomCore): R;
    (random: RandomCore, ...argv: any[]): R;
}
export interface IRandomDistributionsCacheRow<F extends IRandomDistributionsFn = IRandomDistributionsFn> {
    key: string;
    distribution: IRandomDistributions<F>;
}
export interface IRandomDistributions<F extends IRandomDistributionsFn = IRandomDistributionsFn> {
    (...argv: Parameters<F>): ReturnType<F>;
    (random: RandomCore, ...argv: any[]): ReturnType<F>;
}
export default RandomCore;
