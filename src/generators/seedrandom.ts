import RNG, { _MathRandom } from '../rng'
import { hashAny, shortid, hashSum, cloneClass } from '../util';
import RNGFunction from './function';
import seedrandom = require('seedrandom')

export import RNGSeedRandomOptions = seedrandom.seedRandomOptions

export const defaultOptions: RNGSeedRandomOptions = Object.freeze({
	entropy: true
})

export class RNGSeedRandom extends RNGFunction<seedrandom.prng>
{
	protected _opts: RNGSeedRandomOptions = defaultOptions

	constructor(seed?, opts?: RNGSeedRandomOptions, ...argv)
	{
		super(seed, opts, ...argv)
	}

	get name()
	{
		return 'seedrandom'
	}

	get options()
	{
		return this._opts
	}

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

		this._rng = seedrandom(this._hashSeed(seed), this._opts, ...argv)
	}

	// @ts-ignore
	clone(seed?, opts?: RNGSeedRandomOptions, ...argv): RNGSeedRandom
	{
		return cloneClass(RNGSeedRandom, this, seed, opts, ...argv)
	}

	protected _hashSeed(seed?): string
	{
		return hashAny(seed)
	}
}

export default RNGSeedRandom

// @ts-ignore
Object.freeze(exports)
