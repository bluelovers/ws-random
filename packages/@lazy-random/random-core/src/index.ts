/// <reference types="node" />
import { expect } from '@lazy-random/expect';
import { autobind, deprecate } from 'core-decorators';
import { ENUM_ALPHABET, IArrayInput02, hashArgv } from '@lazy-random/shared-lib';
import Distributions from '@lazy-random/distributions';
import { RNG, IRNGLike } from '@lazy-random/rng-abstract'
import { IArrayUniqueOutOfLimitCallback, IRandIndex } from '@lazy-random/df-array';
import { IObjectInput, IWeightEntrie, IGetWeight, IOptionsItemByWeight } from '@lazy-random/df-item-by-weight';
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
@autobind
export class RandomCore<R extends RNG = RNG>
{
	protected _patch: typeof Math.random;
	protected _cache: {
		[k: string]: IRandomDistributionsCacheRow
	} = {};

	protected _rng: R

	constructor(rng?: R, ...argv: any[])
	{
		this._init(rng, ...argv)
	}

	protected _init(rng?: R, ...argv: any[])
	{
		if (rng)
		{
			//ow(rng, ow.object.instanceOf(RNG))
			expect(rng).instanceof(RNG)
		}
		else
		{

		}

		this.use(rng)
	}

	/**
	 * @member {Rng} Underlying pseudo-random number generator
	 */
	get rng()
	{
		return this._rng
	}

	public get seedable(): boolean
	{
		return this._rng.seedable
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

	clone<T>(seed?: T, ...args)
	{
		throw new Error(`not implemented`)
	}

	use(rng: any, ...args: any[])
	{
		expect(rng).instanceof(RNG)

		this._rng = rng

		return this;
	}

	/**
	 * create new Random and use
	 */
	newUse<R extends RNG>(rng: any, ...args: any[]): RandomCore<R>
	{
		throw new Error(`not implemented`)
	}

	/**
	 * clone current Random and use
	 */
	cloneUse<R extends RNG = RNG>(rng: RNG, ...args): RandomCore<R>
	{
		throw new Error(`not implemented`)
	}

	/**
	 * Patches `Math.random` with this Random instance's PRNG.
	 * @deprecated unsafe method
	 */
	@deprecate('not recommended use')
	patch()
	{
		if (this._patch)
		{
			throw new Error('Math.random already patched')
		}

		this._patch = Math.random
		// @ts-ignore
		Math.random = this.dfUniform()
	}

	/**
	 * Restores a previously patched `Math.random` to its original value.
	 *
	 * @deprecated unsafe method
	 */
	@deprecate('not recommended use')
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
	 * Samples a dfUniform random floating point number, optionally specifying
	 * lower and upper bounds.
	 *
	 * Convence wrapper around `random.dfUniform()`
	 *
	 * @param {number} [min=0] - Lower bound (float, inclusive)
	 * @param {number} [max=1] - Upper bound (float, exclusive)
	 * @return {number}
	 */
	float(min?: number, max?: number, fractionDigits?: number)
	{
		return this.dfUniform(min, max, fractionDigits)()
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
	int(min: number = 100, max?: number)
	{
		return this.dfUniformInt(min, max)()
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
	 * Samples a dfUniform random boolean value.
	 *
	 * Convence wrapper around `random.dfUniformBoolean()`
	 *
	 * @return {boolean}
	 */
	boolean(likelihood?: number)
	{
		return this.dfUniformBoolean(likelihood)()
	}

	/**
	 * random byte
	 */
	byte(toStr: true): string
	byte(toStr?: false): number
	byte(toStr?: boolean): string | number
	byte(toStr?: boolean)
	{
		return this.dfByte(toStr)()
	}

	dfByte(toStr: true): () => string
	dfByte(toStr?: false): () => number
	dfByte(toStr?: boolean): (() => string) | (() => number)
	dfByte(toStr?: boolean)
	{
		return this._memoize('byte', Distributions.dfUniformByte, toStr)
	}

	/**
	 * random bytes, with size
	 *
	 * @example Buffer.from(random.bytes(10)) // => <Buffer 5d 4b 06 94 08 e2 85 5b 79 4f>
	 */
	bytes(size: number, toStr: true): string[]
	bytes(size?: number, toStr?: false): number[]
	bytes(size?: number, toStr?: boolean): string[] | number[]
	bytes(size: number = 1, toStr?: boolean)
	{
		return this.dfBytes(size, toStr)()
	}

	dfBytes(size: number, toStr: true): () => string[]
	dfBytes(size?: number, toStr?: false): () => number[]
	dfBytes(size?: number, toStr?: boolean): (() => string[]) | (() => number[])
	dfBytes(size: number = 1, toStr?: boolean)
	{
		return this._memoize('bytes', Distributions.dfUniformBytes, size, toStr)
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

	dfRandomBytes(size?: number)
	{
		let fn = this.dfBytes(size);
		let warp = () => () => Buffer.from(fn());
		return this._memoize('dfRandomBytes', warp, size)
	}

	charID(size: number): string
	charID(char?: ENUM_ALPHABET | string | Buffer | number, size?: number): string
	charID(char?: ENUM_ALPHABET | string | Buffer | number, size?: number)
	{
		return Distributions.dfCharID(this, char, size)()
	}

	/**
	 * generate random by input string, support unicode
	 *
	 * @example random.dfCharID() // => QcVH6FAi
	 */
	dfCharID(size: number): ReturnType<typeof Distributions.dfCharID>
	/**
	 * generate random by input string, support unicode
	 *
	 * @example random.dfCharID() // => QcVH6FAi
	 */
	dfCharID(char?: ENUM_ALPHABET | string | Buffer | number, size?: number): ReturnType<typeof Distributions.dfCharID>
	/**
	 * generate random by input string, support unicode
	 *
	 * @example random.dfCharID() // => QcVH6FAi
	 */
	dfCharID(char?: ENUM_ALPHABET | string | Buffer | number, size?: number)
	{
		return this._memoize('dfCharID', Distributions.dfCharID, char, size)
	}

	uuidv4(toUpperCase?: boolean)
	{
		return this.dfUuidv4(toUpperCase)()
	}

	dfUuidv4(toUpperCase?: boolean)
	{
		return this._memoize('uuidv4', Distributions.dfUuidV4, toUpperCase)
	}

	arrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size: number = 1, start: number = 0, end?: number)
	{
		return this.dfArrayIndex(arr, size, start, end)()
	}

	/**
	 * get random index in array
	 *
	 * @example console.log(random.dfArrayIndex([11, 22, 33], 1, 0));
	 */
	dfArrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size: number = 1, start: number = 0, end?: number)
	{
		return this._memoizeFake('dfArrayIndex', Distributions.dfArrayIndex, arr, size, start, end)
	}

	arrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, size: number = 1, start: number = 0, end?: number)
	{
		return this.dfArrayIndexOne(arr, start, end)()
	}

	dfArrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, start: number = 0, end?: number)
	{
		return this._memoizeFake('dfArrayIndexOne', Distributions.dfArrayIndexOne, arr, start, end)
	}

