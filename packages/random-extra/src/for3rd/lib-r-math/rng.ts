import * as libRMath from 'lib-r-math.js';
import { Random, random } from '../../random';
import RNG, { IRNGLike } from '../../rng';
import isExtendsOf from 'is-extends-of';
import { IRNG } from 'lib-r-math.js';

export class LibRMathRngWithRandom extends IRNG
{
	protected __random: Random;
	protected __seed;

	constructor(_seed?: number, rng?: Random | RNG | any | IRNGLike)
	{
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

	protected _init(seed?, opts?, ...argv)
	{
		if (seed instanceof libRMath.IRNG)
		{
			// @ts-ignore
			this._rng = seed
		}
		else if (opts instanceof libRMath.IRNG)
		{
			// @ts-ignore
			this._rng = opts
		}
		else if (seed && isExtendsOf(seed, libRMath.IRNG))
		{
			// @ts-ignore
			this._rng = new seed(this._seedNum(opts))
		}
		else if (opts && isExtendsOf(opts, libRMath.IRNG))
		{
			// @ts-ignore
			this._rng = new opts(this._seedNum(seed))
		}
		// @ts-ignore
		else if (typeof seed?.unif_rand === 'function')
		{
			this._rng = seed
		}
		// @ts-ignore
		else if (typeof opts?.unif_rand === 'function')
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

	get name()
	{
		return 'libRMath'
			+ (this._rng.name ? `<${this._rng.name}>` : '')
		;
	}

	public get options(): number[]
	{
		return this._rng.seed
	}

	public next(): number
	{
		return this._fn()
	}

	public seed(seed?: any | number[], opts?, ...argv)
	{
		this._rng.seed = [this._seedNum(seed)]
	}
}
