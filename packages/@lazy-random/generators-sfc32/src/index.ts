import { df_sfc32 } from '@lazy-num/float-algorithm';
import { RNGCore } from '@lazy-random/rng-abstract-core';
import { ISeedInputFromStringOrNumberOrArray, seedFromStringOrNumberOrArray } from '@lazy-random/seed-algorithm';

export type IRNGSfc32SeedTypes = readonly [number, number, number, number];

export class RNGSfc32 extends RNGCore
{
	protected readonly _rng: () => number;
	protected readonly _seed: IRNGSfc32SeedTypes;

	constructor(seed?: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any)
	{
		super(seed, opts, ...argv);
		this._init(seed, opts, ...argv);
	}

	protected override _init(seed: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any)
	{
		seed = seedFromStringOrNumberOrArray(seed, 4);

		// @ts-ignore
		this._seed = seed;
		// @ts-ignore
		this._rng = df_sfc32(...seed);
	}

	public override seed(seed?: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any)
	{
		return this._init(seed, opts, ...argv);
	}

	public override get seedable(): boolean
	{
		return true;
	}

	next()
	{
		return this._rng();
	}

	override get name()
	{
		return 'sfc32';
	}
}

export default RNGSfc32;
