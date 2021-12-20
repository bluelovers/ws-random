/// <reference types="node" />
import { expect } from '@lazy-random/expect';
import { RNGSeedRandom } from '@lazy-random/generators-seedrandom';
import { RNG } from '@lazy-random/rng-abstract'
import { RNGFactory, IRNGFactoryType } from '@lazy-random/rng-factory'
import { autobind, deprecate } from 'core-decorators';
import { getClass } from '@lazy-random/clone-class';
import { RandomCore } from '@lazy-random/random-core';

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
export class Random<R extends RNG = RNG> extends RandomCore<R>
{
	protected override _init(rng?: R)
	{
		if (rng)
		{
			//ow(rng, ow.object.instanceOf(RNG))
			expect(rng).instanceof(RNG)
		}

		Object.defineProperty(this, 'Random', {
			configurable: false,
			enumerable: false,
			get()
			{
				return Random
			},
		});

		this.use(rng)
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
	override clone(seed?, opts?, ...args): Random<R>
	override clone<T extends RNG>(seed?, opts?, ...args): Random<T>
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
	override clone<T>(seed?: T, ...args)
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
	override use(arg0: IRNGFactoryType, ...args): this
	{
		this._rng = RNGFactory(arg0, ...args)

		return this as any;
	}

	override newUse(arg0: 'seedrandom', ...args): Random<RNGSeedRandom>
	override newUse<T extends RNG>(arg0: T, ...args): Random<T>
	override newUse(arg0: IRNGFactoryType, ...args): Random<R | any>
	/**
	 * create new Random and use
	 */
	override newUse(arg0: IRNGFactoryType, ...args)
	{
		let o: typeof Random = getClass(Random, this)

		return new o(RNGFactory(arg0, ...args));
	}

	/**
	 * clone current Random and use
	 */
	override cloneUse<T extends RNG>(arg0: IRNGFactoryType, ...args): Random<T>
	override cloneUse(arg0: IRNGFactoryType, ...args): Random<R | any>
	override cloneUse(arg0: IRNGFactoryType, ...args)
	{
		let o = this.clone();
		o.use(arg0, ...args);

		return o;
	}

	protected static default: typeof Random;
	readonly Random: typeof Random;
	static Random = Random;
}

export const random = new Random()
// @ts-ignore
//random.default = random

Object.defineProperty(random, 'default', {
	configurable: false,
	enumerable: false,
	get()
	{
		return random
	},
});

Object.defineProperty(Random, 'default', {
	configurable: false,
	enumerable: false,
	get()
	{
		return random
	},
});

Object.defineProperty(random, "__esModule", { value: true });

// defaults to Math.random as its RNG
export default random;
