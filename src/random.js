"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow = require("ow-lite");
const rng_1 = require("./rng");
const rng_factory_1 = require("./rng-factory");
const uniform_1 = require("./distributions/uniform");
const uniform_int_1 = require("./distributions/uniform-int");
const uniform_boolean_1 = require("./distributions/uniform-boolean");
const normal_1 = require("./distributions/normal");
const log_normal_1 = require("./distributions/log-normal");
const bernoulli_1 = require("./distributions/bernoulli");
const binomial_1 = require("./distributions/binomial");
const geometric_1 = require("./distributions/geometric");
const poisson_1 = require("./distributions/poisson");
const exponential_1 = require("./distributions/exponential");
const irwin_hall_1 = require("./distributions/irwin-hall");
const bates_1 = require("./distributions/bates");
const pareto_1 = require("./distributions/pareto");
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
class Random {
    constructor(rng) {
        if (rng)
            ow(rng, ow.object.instanceOf(rng_1.default));
        this._cache = {};
        this.use(rng);
    }
    /**
     * @member {Rng} Underlying pseudo-random number generator
     */
    get rng() {
        return this._rng;
    }
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
    clone(seed, ...args) {
        let o;
        if (this instanceof Random) {
            // @ts-ignore
            o = (this.__proto__.constructor);
        }
        else {
            o = Random;
        }
        return new o(this.rng.clone(seed, ...args));
    }
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
    use(...args) {
        this._rng = rng_factory_1.default(...args);
    }
    /**
     * Patches `Math.random` with this Random instance's PRNG.
     */
    patch() {
        if (this._patch) {
            throw new Error('Math.random already patched');
        }
        this._patch = Math.random;
        // @ts-ignore
        Math.random = this.uniform();
    }
    /**
     * Restores a previously patched `Math.random` to its original value.
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
     * Samples a uniform random floating point number, optionally specifying
     * lower and upper bounds.
     *
     * Convence wrapper around `random.uniform()`
     *
     * @param {number} [min=0] - Lower bound (float, inclusive)
     * @param {number} [max=1] - Upper bound (float, exclusive)
     * @return {number}
     */
    float(min, max) {
        return this.uniform(min, max)();
    }
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
    int(min, max) {
        return this.uniformInt(min, max)();
    }
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
    integer(min, max) {
        return this.uniformInt(min, max)();
    }
    /**
     * Samples a uniform random boolean value.
     *
     * Convence wrapper around `random.uniformBoolean()`
     *
     * @alias `random.boolean`
     *
     * @return {boolean}
     */
    bool() {
        return this.uniformBoolean()();
    }
    /**
     * Samples a uniform random boolean value.
     *
     * Convence wrapper around `random.uniformBoolean()`
     *
     * @return {boolean}
     */
    boolean() {
        return this.uniformBoolean()();
    }
    // --------------------------------------------------------------------------
    // Uniform distributions
    // --------------------------------------------------------------------------
    /**
     * Generates a [Continuous uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
     *
     * @param {number} [min=0] - Lower bound (float, inclusive)
     * @param {number} [max=1] - Upper bound (float, exclusive)
     * @return {function}
     */
    uniform(min, max) {
        return this._memoize('uniform', uniform_1.default, min, max);
    }
    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {function}
     */
    uniformInt(min, max) {
        return this._memoize('uniformInt', uniform_int_1.default, min, max);
    }
    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
     * with two possible outcomes, `true` or `false.
     *
     * This method is analogous to flipping a coin.
     *
     * @return {function}
     */
    uniformBoolean() {
        return this._memoize('uniformBoolean', uniform_boolean_1.default);
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
    normal(mu, sigma) {
        return normal_1.default(this, mu, sigma);
    }
    /**
     * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
     *
     * @param {number} [mu=0] - Mean of underlying normal distribution
     * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
     * @return {function}
     */
    logNormal(mu, sigma) {
        return log_normal_1.default(this, mu, sigma);
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
    bernoulli(p) {
        return bernoulli_1.default(this, p);
    }
    /**
     * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
     *
     * @param {number} [n=1] - Number of trials.
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    binomial(n, p) {
        return binomial_1.default(this, n, p);
    }
    /**
     * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    geometric(p) {
        return geometric_1.default(this, p);
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
    poisson(lambda) {
        return poisson_1.default(this, lambda);
    }
    /**
     * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
     *
     * @param {number} [lambda=1] - Inverse mean (lambda > 0)
     * @return {function}
     */
    exponential(lambda) {
        return exponential_1.default(this, lambda);
    }
    // --------------------------------------------------------------------------
    // Misc distributions
    // --------------------------------------------------------------------------
    /**
     * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
     *
     * @param {number} n - Number of uniform samples to sum (n >= 0)
     * @return {function}
     */
    irwinHall(n) {
        return irwin_hall_1.default(this, n);
    }
    /**
     * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
     *
     * @param {number} n - Number of uniform samples to average (n >= 1)
     * @return {function}
     */
    bates(n) {
        return bates_1.default(this, n);
    }
    /**
     * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
     *
     * @param {number} alpha - Alpha
     * @return {function}
     */
    pareto(alpha) {
        return pareto_1.default(this, alpha);
    }
    _memoize(label, getter, ...args) {
        const key = `${args.join(';')}`;
        let value = this._cache[label];
        if (value === undefined || value.key !== key) {
            value = { key, distribution: getter(this, ...args) };
            this._cache[label] = value;
        }
        return value.distribution;
    }
}
exports.Random = Random;
exports.random = new Random();
// @ts-ignore
exports.random.default = exports.random;
// defaults to Math.random as its RNG
exports.default = exports.random;
// @ts-ignore
Object.freeze(exports);
