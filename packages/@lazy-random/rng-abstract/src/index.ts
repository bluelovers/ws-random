import { hashAny, randomSeedStr, seedToken } from '@lazy-random/seed-token';
import { RNGCore, IRNGLike } from '@lazy-random/rng-abstract-core';

export type { IRNGLike };

export abstract class RNG extends RNGCore implements IRNGLike
{

	public static override create(seed?, opts?, ...argv)
	{
		if (this === RNG || this === RNGCore || !this)
		{
			throw new ReferenceError('RNG is abstract class');
		}

		// @ts-ignore
		return new this(seed, opts, ...argv);
	}

	/**
	 * return number for make new seed
	 */
	protected override _seedNum(seed?, opts?, ...argv): number
	{
		// TODO: add entropy and stuff
		if (typeof seed === 'undefined' || seed === null || seed === 0)
		{
			/**
			 * breaking change
			 * this make always get a new token
			 * when seed is undefined
			 */
			seed = randomSeedStr();
		}

		return seedToken(seed, opts, ...argv);
	}

	/**
	 * return string for make new seed
	 */
	protected override _seedStr(seed?, opts?, ...argv): string
	{
		return hashAny(seed, opts, ...argv);
	}

}

export default RNG;

