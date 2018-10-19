import RNG, { _MathRandom } from '../rng'
import seedrandom = require('seedrandom')
import shortid = require('shortid')
import hashSum = require('hash-sum')

export class RNGSeedRandom extends RNG
{
	protected _rng: seedrandom.prng
	protected _opts: seedrandom.seedRandomOptions = { entropy: true }

	constructor(seed?, opts?: seedrandom.seedRandomOptions, ...argv)
	{
		super()

		this.seed(seed, opts, ...argv)
	}

	get name()
	{
		return 'seedrandom'
	}

	next()
	{
		return this._rng()
	}

	seed(seed?, opts?: seedrandom.seedRandomOptions, ...argv)
	{
		this._opts = opts || this._opts;
		this._rng = seedrandom(this._to_str(seed), this._opts, ...argv)
	}

	clone(seed?, opts?: seedrandom.seedRandomOptions)
	{
		let o: typeof RNGSeedRandom;

		if (this instanceof RNGSeedRandom)
		{
			// @ts-ignore
			o = (this.__proto__.constructor)
		}
		else
		{
			o = RNGSeedRandom
		}

		return new o(seed, opts)
	}

	protected _to_str(seed?): string
	{
		//let type = typeof seed;

		if (!seed)
		{
			seed = shortid()
		}
		else if (typeof seed !== 'string')
		{
			seed = hashSum(seed)
		}

		return String(seed)
	}
}

export default RNGSeedRandom

// @ts-ignore
Object.freeze(exports)
