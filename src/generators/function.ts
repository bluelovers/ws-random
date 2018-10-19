import ow = require("ow-lite");
import RNG from '../rng'

export type IRNGFunctionSeed = (...argv) => number

export class RNGFunction<S extends IRNGFunctionSeed = IRNGFunctionSeed> extends RNG
{

	protected _rng: S

	constructor(seed: S, opts?)
	{
		super()

		this.seed(seed, opts)
	}

	get name()
	{
		return 'function'
	}

	next()
	{
		return this._rng()
	}

	seed(seed: S, opts?)
	{
		ow(seed, ow.function)
		this._rng = seed
	}

	clone<S extends IRNGFunctionSeed = IRNGFunctionSeed>(seed: S, opts?)
	{
		let o: typeof RNGFunction;

		if (this instanceof RNGFunction)
		{
			// @ts-ignore
			o = (this.__proto__.constructor)
		}
		else
		{
			o = RNGFunction
		}

		return new o(seed, opts)
	}
}

export default RNGFunction

// @ts-ignore
Object.freeze(exports)
