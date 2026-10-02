import { RNGFunction } from '@lazy-random/generators-function';
import seedrandom from 'seedrandom';

import { PickValueOf } from '@lazy-random/shared-lib';
import { cloneClass } from '@lazy-random/clone-class';

/**
 * `seedrandom` 選項 (Options)，直接取自 `seedrandom(seed, opts)` 的第二個參數型別，
 * 以 `Parameters` 推導可避免與上游版本脫節。
 *
 * The `seedrandom` options, derived from the second parameter of
 * `seedrandom(seed, opts)` so the type stays in sync with the upstream library.
 */
export type IRNGSeedRandomOptions = Parameters<typeof seedrandom>[1];

/**
 * `seedrandom` 回傳的擬隨機數列產生器 (Pseudorandom Number Generator)。
 * The pseudorandom number generator returned by `seedrandom`.
 */
export type ISeedRandomPRNG = seedrandom.PRNG;

/**
 * 預設選項 (Default Options)：`entropy: true` 會讓 `seedrandom` 混入平台熵值 (Entropy)，
 * 因此未指定種子時不會每次都得到同一組序列。
 *
 * Default options: `entropy: true` mixes platform entropy into `seedrandom`, so an
 * omitted seed does not produce the same sequence every time.
 */
export const defaultOptions: IRNGSeedRandomOptions = Object.freeze({
	entropy: true,
});

/**
 * `seedrandom` 內建演算法名稱 (Built-in PRNG Algorithm Name)。
 * Built-in algorithm names exposed by `seedrandom`.
 */
export type IRNGSeedRandomLibName = 'alea' | 'tychei' | 'xor128' | 'xor4096' | 'xorshift7' | 'xorwow';

/**
 * 演算法庫 (Library) 的允許值：除了內建名稱，也接受 `seedrandom/lib/` 下的任意名稱字串。
 * Allowed library values: besides the built-in names, any name string under `seedrandom/lib/` is accepted.
 */
export type IRNGSeedRandomLib = IRNGSeedRandomLibName | string;

/**
 * 內建演算法在 `seedrandom` 物件上對應的函式型別 (Function Type)。
 * The function type that built-in algorithms map to on the `seedrandom` object.
 */
export type IRNGSeedRandomLibValueOf = PickValueOf<typeof seedrandom, IRNGSeedRandomLibName>;

/**
 * 以 [seedrandom](https://github.com/davidbau/seedrandom) 為亂數 (Random Number) 來源的
 * 可設定種子亂數產生器 (Seedable Random Number Generator)。
 *
 * A seedable random number generator backed by
 * [seedrandom](https://github.com/davidbau/seedrandom).
 */
export class RNGSeedRandom extends RNGFunction<ISeedRandomPRNG>
{
	protected _opts: IRNGSeedRandomOptions;
	protected _seedrandom: IRNGSeedRandomGenerator;

	/**
	 * 標示此產生器可設定種子 (Seedable)，讓基類允許呼叫 `seed()` 重新播种。
	 * Marks this generator as seedable so the base class allows `seed()` calls.
	 */
	protected override _seedable = true;

	/**
	 * 建立 `seedrandom` 亂數產生器。
	 * Create a `seedrandom`-backed random number generator.
	 *
	 * @param seed 種子 (Seed)，可省略 / the seed, may be omitted
	 * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
	 * @param lib 演算法名稱字串或函式 (Library name string or function)，省略時使用預設演算法 / the algorithm name or function; falls back to the default algorithm when omitted
	 * @param argv 其餘參數，原樣轉交基類，其中第一項會在 `_init()` 中交給 `__generator()` / remaining arguments forwarded to the base class, whose first item is passed to `__generator()` in `_init()`
	 */
	constructor(seed?, opts?: IRNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv);
	constructor(seed?, opts?: IRNGSeedRandomOptions, ...argv)
	{
		super(seed, opts, ...argv);
	}

	/**
	 * 以「演算法在最前」的參數順序建立實例。
	 * Create an instance with the library name as the first argument.
	 *
	 * @param lib 演算法名稱字串或函式 (Library name string or function) / the algorithm name or function
	 * @param seed 種子 (Seed) / the seed
	 * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
	 * @param argv 其餘參數 / the remaining arguments
	 * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
	 */
	public static createLib(lib?: IRNGSeedRandomLib, seed?, opts?: IRNGSeedRandomOptions, ...argv): RNGSeedRandom;
	public static createLib(...argv)
	{
		/**
		 * 參數順序差異 (Argument Order)：本方法是 `(lib, seed, opts)`，
		 * 建構子是 `(seed, opts, lib)`，故依位置重排後再多餘的參數原樣補上。
		 *
		 * The argument order differs: this method is `(lib, seed, opts)` while the
		 * constructor is `(seed, opts, lib)`, so the leading three are reordered and
		 * any trailing arguments are appended as-is.
		 */
		return new this(argv[1], argv[2], argv[0], ...argv.slice(3));
	}

	/**
	 * 與 `new RNGSeedRandom(...)` 等價的靜態工厂方法 (Static Factory Method)，參數順序與建構子一致。
	 * A static factory method equivalent to `new RNGSeedRandom(...)`, using the same argument order as the constructor.
	 *
	 * @param seed 種子 (Seed) / the seed
	 * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
	 * @param lib 演算法名稱字串或函式 (Library name string or function) / the algorithm name or function
	 * @param argv 其餘參數 / the remaining arguments
	 * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
	 */
	public static override create(seed?, opts?: IRNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv): RNGSeedRandom;
	public static override create(...argv)
	{
		return new this(...argv);
	}

