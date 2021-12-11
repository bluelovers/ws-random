
import { RNGFunction } from '@lazy-random/generators-function';
import seedrandom from 'seedrandom';

export import RNGSeedRandomOptions = seedrandom.seedRandomOptions;

import { PickValueOf } from '@lazy-random/shared-lib';
import { cloneClass } from '@lazy-random/clone-class';

export const defaultOptions: RNGSeedRandomOptions = Object.freeze({
	entropy: true
});

export type IRNGSeedRandomLibName = 'alea' | 'tychei' | 'xor128' | 'xor4096' | 'xorshift7' | 'xorwow'
export type IRNGSeedRandomLib = IRNGSeedRandomLibName | string
export type IRNGSeedRandomLibValueOf = PickValueOf<typeof seedrandom, IRNGSeedRandomLibName>

export class RNGSeedRandom extends RNGFunction<seedrandom.prng>
{
	protected _opts: RNGSeedRandomOptions
	protected _seedrandom: IRNGSeedRandomGenerator

	protected override _seedable: boolean = true

	constructor(seed?, opts?: RNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv)
	constructor(seed?, opts?: RNGSeedRandomOptions, ...argv)
	{
		super(seed, opts, ...argv)
	}

	public static createLib(lib?: IRNGSeedRandomLib, seed?, opts?: RNGSeedRandomOptions, ...argv): RNGSeedRandom
	public static createLib(...argv)
	{
		return new this(argv[1], argv[2], argv[0], ...argv.slice(3))
	}

	public static override create(seed?, opts?: RNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv): RNGSeedRandom
	public static override create(...argv)
	{
		return new this(...argv)
	}

	protected override _init_check(seed?, opts?, ...argv)
	{

	}

	protected override _init(seed?, opts?, ...argv)
	{
		this._opts = this._opts || Object.assign({}, defaultOptions)
		this._seedrandom = this.__generator(...argv)

		super._init(seed, opts, ...argv)
	}

	protected readonly _NAME = 'seedrandom';
	protected _TYPE = null;

	override get name()
	{
		return `${this._NAME}${this._TYPE ? ':' + this._TYPE : ''}`
	}

	protected __generator(fn?: typeof seedrandom | IRNGSeedRandomLib | IRNGSeedRandomLibValueOf): IRNGSeedRandomGenerator
	{
		if (fn && typeof fn === 'string')
		{
			this._TYPE = null;

			switch (fn)
			{
				case 'alea':
				case 'tychei':
				case 'xor128':
				case 'xor4096':
				case 'xorshift7':
				case 'xorwow':
					fn = seedrandom[fn];
					//fn = require(`seedrandom/lib/${fn}`)

					this._TYPE = fn

					break;
				default:
					if (fn.indexOf('..') === -1 && /^[a-z\-\.]+$/i.test(fn))
					{
						this._TYPE = fn

						fn = require(`seedrandom/lib/${fn}`)
						break
					}
					else
					{
						throw new RangeError(`unknow seedrandom lib name: ${fn}`)
					}
			}
		}
		else if (fn)
		{
			// @ts-ignore
			this._TYPE = fn.name
		}
		else
		{
			this._TYPE = null
		}

		fn = fn || seedrandom;

		return fn as IRNGSeedRandomGenerator

		/*
		return (seed?, opts?: RNGSeedRandomOptions, ...argv) => {
			// @ts-ignore
			return fn(seed, opts, ...argv)
		}
		*/
	}

	override get options()
	{
		return this._opts
	}

	/**
	 * only when option.state = true
	 */
	public get state(): IRNGSeedRandomState
	{
		let fn = this._rng.state

		if (typeof fn === 'function')
		{
			// @ts-ignore
			return fn()
		}
	}

	/**
	 * @todo options for change seeder
	 */
	override seed(seed?, opts?: RNGSeedRandomOptions, ...argv)
	{
		if (opts === null)
		{
			this._opts = undefined
		}
		else
		{
			this._opts = opts || this._opts;
		}

		this._rng = this._seedrandom(this._seedAuto(seed), this._opts, ...argv)
	}

	// @ts-ignore
	clone(seed?, opts?: RNGSeedRandomOptions, ...argv): RNGSeedRandom
	{
		return cloneClass(RNGSeedRandom, this, seed, opts, ...argv)
	}

}

export interface IRNGSeedRandomState
{
	i: number,
	j: number,
	S: number[],
}

export interface IRNGSeedRandomGenerator
{
	(seed?: any, opts?: seedrandom.seedRandomOptions, ...argv: any[]): seedrandom.prng
}

export default RNGSeedRandom


