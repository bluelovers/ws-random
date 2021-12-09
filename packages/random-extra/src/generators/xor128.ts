import { RNG } from '@lazy-random/rng-abstract'
import { cloneClass, getClass} from '../util';
import { IRNGFunctionSeed } from './function';
import { randomSeedNum } from '@lazy-random/seed-token';

export class RNGXOR128 extends RNG
{

	protected x: number
	protected y: number
	protected z: number
	protected w: number

	constructor(seed, ...argv)
	constructor(x?: number, y?: number, z?: number, w?: number, ...argv)
	constructor(...argv)
	{
		super()

		this._init(...argv)
		this.seed(this.x)
	}

	override get name()
	{
		return 'xor128'
	}

	public override get seedable()
	{
		return true
	}

	next()
	{
		const t = this.x ^ (this.x << 1)
		this.x = this.y
		this.y = this.z
		this.z = this.w
		this.w = this.w ^ ((this.w >>> 19) ^ t ^ (t >>> 8))
		return (this.w >>> 0) / 0x100000000
	}

	override seed(seed?, opts?, ...argv)
	{
//		this.x = this._seedNum(seed, opts, ...argv)
		this._seed(seed, opts, ...argv)

		// discard an initial batch of 64 values
		let i = 64;
		while (i--)
		{
			this.next()
		}
	}

	override clone(seed?, opts?, ...argv): RNGXOR128
	{
		return cloneClass(RNGXOR128, this, seed, opts, ...argv)
	}

	protected override _init(...argv)
	{
		let [
			x = randomSeedNum(),
			y = randomSeedNum(),
			z = randomSeedNum(),
			w = randomSeedNum(),
		] = argv

		this._seed(x, y, z, w)
	}

	protected _seed(...argv)
	{
		let [
			x = this.x,
			y = this.y,
			z = this.z,
			w = this.w,
		] = argv

		if (typeof x !== 'number')
		{
			x = this._seedNum(x) || this.x
		}
		if (typeof y !== 'number')
		{
			y = this.y
		}
		if (typeof z !== 'number')
		{
			z = this.z
		}
		if (typeof x !== 'number')
		{
			w = this.w
		}

		this.x = x
		this.y = y
		this.z = z
		this.w = w
	}
}

export default RNGXOR128


