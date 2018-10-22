import ow = require("ow-lite");
import { Distributions, IRandomDistributions } from './distributions';
import {
	bates,
	bernoulli,
	binomial,
	exponential,
	geometric,
	irwinHall,
	logNormal,
	normal,
	pareto,
	poisson,
	uniform,
	uniformBoolean,
	uniformInt,
} from './distributions';
import RNGSeedRandom from './generators/seedrandom';

import RNG from './rng'
import RNGFactory, { IRNGFactoryType } from './rng-factory'
import { getClass } from './util';

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
export class Random<R extends RNG = RNG>
{
	protected _patch: typeof Math.random
	protected _cache: {
		[k: string]: {
			key: string,
			distribution: IRandomDistributions<unknown>,
		}
	} = {}

	constructor(rng?: R)
	{
		if (rng) ow(rng, ow.object.instanceOf(RNG))

		this.use(rng)
	}

	protected _rng: R

	/**
	 * @member {Rng} Underlying pseudo-random number generator
	 */
	get rng()
	{
		return this._rng
	}

	/**
	 * @see random.next
	 */
	get random()
	{
		return this.next
	}

	/**
	 * create random numbers like Math.random()
	 *
	 * @see random.next
	 */
	get rand()
	{
		return this.next
	}

	/**
	 * initialize new seeds
	 */
	seed(...argv)
	{
		this._rng.seed(...argv)
		return this
	}

	/**
	 * @see random.srand
	 */
	get srandom()
	{
		return this.srand
	}

