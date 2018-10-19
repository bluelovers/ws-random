import RNG from './rng';
export interface IRandomDistributions<R = any> {
    (): R;
    (...argv: any[]): R;
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
export declare class Random<R extends RNG> {
    protected _rng: R;
    protected _patch: typeof Math.random;
    protected _cache: {
        [k: string]: {
            key: string;
            distribution: IRandomDistributions;
        };
    };
    constructor(rng?: RNG);
    /**
     * @member {Rng} Underlying pseudo-random number generator
     */
    readonly rng: R;
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
    use(...args: any[]): void;
    /**
     * Patches `Math.random` with this Random instance's PRNG.
     */
    patch(): void;
    /**
     * Restores a previously patched `Math.random` to its original value.
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
    float(min: any, max: any): (random: RNG, min?: number, max?: number) => () => number;
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
    int(min: any, max: any): (random: RNG, min?: number, max?: number) => () => number;
    /**
     * Samples a uniform random integer, optionally specifying lower and upper
     * bounds.
     *
     * Convence wrapper around `random.uniformInt()`
     *
     * @alias `random.int`
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {number}
     */
    integer(min: any, max: any): (random: RNG, min?: number, max?: number) => () => number;
    /**
     * Samples a uniform random boolean value.
     *
     * Convence wrapper around `random.uniformBoolean()`
     *
     * @alias `random.boolean`
     *
     * @return {boolean}
     */
    bool(): (random: RNG) => () => boolean;
    /**
     * Samples a uniform random boolean value.
     *
     * Convence wrapper around `random.uniformBoolean()`
     *
     * @return {boolean}
     */
    boolean(): (random: RNG) => () => boolean;
    /**
     * Generates a [Continuous uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
     *
     * @param {number} [min=0] - Lower bound (float, inclusive)
     * @param {number} [max=1] - Upper bound (float, exclusive)
     * @return {function}
     */
    uniform(min?: number, max?: number): IRandomDistributions<(random: RNG, min?: number, max?: number) => () => number>;
    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {function}
     */
    uniformInt(min?: number, max?: number): IRandomDistributions<(random: RNG, min?: number, max?: number) => () => number>;
    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
     * with two possible outcomes, `true` or `false.
     *
     * This method is analogous to flipping a coin.
     *
     * @return {function}
     */
    uniformBoolean(): IRandomDistributions<(random: RNG) => () => boolean>;
    /**
     * Generates a [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
     *
     * @param {number} [mu=0] - Mean
     * @param {number} [sigma=1] - Standard deviation
     * @return {function}
     */
    normal(mu: any, sigma: any): () => number;
    /**
     * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
     *
     * @param {number} [mu=0] - Mean of underlying normal distribution
     * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
     * @return {function}
     */
    logNormal(mu: any, sigma: any): () => number;
    /**
     * Generates a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    bernoulli(p: any): () => number;
    /**
     * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
     *
     * @param {number} [n=1] - Number of trials.
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    binomial(n: any, p: any): () => number;
    /**
     * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    geometric(p: any): () => number;
    /**
     * Generates a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
     *
     * @param {number} [lambda=1] - Mean (lambda > 0)
     * @return {function}
     */
    poisson(lambda: any): () => number;
    /**
     * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
     *
     * @param {number} [lambda=1] - Inverse mean (lambda > 0)
     * @return {function}
     */
    exponential(lambda: any): () => number;
    /**
     * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
     *
     * @param {number} n - Number of uniform samples to sum (n >= 0)
     * @return {function}
     */
    irwinHall(n: any): () => number;
    /**
     * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
     *
     * @param {number} n - Number of uniform samples to average (n >= 1)
     * @return {function}
     */
    bates(n: any): () => number;
    /**
     * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
     *
     * @param {number} alpha - Alpha
     * @return {function}
     */
    pareto(alpha: any): () => number;
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
    _memoize<F extends IRandomDistributions>(label: string, getter: F, ...args: any[]): ReturnType<F>;
    _memoize<F extends unknown>(label: string, getter: F, ...args: any[]): IRandomDistributions<F>;
}
export declare const random: Random<RNG>;
export default random;
