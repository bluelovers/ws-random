import { RNG } from '@lazy-random/rng-abstract';
import { getRandomSeedAuto, ISeedLooser, XorShift } from '@bluelovers/xorshift';

export class RNGXorShift128 extends RNG
{
	protected _rng: XorShift

	constructor(seed?: ISeedLooser, opts?, ...argv)
	{
		super()

		this._init(seed, opts, ...argv)
	}

	protected override _init(seed: ISeedLooser, opts?, ...argv)
	{
		super._init(seed, opts, ...argv);
		seed = getRandomSeedAuto(seed);
		this._rng = new XorShift(seed);
	}

	override seed(seed?: ISeedLooser, opts?, ...argv)
	{
		seed ??= getRandomSeedAuto();
		this._rng.seed(seed);
	}

	next()
	{
		return this._rng.random()
	}

	public override get seedable()
	{
		return true
	}

	override get name()
	{
		return 'xorshift128'
	}
}

export default RNGXorShift128
