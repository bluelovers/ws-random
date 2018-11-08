/// <reference types="node" />
import { IRandomDistributions } from './distributions';
import { IArrayUniqueOutOfLimitCallback, IRandIndex } from './distributions/array-unique';
import { IGetWeight, IObjectInput, IWeightEntrie } from './distributions/item-by-weight';
import RNGSeedRandom from './generators/seedrandom';
import RNG from './rng';
import { IRNGFactoryType } from './rng-factory';
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
export declare class Random<R extends RNG = RNG> {
    protected _patch: typeof Math.random;
    protected _cache: {
        [k: string]: {
            key: string;
            distribution: IRandomDistributions<unknown>;
        };
    };
    constructor(rng?: R);
    protected _rng: R;
    /**
     * @member {Rng} Underlying pseudo-random number generator
     */
    readonly rng: R;
    readonly seedable: boolean;
    /**
     * @see random.next
     */
    readonly random: () => number;
    /**
     * create random numbers like Math.random()
     *
     * @see random.next
     */
    readonly rand: () => number;
    /**
     * initialize new seeds
     */
    seed(...argv: any[]): this;
    /**
     * @see random.srand
     */
    readonly srandom: (...argv: any[]) => number;
    /**
     * initialize seeds for rand() to create random numbers
     */
    srand(...argv: any[]): number;
    /**
     * Creates a new `Random` instance, optionally specifying parameters to
     * set a new seed.
     *
     * @see Rng.clone
     *
     * @param {string} [seed] - Optional seed for new RNG.
     * @param {object} [opts] - Optional config for new RNG options.
     * @return {Random}
     */
    clone(seed?: any, opts?: any, ...args: any[]): Random<R>;
    clone<T extends RNG>(seed?: any, opts?: any, ...args: any[]): Random<T>;
    /**
     * Sets the underlying pseudorandom number generator used via
     * either an instance of `seedrandom`, a custom instance of RNG
     * (for PRNG plugins), or a string specifying the PRNG to use
     * along with an optional `seed` and `opts` to initialize the
     * RNG.
     *
     * @example
     * const random = require('random')
     *
     * random.use('xor128', 'foobar')
     * // or
     * random.use(seedrandom('kittens'))
     * // or
     * random.use(Math.random)
     *
     * @param {...*} args
     */
    use(arg0: IRNGFactoryType, ...args: any[]): this;
    newUse(arg0: 'seedrandom', ...args: any[]): Random<RNGSeedRandom>;
    newUse<T extends RNG>(arg0: T, ...args: any[]): Random<T>;
    newUse(arg0: IRNGFactoryType, ...args: any[]): Random<R | any>;
    /**
     * clone current Random and use
     */
    cloneUse<T extends RNG>(arg0: IRNGFactoryType, ...args: any[]): Random<T>;
    cloneUse(arg0: IRNGFactoryType, ...args: any[]): Random<R | any>;
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
     * Samples a uniform random floating point number, optionally specifying
     * lower and upper bounds.
     *
     * Convence wrapper around `random.uniform()`
     *
     * @param {number} [min=0] - Lower bound (float, inclusive)
     * @param {number} [max=1] - Upper bound (float, exclusive)
     * @return {number}
     */
    float(min?: number, max?: number): number;
    /**
     * Samples a uniform random integer, optionally specifying lower and upper
     * bounds.
     *
     * Convence wrapper around `random.uniformInt()`
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
     * Samples a uniform random boolean value.
     *
     * Convence wrapper around `random.uniformBoolean()`
     *
     * @return {boolean}
     */
    boolean(likelihood?: number): boolean;
    /**
     * random byte
     */
    byte(): number;
    /**
     * random bytes, with size
     *
     * @example Buffer.from(random.bytes(10)) // => <Buffer 5d 4b 06 94 08 e2 85 5b 79 4f>
     */
    bytes(size?: number): number[];
    /**
     * same as crypto.randomBytes(size)
     *
     * @param size
     */
    randomBytes(size?: number): Buffer;
    /**
     * get random index in array
     *
     * @example console.log(random.arrayIndex([11, 22, 33], 1, 0));
     */
    arrayIndex<T extends Array<unknown>>(arr: T, size?: number, start?: number, end?: number): number[];
    /**
     * get random item in array
     *
     * @example console.log(random.arrayItem([11, 22, 33], 2));
     */
    arrayItem<T extends unknown>(arr: T[], size?: number, start?: number, end?: number): T[];
    /**
     * Shuffle an array
     *
     * @param arr
     * @param {boolean} overwrite - if true, will change current array
     * @param {function} randIndex - return index by give length
     *
     * @example random.arrayShuffle([11, 22, 33])
     */
    arrayShuffle<T extends unknown>(arr: T[], overwrite?: boolean, randIndex?: (len: number) => number): T[];
    /**
     * Get consecutively unique elements from an array
     *
     * @example
     * let fn = random.arrayUnique([1, 2, 3, 4], 3);
     * console.log(fn(), fn(), fn());
     *
     * // will throw error
     * console.log(fn());
     */
    arrayUnique<T extends unknown>(arr: T[], limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>): () => T;
    /**
     * Generates a [Continuous uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
     *
     * @param {number} [min=0] - Lower bound (float, inclusive)
     * @param {number} [max=1] - Upper bound (float, exclusive)
     * @return {function}
     */
    uniform(min?: number, max?: number): () => number;
    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {function}
     */
    uniformInt(min?: number, max?: number): () => number;
    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
     * with two possible outcomes, `true` or `false.
     *
     * This method is analogous to flipping a coin.
     *
     * @return {function}
     */
    uniformBoolean(likelihood?: number): () => boolean;
    /**
     * Generates a [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
     *
     * @param {number} [mu=0] - Mean
     * @param {number} [sigma=1] - Standard deviation
     * @return {function}
     */
    normal(mu?: number, sigma?: number): () => number;
    /**
     * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
     *
     * @param {number} [mu=0] - Mean of underlying normal distribution
     * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
     * @return {function}
     */
    logNormal(mu?: number, sigma?: number): () => number;
    /**
     * Generates a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    bernoulli(p?: number): () => number;
    /**
     * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
     *
     * @param {number} [n=1] - Number of trials.
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    binomial(n?: number, p?: number): () => number;
    /**
     * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    geometric(p?: number): () => number;
    /**
     * Generates a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
     *
     * @param {number} [lambda=1] - Mean (lambda > 0)
     * @return {function}
     */
    poisson(lambda?: number): () => number;
    /**
     * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
     *
     * @param {number} [lambda=1] - Inverse mean (lambda > 0)
     * @return {function}
     */
    exponential(lambda?: number): () => number;
    /**
     * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
     *
     * @param {number} n - Number of uniform samples to sum (n >= 0)
     * @return {function}
     */
    irwinHall(n?: number): () => number;
    /**
     * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
     *
     * @param {number} n - Number of uniform samples to average (n >= 1)
     * @return {function}
     */
    bates(n?: number): () => number;
    /**
     * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
     *
     * @param {number} alpha - Alpha
     * @return {function}
     */
    pareto(alpha?: number): () => number;
    /**
     * returns random weighted item by give array/object
     */
    itemByWeight<T extends unknown>(arr: T[], getWeight?: IGetWeight<T>, shuffle?: boolean, disableSort?: boolean): () => IWeightEntrie<T>;
    itemByWeight<T extends unknown>(arr: IObjectInput<T>, getWeight?: IGetWeight<T>, shuffle?: boolean, disableSort?: boolean): () => IWeightEntrie<T>;
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
    protected _memoize<F extends IRandomDistributions<any>>(label: string, getter: F, ...args: any[]): ReturnType<F>;
    protected _memoizeFake<T extends Function>(label: string, getter: T, ...args: any[]): ReturnType<T>;
    protected _callDistributions<T extends Function>(getter: T, ...args: any[]): ReturnType<T>;
    /**
     * reset Memoizes distributions
     */
    reset(): this;
    readonly [Symbol.toStringTag]: string;
    protected static default: typeof Random;
}
export declare const random: Random<RNG>;
export default random;
