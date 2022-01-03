import { df_sfc32 } from '@lazy-num/float-algorithm';
import { _MathRandom } from '@lazy-random/original-math-random';
import { df_xfnv1a, doubleToIEEE } from '@lazy-random/seed-algorithm';
import { RNGCore } from '@lazy-random/rng-abstract-core';
import { ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';

export type IRNGSfc32AllowedSeedInputTypes = ITSValueOrArrayMaybeReadonly<string | number>;

export type IRNGSfc32SeedTypes = readonly [number, number, number, number];

export function _handleSeed(seedInput: IRNGSfc32AllowedSeedInputTypes): IRNGSfc32SeedTypes
{
	let exists_zero = false;
	let s: [number, number];

	const seed = [seedInput ?? []].flat().slice(0, 4);

	for (let i = 0; i < 4; i++)
	{
		const type = typeof seed[i];

		if (type === 'string')
		{
			seed[i] = df_xfnv1a(`${seed[i]}#sfc32#${i}`)();
		}
		else if (type !== 'number')
		{
			exists_zero = true;
			seed[i] = void 0;
		}
		else
		{
			seed[i] = Math.abs(seed[i] as number);
		}

		if (!seed[i])
		{
			if (seed[i] === 0 && !exists_zero)
			{
				exists_zero = true;
			}
			else
			{
				s ??= doubleToIEEE(_MathRandom());
				// @ts-ignore
				seed[i] = s.pop();
				if (!s.length)
				{
					s = void 0;
				}
			}
		}
	}

	return seed as any;
}

export class RNGSfc32 extends RNGCore
{
	protected readonly _rng: () => number;
	protected readonly _seed: IRNGSfc32SeedTypes;

	constructor(seed?: IRNGSfc32AllowedSeedInputTypes, opts?: any, ...argv: any)
	{
		super(seed, opts, ...argv);
		this._init(seed, opts, ...argv);
	}

	protected override _init(seed: IRNGSfc32AllowedSeedInputTypes, opts?: any, ...argv: any)
	{
		seed = _handleSeed(seed);

		// @ts-ignore
		this._seed = seed;
		// @ts-ignore
		this._rng = df_sfc32(...seed);
	}

	public override seed(seed?: IRNGSfc32AllowedSeedInputTypes, opts?: any, ...argv: any)
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