	/**
	 * 預檢查刻意留空 (Intentionally Empty)：`seedrandom` 自身會在取樣時驗證種子，
	 * 此處不重複檢查，僅覆寫以關閉基類可能存在的預設行為。
	 *
	 * Deliberately left empty: `seedrandom` validates the seed itself when sampling,
	 * so no pre-check is needed here; the override only neutralizes any base-class
	 * default behavior.
	 */
// eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
	protected override _init_check(seed?, opts?, ...argv) {}

	/**
	 * 初始化選項 (Options) 與亂數來源函式 (Random Source Function)，再交由基類完成種子設定。
	 * Initializes the options and the random source function, then defers seeding to the base class.
	 *
	 * @param seed 種子 (Seed) / the seed
	 * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
	 * @param argv 第一項為演算法名稱或函式，其後為附加參數 / the first item is the library name or function, followed by extra arguments
	 */
	protected override _init(seed?, opts?, ...argv)
	{
		/**
		 * 只在 `_opts` 尚未設定時才複製一份預設選項，避免重複初始化時覆蓋掉外部傳入的設定。
		 * `Object.assign` 產生的是可變副本；`defaultOptions` 本身已被凍結 (Frozen)。
		 *
		 * Copies the default options only when `_opts` is not yet set, so re-initialization
		 * does not wipe settings supplied by the caller. `Object.assign` yields a mutable
		 * copy while `defaultOptions` itself stays frozen.
		 */
		this._opts = this._opts || Object.assign({}, defaultOptions);

		/**
		 * `...argv` 的第一項是建構子傳來的 `lib`，先解析成實際的 `seedrandom` 產生器。
		 * The first item of `...argv` is the `lib` passed from the constructor; resolve it
		 * into the actual `seedrandom` generator first.
		 */
		this._seedrandom = this.__generator(...argv);

		super._init(seed, opts, ...argv);
	}

	protected readonly _NAME = 'seedrandom';
	protected _TYPE = null;

	/**
	 * 產生器名稱 (Generator Name)：固定前綴 `seedrandom`，有指定演算法時附加 `:<演算法>`。
	 * The generator name: the constant prefix `seedrandom`, plus `:<algorithm>` when one is specified.
	 *
	 * @returns 形如 `seedrandom` 或 `seedrandom:<演算法>` 的字串 / a string such as `seedrandom` or `seedrandom:<algorithm>`
	 */
	override get name()
	{
		return `${this._NAME}${this._TYPE ? ':' + this._TYPE : ''}`;
	}

	protected __generator(fn?: typeof seedrandom | IRNGSeedRandomLib | IRNGSeedRandomLibValueOf): IRNGSeedRandomGenerator
	{
		if (fn && typeof fn === 'string')
		{
			this._TYPE = null;

			switch (fn)
			{
				case 'alea':
				case 'tychei':
				case 'xor128':
				case 'xor4096':
				case 'xorshift7':
				case 'xorwow':
					fn = seedrandom[fn];
					//fn = require(`seedrandom/lib/${fn}`)

					this._TYPE = fn;

					break;
				default:
					if (!fn.includes('..') && /^[a-z\-\.]+$/i.test(fn))
					{
						this._TYPE = fn;

						fn = require(`seedrandom/lib/${fn}`);
						break;
					}
					else
					{
						throw new RangeError(`unknow seedrandom lib name: ${fn}`);
					}
			}
		}
		else if (fn)
		{
			// @ts-ignore
			this._TYPE = fn.name;
		}
		else
		{
			this._TYPE = null;
		}

		fn = fn || seedrandom;

		return fn as IRNGSeedRandomGenerator;

		/*
		return (seed?, opts?: RNGSeedRandomOptions, ...argv) => {
			// @ts-ignore
			return fn(seed, opts, ...argv)
		}
		*/
	}

	override get options(): IRNGSeedRandomOptions
	{
		return this._opts;
	}

	/**
	 * only when option.state = true
	 */
	// eslint-disable-next-line consistent-return,getter-return
	public get state(): IRNGSeedRandomState
	{
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const fn = (this._rng as any).state;

		if (typeof fn === 'function')
		{
			// @ts-ignore
			return fn();
		}
	}

	/**
	 * @todo options for change seeder
	 */
	override seed(seed?, opts?: IRNGSeedRandomOptions, ...argv)
	{
		if (opts === null)
		{
			this._opts = void 0;
		}
		else
		{
			this._opts = opts || this._opts;
		}

		this._rng = this._seedrandom(this._seedAuto(seed), this._opts, ...argv);
	}

	// @ts-ignore
	clone(seed?, opts?: IRNGSeedRandomOptions, ...argv): RNGSeedRandom
	{
		return cloneClass(RNGSeedRandom, this, seed, opts, ...argv);
	}

}

export interface IRNGSeedRandomState
{
	i: number,
	j: number,
	S: number[],
}

export interface IRNGSeedRandomGenerator
{
	(seed?: any, opts?: IRNGSeedRandomOptions, ...argv: any[]): ISeedRandomPRNG
}

export default RNGSeedRandom;
