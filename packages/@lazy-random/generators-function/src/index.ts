import { expect } from '@lazy-random/expect';
import { RNG } from '@lazy-random/rng-abstract'
import { cloneClass } from '@lazy-random/clone-class';

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

	protected override _init_check(seed?, opts?, ...argv)
	{
		let type = typeof seed;
		if (seed !== null && type !== 'undefined' && type !== 'function')
		{
			// @ts-ignore
			expect(seed).function
		}
	}

	protected override _init(seed?, opts?, ...argv)
	{
		this._init_check(seed, opts, ...argv);

		this.seed(seed, opts, ...argv)
	}

	override get name()
	{
		return 'function'
	}

	public override get seedable()
	{
		return this._seedable
	}

	next()
	{
		return this._rng()
	}

	override seed(seed: S, opts?, ...argv)
	{
		if (typeof seed === 'function')
		{
			this._rng = seed || this._rng
		}
		//ow(this._rng, ow.function)
		//expect(this._rng).function();
	}

	override clone<S extends IRNGFunctionSeed = IRNGFunctionSeed>(seed: S, opts?, ...argv): RNGFunction<S>
	{
		return cloneClass(RNGFunction, this, seed, opts, ...argv)
	}
}

export default RNGFunction