	/**
	 * initialize seeds for rand() to create random numbers
	 */
	srand(...argv)
	{
		return this.seed(...argv)
			.next()
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
	clone(seed?, opts?, ...args): Random<R>
	clone<T extends RNG>(seed?, opts?, ...args): Random<T>
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
	clone<T>(seed?: T, ...args)
	{

		let o: typeof Random;

		if (this instanceof Random)
		{
			// @ts-ignore
			o = (this.__proto__.constructor)
		}
		else
		{
			o = Random
		}

		// @ts-ignore
		return new o(this.rng.clone(seed, ...args))
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
	use(arg0: IRNGFactoryType, ...args)
	{
		this._rng = RNGFactory(arg0, ...args)

		return this;
	}

	newUse(arg0: 'seedrandom', ...args): Random<RNGSeedRandom>
	newUse<T extends RNG>(arg0: T, ...args): Random<T>
	newUse(arg0: IRNGFactoryType, ...args): Random<R | any>
	/**
	 * create new Random and use
	 */
	newUse(arg0: IRNGFactoryType, ...args)
	{
		let o: typeof Random = getClass(Random, this)

		return new o(RNGFactory(arg0, ...args));
	}

	/**
	 * clone current Random and use
	 */
	cloneUse<T extends RNG>(arg0: IRNGFactoryType, ...args): Random<T>
	cloneUse(arg0: IRNGFactoryType, ...args): Random<R | any>
	cloneUse(arg0: IRNGFactoryType, ...args)
	{
		let o = this.clone();
		o.use(arg0, ...args);

		return o;
	}

	/**
	 * Patches `Math.random` with this Random instance's PRNG.
	 * @deprecated unsafe method
	 */
	patch()
	{
		if (this._patch)
		{
			throw new Error('Math.random already patched')
		}

		this._patch = Math.random
		// @ts-ignore
		Math.random = this.uniform()
	}

	/**
	 * Restores a previously patched `Math.random` to its original value.
	 *
	 * @deprecated unsafe method
	 */
	unpatch()
	{
		if (this._patch)
		{
			Math.random = this._patch
			delete this._patch
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
	next()
	{
		return this._rng.next()
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
	float(min?: number, max?: number)
	{
		return this.uniform(min, max)()
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
	int(min: number = 100, max?: number)
	{
		return this.uniformInt(min, max)()
	}

	/**
	 * @see `random.int`
	 */
	integer(min?: number, max?: number)
	{
		return this.int(min, max)
	}

	/**
	 * @see `random.boolean`
	 */
	bool(likelihood?: number)
	{
		return this.boolean(likelihood)
	}

	/**
	 * Samples a uniform random boolean value.
	 *
	 * Convence wrapper around `random.uniformBoolean()`
	 *
	 * @return {boolean}
	 */
	boolean(likelihood?: number)
	{
		return this.uniformBoolean(likelihood)()
	}

	/**
	 * random byte
	 */
	byte()
	{
		return this._memoize('byte', Distributions.uniformByte)()
	}

	/**
	 * random bytes, with size
	 *
	 * @example Buffer.from(random.bytes(10)) // => <Buffer 5d 4b 06 94 08 e2 85 5b 79 4f>
	 */
	bytes(size: number = 1)
	{
		return this._memoize('bytes', Distributions.bytes, size)()
	}

	/**
	 * same as crypto.randomBytes(size)
	 *
	 * @param size
	 */
	randomBytes(size?: number)
	{
		return Buffer.from(this.bytes(size))
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
	uniform(min?: number, max?: number)
	{
		return this._memoize('uniform', uniform, min, max)
	}

	/**
	 * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
	 *
	 * @param {number} [min=0] - Lower bound (integer, inclusive)
	 * @param {number} [max=1] - Upper bound (integer, inclusive)
	 * @return {function}
	 */
	uniformInt(min?: number, max?: number)
	{
		return this._memoize('uniformInt', uniformInt, min, max)
	}

	/**
	 * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
	 * with two possible outcomes, `true` or `false.
	 *
	 * This method is analogous to flipping a coin.
	 *
	 * @return {function}
	 */
	uniformBoolean(likelihood?: number)
	{
		return this._memoize('uniformBoolean', uniformBoolean, likelihood)
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
	normal(mu?: number, sigma?: number)
	{
		return normal(this, mu, sigma)
	}

	/**
	 * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
	 *
	 * @param {number} [mu=0] - Mean of underlying normal distribution
	 * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
	 * @return {function}
	 */
	logNormal(mu?: number, sigma?: number)
	{
		return logNormal(this, mu, sigma)
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
	bernoulli(p?: number)
	{
		return bernoulli(this, p)
	}

	/**
	 * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
	 *
	 * @param {number} [n=1] - Number of trials.
	 * @param {number} [p=0.5] - Success probability of each trial.
	 * @return {function}
	 */
	binomial(n?: number, p?: number)
	{
		return binomial(this, n, p)
	}

	/**
	 * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
	 *
	 * @param {number} [p=0.5] - Success probability of each trial.
	 * @return {function}
	 */
	geometric(p?: number)
	{
		return geometric(this, p)
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
	poisson(lambda?: number)
	{
		return poisson(this, lambda)
	}

	/**
	 * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
	 *
	 * @param {number} [lambda=1] - Inverse mean (lambda > 0)
	 * @return {function}
	 */
	exponential(lambda?: number)
	{
		return exponential(this, lambda)
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
	irwinHall(n: number = 1)
	{
		return irwinHall(this, n)
	}

	/**
	 * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
	 *
	 * @param {number} n - Number of uniform samples to average (n >= 1)
	 * @return {function}
	 */
	bates(n: number = 1)
	{
		return bates(this, n)
	}

	/**
	 * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
	 *
	 * @param {number} alpha - Alpha
	 * @return {function}
	 */
	pareto(alpha: number = 1)
	{
		return pareto(this, alpha)
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
	protected _memoize<F extends IRandomDistributions<any>>(label: string, getter: F, ...args): ReturnType<F>
	{
		const key = args.join(';')
		let value = this._cache[label]

		if (value === undefined || value.key !== key)
		{
			// @ts-ignore
			value = { key, distribution: getter(this, ...args) }
			this._cache[label] = value
		}

		// @ts-ignore
		return value.distribution
	}

	/**
	 * reset Memoizes distributions
	 */
	reset()
	{
		this._cache = {};

		return this;
	}

	get [Symbol.toStringTag]()
	{
		return this._rng.name;
	}

}

export const random = new Random()
// @ts-ignore
random.default = random

// defaults to Math.random as its RNG
export default random
// @ts-ignore
Object.freeze(exports)
