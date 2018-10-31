
import { hashAny } from '../seeder/hash-any';
import { cloneClass } from '../util';
import RNGFunction from './function';
import seedrandom = require('seedrandom')

export import RNGSeedRandomOptions = seedrandom.seedRandomOptions

export const defaultOptions: RNGSeedRandomOptions = Object.freeze({
	entropy: true
})

export type IRNGSeedRandomLib = 'alea' | 'tychei' | 'xor128' | 'xor4096' | 'xorshift7' | 'xorwow' | string

export class RNGSeedRandom extends RNGFunction<seedrandom.prng>
{
	protected _opts: RNGSeedRandomOptions
	protected _seedrandom: IRNGSeedRandomGenerator

	constructor(seed?, opts?: RNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv)
	constructor(seed?, opts?: RNGSeedRandomOptions, ...argv)
	{
		super(seed, opts, ...argv)
	}

	public static create(seed?, opts?: RNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv): RNGSeedRandom
	public static create(...argv)
	{
		return new this(...argv)
	}

	protected _init(seed?, opts?, ...argv)
	{
		this._opts = this._opts || Object.assign({}, defaultOptions)
		this._seedrandom = this.__generator(...argv)

		super._init(seed, opts, ...argv)
	}

	protected __generator(fn: typeof seedrandom | IRNGSeedRandomLib = seedrandom): IRNGSeedRandomGenerator
	{
		if (fn && typeof fn === 'string')
		{
			switch (fn)
			{
				case 'alea':
				case 'tychei':
				case 'xor128':
				case 'xor4096':
				case 'xorshift7':
				case 'xorwow':
					fn = require(`seedrandom/lib/${fn}`)
					break
				default:
					if (fn.indexOf('..') === -1 && /^[a-z\-\.]+$/i.test(fn))
					{
						fn = require(`seedrandom/lib/${fn}`)
						break
					}
					else
					{
						throw new RangeError(`unknow seedrandom lib name: ${fn}`)
					}
			}
		}

		fn = fn || seedrandom

		return (seed?, opts?: RNGSeedRandomOptions, ...argv) => {
			// @ts-ignore
			return fn(seed, opts, ...argv)
		}
	}

	get name()
	{
		return 'seedrandom'
	}

	get options()
	{
		return this._opts
	}

	public get seedable()
	{
		return true
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
	seed(seed?, opts?: RNGSeedRandomOptions, ...argv)
	{
		if (opts === null)
		{
			this._opts = undefined
		}
		else
		{
			this._opts = opts || this._opts;
		}

		this._rng = this._seedrandom(this._seedStr(seed), this._opts, ...argv)
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

// @ts-ignore
Object.freeze(exports)
