import { seedToken } from './seeder/default';
import { hashAny } from './seeder/hash-any';
import { _MathRandom, randomSeedStr } from './util';

export abstract class RNG
{
	constructor()
	constructor(seed?)
	constructor(seed?, opts?, ...argv)
	constructor(seed?, opts?, ...argv)
	{

	}

	public static create(seed?, opts?, ...argv)
	{
		if (this === RNG || !this)
		{
			throw new ReferenceError('RNG is abstract class')
		}

		// @ts-ignore
		return new this(seed, opts, ...argv)
	}

	public get name(): string
	{
		throw new Error('RNG.name must be overridden')
	}

	public get options()
	{
		return null
	}

	public get seedable(): boolean
	{
		return null
	}

	/**
	 * should return a float between 0 ~ 1
	 */
	public next(): number
	{
		throw new ReferenceError('RNG.next must be overridden')
	}

	public seed(seed?, opts?, ...argv)
	{
		throw new ReferenceError('RNG.seed must be overridden')
	}

	public clone(seed?, opts?, ...argv)
	{
		throw new ReferenceError('RNG.clone must be overridden')
	}

	/**
	 * return number for make new seed
	 */
	protected _seedNum(seed?, opts?, ...argv): number
	{
		// TODO: add entropy and stuff
		if (typeof seed === 'undefined' || seed === null)
		{
			/**
			 * breaking change
			 * this make always get a new token
			 * when seed is undefined
			 */
			seed = randomSeedStr()
		}

		return seedToken(seed, opts, ...argv)
	}

	/**
	 * return string for make new seed
	 */
	protected _seedStr(seed?, opts?, ...argv): string
	{
		return hashAny(seed, opts, ...argv)
	}

}

export default RNG
// @ts-ignore
Object.freeze(exports)
