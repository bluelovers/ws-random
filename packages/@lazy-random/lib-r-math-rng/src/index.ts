import * as libRMath from 'lib-r-math.js';
import { Random, random } from 'random-extra/src/random';
import { RNG, IRNGLike } from '@lazy-random/rng-abstract';
import isExtendsOf from 'is-extends-of';
import { IRNG } from 'lib-r-math.js';

export class LibRMathRngWithRandom extends IRNG
{
	protected __random: Random;
	protected __seed;

	constructor(_seed?: number, rng?: Random | RNG | any | IRNGLike)
	{
		// @ts-ignore
		super(_seed);
		this.use(rng, _seed)
	}

	// @ts-ignore
	protected get _name()
	{
		return 'Random<' + this.__random.rng.name + '>';
	}

	get seed()
	{
		return this.__seed
	}

	set seed(_seed)
	{
		this.__random.seed?.(this.__seed = _seed)
	}

	use(rng?: Random | RNG | IRNGLike | any, _seed?)
	{
		if (rng)
		{
			if (rng instanceof RNG || typeof <IRNGLike>rng.next === 'function')
			{
				//
			}
			else if (rng === 'seedrandom')
			{
				rng = random.newUse('seedrandom', _seed, {
					entropy: false,
				})
			}
			else if (!(rng instanceof Random))
			{
				rng = random.newUse(rng)
			}
		}

		this.__random = rng || this.__random || random;

		if (typeof _seed !== 'undefined')
		{
			this.seed = _seed
		}
	}

	_setup() {}

	internal_unif_rand()
	{
		return this.__random.next()
	}
}

export function _isLibRMathRNGLike<R extends IRNG>(rng: R | unknown): rng is R
{
	// @ts-ignore
	if (rng && (typeof rng.unif_rand === 'function' || typeof rng.internal_unif_rand === 'function'))
	{
		return true
	}
	return false
}

export function _isExtendsOfLibRMathRNGLike<R extends IRNG>(rng: R | unknown): rng is R
{
	if (rng && isExtendsOf(rng, IRNG as any))
	{
		return true
	}
	return false
}

export class RandomRngWithLibRMath<R extends IRNG> extends RNG
{
	protected _rng: R;
	protected _seedable: boolean = true;
	protected _fn: () => number;

	constructor(seed?, opts?, ...argv)
	{
		super();
		this._init(seed, opts, ...argv)
	}

	protected override _init(seed?, opts?, ...argv)
	{
		if (seed instanceof IRNG)
		{
			// @ts-ignore
			this._rng = seed
		}
		else if (opts instanceof IRNG)
		{
			// @ts-ignore
			this._rng = opts
		}
		else if (_isExtendsOfLibRMathRNGLike<R>(seed))
		{
			// @ts-ignore
			this._rng = new seed(this._seedNum(opts))
		}
		else if (_isExtendsOfLibRMathRNGLike<R>(opts))
		{
			// @ts-ignore
			this._rng = new opts(this._seedNum(seed))
		}
		else if (_isLibRMathRNGLike<R>(seed))
		{
			this._rng = seed
		}
		else if (_isLibRMathRNGLike<R>(opts))
		{
			this._rng = opts
		}
		else if (opts && libRMath[opts])
		{
			let r: typeof libRMath.IRNG = libRMath[opts];

			// @ts-ignore
			this._rng = new r(this._seedNum(seed))
		}
		else
		{
			// @ts-ignore
			this._rng = new libRMath.rng.MersenneTwister(this._seedNum(seed))
		}

		// @ts-ignore
		this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
	}

	override get name()
	{
		return 'libRMath'
			+ (this._rng.name ? `<${this._rng.name}>` : '')
		;
	}

	public override get options(): number[]
	{
		// @ts-ignore
		return this._rng.seed
	}

	public next(): number
	{
		return this._fn()
	}

	// @ts-ignore
	public override seed(seed?: any | number[], opts?, ...argv)
	{
		// @ts-ignore
		this._rng.seed = [this._seedNum(seed)]
	}
}

export default RandomRngWithLibRMath
