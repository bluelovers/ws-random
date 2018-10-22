Object.defineProperty(exports, "__esModule", { value: true });
const ow = require("ow-lite");
const distributions_1 = require("./distributions");
const distributions_2 = require("./distributions");
const rng_1 = require("./rng");
const rng_factory_1 = require("./rng-factory");
const util_1 = require("./util");
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
        this._cache = {};
        if (rng)
            ow(rng, ow.object.instanceOf(rng_1.default));
        this.use(rng);
    }
    /**
     * @member {Rng} Underlying pseudo-random number generator
     */
    get rng() {
        return this._rng;
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
        return this.seed(...argv)
            .next();
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
        // @ts-ignore
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
    use(arg0, ...args) {
        this._rng = rng_factory_1.default(arg0, ...args);
        return this;
    }
    /**
     * create new Random and use
     */
    newUse(arg0, ...args) {
        let o = util_1.getClass(Random, this);
        return new o(rng_factory_1.default(arg0, ...args));
    }
    cloneUse(arg0, ...args) {
        let o = this.clone();
        o.use(arg0, ...args);
        return o;
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
        Math.random = this.uniform();
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
    int(min = 100, max) {
        return this.uniformInt(min, max)();
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
     * Samples a uniform random boolean value.
     *
     * Convence wrapper around `random.uniformBoolean()`
     *
     * @return {boolean}
     */
    boolean(likelihood) {
        return this.uniformBoolean(likelihood)();
    }
    /**
     * random byte
     */
    byte() {
        return this._memoize('byte', distributions_1.Distributions.uniformByte)();
    }
    /**
     * random bytes, with size
     *
     * @example Buffer.from(random.bytes(10)) // => <Buffer 5d 4b 06 94 08 e2 85 5b 79 4f>
     */
    bytes(size = 1) {
        return this._memoize('bytes', distributions_1.Distributions.bytes, size)();
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
     * get random index in array
     *
     * @example console.log(random.arrayIndex([11, 22, 33], 1, 0));
     */
    arrayIndex(arr, size = 1, start = 0, end) {
        // @ts-ignore
        return this._memoize('arrayIndex', distributions_1.Distributions.arrayIndex, size, start, end)(arr);
    }
    /**
     * get random item in array
     *
     * @example console.log(random.arrayItem([11, 22, 33], 2));
     */
    arrayItem(arr, size = 1, start = 0, end) {
        let ids = this.arrayIndex(arr, size, start, end);
        return ids.reduce(function (a, idx) {
            a.push(arr[idx]);
            return a;
        }, []);
    }
    /**
     * Shuffle an array
     *
     * @param arr
     * @param {boolean} overwrite - if true, will change current array
     *
     * @example random.arrayShuffle([11, 22, 33])
     */
    arrayShuffle(arr, overwrite) {
        let fn = this.uniformInt(-1, 1);
        return (overwrite ? arr : arr.slice())
            .sort(function () {
            return fn();
        });
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
        return this._memoize('uniform', distributions_2.uniform, min, max);
    }
    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
     *
     * @param {number} [min=0] - Lower bound (integer, inclusive)
     * @param {number} [max=1] - Upper bound (integer, inclusive)
     * @return {function}
     */
    uniformInt(min, max) {
        return this._memoize('uniformInt', distributions_2.uniformInt, min, max);
    }
    /**
     * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
     * with two possible outcomes, `true` or `false.
     *
     * This method is analogous to flipping a coin.
     *
     * @return {function}
     */
    uniformBoolean(likelihood) {
        return this._memoize('uniformBoolean', distributions_2.uniformBoolean, likelihood);
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
        return distributions_2.normal(this, mu, sigma);
    }
    /**
     * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
     *
     * @param {number} [mu=0] - Mean of underlying normal distribution
     * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
     * @return {function}
     */
    logNormal(mu, sigma) {
        return distributions_2.logNormal(this, mu, sigma);
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
        return distributions_2.bernoulli(this, p);
    }
    /**
     * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
     *
     * @param {number} [n=1] - Number of trials.
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    binomial(n, p) {
        return distributions_2.binomial(this, n, p);
    }
    /**
     * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
     *
     * @param {number} [p=0.5] - Success probability of each trial.
     * @return {function}
     */
    geometric(p) {
        return distributions_2.geometric(this, p);
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
        return distributions_2.poisson(this, lambda);
    }
    /**
     * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
     *
     * @param {number} [lambda=1] - Inverse mean (lambda > 0)
     * @return {function}
     */
    exponential(lambda) {
        return distributions_2.exponential(this, lambda);
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
    irwinHall(n = 1) {
        return distributions_2.irwinHall(this, n);
    }
    /**
     * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
     *
     * @param {number} n - Number of uniform samples to average (n >= 1)
     * @return {function}
     */
    bates(n = 1) {
        return distributions_2.bates(this, n);
    }
    /**
     * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
     *
     * @param {number} alpha - Alpha
     * @return {function}
     */
    pareto(alpha = 1) {
        return distributions_2.pareto(this, alpha);
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
        const key = args.join(';');
        let value = this._cache[label];
        if (value === undefined || value.key !== key) {
            // @ts-ignore
            value = { key, distribution: getter(this, ...args) };
            this._cache[label] = value;
        }
        // @ts-ignore
        return value.distribution;
    }
    /**
     * reset Memoizes distributions
     */
    reset() {
        this._cache = {};
        return this;
    }
    get [Symbol.toStringTag]() {
        return this._rng.name;
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
