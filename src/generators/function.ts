import { ow } from '../util/ow'
import RNG from '../rng'
import { cloneClass, getClass } from '../util';

export type IRNGFunctionSeed = (...argv) => number

export class RNGFunction<S extends IRNGFunctionSeed = IRNGFunctionSeed> extends RNG
{
	protected _rng: S
	protected _seedable: boolean = null

	constructor(seed: S, opts?, ...argv)
	{
		super()

		this._init(seed, opts, ...argv)
	}

	protected _init(seed?, opts?, ...argv)
	{
		this.seed(seed, opts, ...argv)
	}

	get name()
	{
		return 'function'
	}

	public get seedable()
	{
		return this._seedable
	}

	next()
	{
		return this._rng()
	}

	seed(seed: S, opts?, ...argv)
	{
		this._rng = seed || this._rng
		ow(this._rng, ow.function)
	}

	clone<S extends IRNGFunctionSeed = IRNGFunctionSeed>(seed: S, opts?, ...argv): RNGFunction<S>
	{
		return cloneClass(RNGFunction, this, seed, opts, ...argv)
	}
}

export default RNGFunction

// @ts-ignore
Object.freeze(exports)