	/**
	 * get random item in array
	 *
	 * @example console.log(random.dfArrayItem([11, 22, 33], 2));
	 */
	arrayItem<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, size: number = 1, start: number = 0, end?: number)
	{
		return this.dfArrayItem(arr, size, start, end)()
	}

	dfArrayItem<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, size: number = 1, start: number = 0, end?: number)
	{
		const fn = this.dfArrayIndex(arr, size, start, end)

		return () => {
			return fn().reduce(function (a, idx)
			{
				a.push(arr[idx])

				return a;
			}, [] as T[])
		}
	}

	arrayItemOne<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, start: number = 0, end?: number)
	{
		return this.dfArrayItemOne(arr, start, end)()
	}

	dfArrayItemOne<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, start: number = 0, end?: number)
	{
		const fn = this.dfArrayIndexOne(arr, start, end);
		return () => arr[fn()]
	}

	/**
	 * Shuffle an array
	 *
	 * @example random.dfArrayShuffle([11, 22, 33])
	 */
	arrayShuffle<T extends IArrayInput02<any> | ITSArrayListMaybeReadonly<any>>(arr: T, overwrite?: boolean): T
	{
		return this._memoizeFake('dfArrayShuffle', Distributions.dfArrayShuffle, arr, overwrite)() as any
	}

	dfArrayShuffle<T extends IArrayInput02<any> | ITSArrayListMaybeReadonly<any>>(arr: T, overwrite?: boolean): () => T
		{
//		return Distributions.arrayShuffle(this, arr, overwrite);
		return this._callDistributions(Distributions.dfArrayShuffle, arr, overwrite) as any
	}

	arrayUnique<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>)
	{
		return this.dfArrayUnique(arr, limit, loop, fnRandIndex, fnOutOfLimit)()
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
	dfArrayUnique<T extends unknown>(arr: ITSArrayListMaybeReadonly<T>, limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>)
	{
		return Distributions.dfArrayUnique(this, arr, limit, loop, fnRandIndex, fnOutOfLimit)
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
	arrayFill<T extends IArrayInput02<number>>(arr: T, min?: number, max?: number, float?: boolean)
	{
		return this.dfArrayFill(min, max, float)(arr)
	}

	/**
	 * @see arrayFill
	 */
	dfArrayFill(min?: number, max?: number, float?: boolean)
	{
		return this._memoize('dfArrayFill', Distributions.dfArrayFill, min, max, float)
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
	dfUniform(min?: number, max?: number, fractionDigits?: number)
	{
		return this._memoize('dfUniform', Distributions.dfUniformFloat, min, max, fractionDigits)
	}

	/**
	 * Generates a [Discrete dfUniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
	 *
	 * @param {number} [min=0] - Lower bound (integer, inclusive)
	 * @param {number} [max=1] - Upper bound (integer, inclusive)
	 * @return {function}
	 */
	dfUniformInt(min?: number, max?: number)
	{
		return this._memoize('dfUniformInt', Distributions.dfUniformInt, min, max)
	}

	/**
	 * Generates a [Discrete dfUniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
	 * with two possible outcomes, `true` or `false.
	 *
	 * This method is analogous to flipping a coin.
	 *
	 * @return {function}
	 */
	dfUniformBoolean(likelihood?: number)
	{
		return this._memoize('dfUniformBoolean', Distributions.dfUniformBoolean, likelihood)
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
	dfNormal(mu?: number, sigma?: number): () => number
	{
		return Distributions.dfNormal(this, mu, sigma)
	}

	/**
	 * Generates a [Log-dfNormal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
	 *
	 * @param {number} [mu=0] - Mean of underlying dfNormal distribution
	 * @param {number} [sigma=1] - Standard deviation of underlying dfNormal distribution
	 * @return {function}
	 */
	dfLogNormal(mu?: number, sigma?: number)
	{
		return Distributions.dfLogNormal(this, mu, sigma)
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
	dfBernoulli(p?: number)
	{
		return Distributions.dfBernoulli(this, p)
	}

	/**
	 * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
	 *
	 * @param {number} [n=1] - Number of trials.
	 * @param {number} [p=0.5] - Success probability of each trial.
	 * @return {function}
	 */
	dfBinomial(n?: number, p?: number)
	{
		return Distributions.dfBinomial(this, n, p)
	}

	/**
	 * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
	 *
	 * @param {number} [p=0.5] - Success probability of each trial.
	 * @return {function}
	 */
	dfGeometric(p?: number)
	{
		return Distributions.dfGeometric(this, p)
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
	dfPoisson(lambda?: number)
	{
		return Distributions.dfPoisson(this, lambda)
	}

	/**
	 * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
	 *
	 * @param {number} [lambda=1] - Inverse mean (lambda > 0)
	 * @return {function}
	 */
	dfExponential(lambda?: number)
	{
		return Distributions.dfExponential(this, lambda)
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
	dfIrwinHall(n: number = 1): () => number
	{
		return Distributions.dfIrwinHall(this, n)
	}

	/**
	 * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
	 *
	 * @param {number} n - Number of dfUniform samples to average (n >= 1)
	 * @return {function}
	 */
	dfBates(n: number = 1)
	{
		return Distributions.dfBates(this, n)
	}

	/**
	 * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
	 *
	 * @param {number} alpha - Alpha
	 * @return {function}
	 */
	dfPareto(alpha: number = 1)
	{
		return Distributions.dfPareto(this, alpha)
	}

	itemByWeight<T extends unknown>(arr: T[],
		options?: IOptionsItemByWeight<T>,
		...argv
	): IWeightEntrie<T>
	itemByWeight<T extends unknown, K extends string = string>(arr: IObjectInput<T, K>,
		options?: IOptionsItemByWeight<T, K>,
		...argv
	): IWeightEntrie<T, K>
	itemByWeight<T extends unknown>(arr: T[],
		options?: IOptionsItemByWeight<T>,
		...argv
	): IWeightEntrie<T>
	{
		return this.dfItemByWeight(arr, options, ...argv)()
	}

	/**
	 * returns random weighted item by give array/object
	 */
	dfItemByWeight<T extends unknown>(arr: T[],
		options?: IOptionsItemByWeight<T>,
		...argv
	): () => IWeightEntrie<T>
	dfItemByWeight<T extends unknown, K extends string = string>(arr: IObjectInput<T, K>,
		options?: IOptionsItemByWeight<T, K>,
		...argv
	): () => IWeightEntrie<T, K>
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
	dfItemByWeight<T extends unknown>(arr,
		options?: IOptionsItemByWeight<T>,
		...argv
	)
	{
		return this._callDistributions(Distributions.dfItemByWeight, arr, options, ...argv)
	}

	/**
	 * returns random weighted item by give array/object with size and unique
	 */
	itemByWeightUnique<T extends unknown>(arr: T[],
		size: number,
		options?: IOptionsItemByWeight<T>,
		...argv
	): IWeightEntrie<T>[]
	itemByWeightUnique<T extends unknown, K extends string = string>(arr: IObjectInput<T, K>,
		size: number,
		options?: IOptionsItemByWeight<T, K>,
		...argv
	): IWeightEntrie<T, K>[]
	itemByWeightUnique<T extends unknown>(arr: T[],
		size: number,
		options?: IOptionsItemByWeight<T>,
		...argv
	): IWeightEntrie<T>[]
	{
		return this.dfItemByWeightUnique(arr, size, options, ...argv)()
	}

	/**
	 * returns random weighted item by give array/object with size and unique
	 */
	dfItemByWeightUnique<T extends unknown>(arr: T[],
		size: number,
		options?: IOptionsItemByWeight<T>,
		...argv
	): () => IWeightEntrie<T>[]
	dfItemByWeightUnique<T extends unknown, K extends string = string>(arr: IObjectInput<T, K>,
		size: number,
		options?: IOptionsItemByWeight<T, K>,
		...argv
	): () => IWeightEntrie<T, K>[]
	dfItemByWeightUnique<T extends unknown>(arr,
		size: number,
		options?: IOptionsItemByWeight<T>,
		...argv
	)
	{
		return this._callDistributions(Distributions.dfItemByWeightUnique, arr, size, options, ...argv)
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
	sumInt(size: number, sum?: number, min?: number, max?: number, limit?: number)
	{
		return this.dfSumInt(size, sum, min, max, limit)()
	}

	dfSumInt(size: number, sum?: number, min?: number, max?: number, limit?: number)
	{
		return this._memoize('sumInt', Distributions.dfRandSumInt, size, sum, min, max, limit)
	}

	sumFloat(size: number, sum?: number, min?: number, max?: number, fractionDigits?: number)
	{
		return this.dfSumFloat(size, sum, min, max, fractionDigits)()
	}

	dfSumFloat(size: number, sum?: number, min?: number, max?: number, fractionDigits?: number)
	{
		return this._memoize('sumFloat', Distributions.dfRandSumFloat, size, sum, min, max, fractionDigits)
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
	protected _memoize<F extends IRandomDistributions<F>>(label: string, getter: F, ...args: any[]): ReturnType<F>
	{
		const key = hashArgv(args);
		let value = this._cache[label];

		if (value === undefined || value.key !== key)
		{
			value = {
				key,
				// @ts-ignore
				distribution: getter(this, ...args)
			};
			this._cache[label] = value
		}

		// @ts-ignore
		return value.distribution
	}

	protected _memoizeFake<F extends IRandomDistributions<F>>(label: string, getter: F, ...args: any[]): ReturnType<F>
	{
		return getter(this, ...args)
	}

	protected _callDistributions<F extends IRandomDistributions<F>>(getter: F, ...args: any[]): ReturnType<F>
	{
		return getter(this, ...args)
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
		return this._rng?.name;
	}
}

export interface IRandomDistributionsFn<R = any> extends Function
{
	(random: RandomCore): R
	(random: RandomCore, ...argv: any[]): R
}

export interface IRandomDistributionsCacheRow<F extends IRandomDistributionsFn = IRandomDistributionsFn>
{
	key: string,
	// @ts-ignore
	distribution: IRandomDistributions<F>,
}

export interface IRandomDistributions<F extends IRandomDistributionsFn = IRandomDistributionsFn>
{
	(...argv: Parameters<F>): ReturnType<F>
	(random: RandomCore, ...argv): ReturnType<F>
}

export default RandomCore
