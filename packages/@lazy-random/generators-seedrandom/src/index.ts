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
	/**
	 * 實例狀態 (Instance State)：`_opts` 為目前生效的 `seedrandom` 選項；
	 * `_seedrandom` 為 `_init()` 時經 `__generator()` 解析完成的產生器函式，
	 * 供 `seed()` 重新取樣時呼叫。
	 *
	 * Instance state: `_opts` is the `seedrandom` options currently in effect;
	 * `_seedrandom` is the generator function resolved by `__generator()` during
	 * `_init()`, which `seed()` invokes when re-sampling.
	 */
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

	/**
	 * `name` 的組成零件 (Name Parts)：`_NAME` 為固定前綴；`_TYPE` 記錄目前選用的演算法名稱，
	 * 供 `name` getter 拼出 `seedrandom:<演算法>`，未指定時保持 `null`。
	 *
	 * Name parts for `name`: `_NAME` is the constant prefix; `_TYPE` records the currently
	 * selected algorithm so the `name` getter can compose `seedrandom:<algorithm>`,
	 * staying `null` when none is specified.
	 */
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

	/**
	 * 將演算法 (Algorithm) 參數解析為實際可呼叫的 `seedrandom` 產生器函式。
	 * Resolve the algorithm argument into an actual callable `seedrandom` generator function.
	 *
	 * @param fn 內建演算法名稱、`seedrandom/lib/` 模組名稱或函式 (Built-in name, `seedrandom/lib/` module name, or function) / the algorithm name or function
	 * @returns 可呼叫的產生器 (Callable generator) / a callable generator
	 * @throws `RangeError` 當名稱字串包含 `..` 或不符合安全名稱格式 / when the name contains `..` or fails the safe-name pattern
	 */
	protected __generator(fn?: typeof seedrandom | IRNGSeedRandomLib | IRNGSeedRandomLibValueOf): IRNGSeedRandomGenerator
	{
		/**
		 * 三分支解析 (Three-branch Resolution)：字串依「內建名稱／`seedrandom/lib/` 模組名稱」
		 * 處理，不安全的名稱直接拋錯；傳入函式則沿用其 `name` 作為 `_TYPE`；完全省略時將
		 * `_TYPE` 清為 `null`，讓 `name` getter 回傳不含後綴的名稱。
		 *
		 * Three-branch resolution: a string is treated as either a built-in name or a
		 * `seedrandom/lib/` module name (unsafe names throw); a function keeps its `name`
		 * as `_TYPE`; a fully omitted value resets `_TYPE` to `null` so the `name` getter
		 * returns the name without a suffix.
		 */
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
					/** 內建名稱直接對應 `seedrandom` 物件上的函式 / built-in names map directly to functions on the `seedrandom` object */
					fn = seedrandom[fn];
					//fn = require(`seedrandom/lib/${fn}`)

					/**
					 * TODO: 懷疑此行在 `fn` 已被重新指派為「函式」之後才執行，會把函式本身
					 * （而非名稱字串）存入 `_TYPE`，使 `name` getter 拼出 `seedrandom:<函式原始碼>`；
					 * 推測應於重新指派前記錄名稱。依規範不修改邏輯，僅以 TODO 註解記錄待確認。
					 *
					 * TODO: suspected issue — this line runs after `fn` was reassigned to a
					 * function, storing the function itself (not the name string) into `_TYPE`,
					 * which makes the `name` getter compose `seedrandom:<function source>`;
					 * believed the name should be recorded before the reassignment.
					 * Logic intentionally left untouched per convention, recorded as TODO only.
					 */
					this._TYPE = fn;

					break;
				default:
					/**
					 * 模組路徑安全檢查 (Module Path Safety Check)：名稱不得包含 `..`，
					 * 且僅允許字母、連字號與點號，避免路徑穿越 (Path Traversal) 載入任意模組；
					 * 通過檢查後才以 `require()` 動態載入對應的 `seedrandom/lib/` 模組，
					 * 否則拋出 `RangeError`。
					 *
					 * Module path safety check: the name must not contain `..` and may only use
					 * letters, hyphens and dots, preventing path traversal into arbitrary
					 * modules; only after passing is the matching `seedrandom/lib/` module
					 * loaded dynamically via `require()`, otherwise a `RangeError` is thrown.
					 */
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

		/**
		 * 兜底 (Fallback)：前面所有分支都未取得函式時（例如完全省略 `fn`），
		 * 回退為預設的 `seedrandom`，確保回傳值永遠可呼叫。
		 *
		 * Fallback: when none of the branches produced a function (e.g. `fn` was fully
		 * omitted), fall back to the default `seedrandom` so the return value is always callable.
		 */
		fn = fn || seedrandom;

		return fn as IRNGSeedRandomGenerator;

		/*
		return (seed?, opts?: RNGSeedRandomOptions, ...argv) => {
			// @ts-ignore
			return fn(seed, opts, ...argv)
		}
		*/
	}

	/**
	 * 目前生效的 `seedrandom` 選項 (Options)，由 `_init()` 與 `seed()` 共同維護。
	 * The `seedrandom` options currently in effect, maintained by `_init()` and `seed()`.
	 *
	 * @returns 選項物件 (Options object) / the options object
	 */
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
		/**
		 * 邊界情況 (Boundary Case)：`seedrandom` 只有在選項 `state: true` 時才會在 PRNG 上
		 * 掛載 `state()` 方法；未啟用時方法不存在，函式會自然結束並回傳 `undefined`。
		 *
		 * Boundary case: `seedrandom` only attaches a `state()` method to the PRNG when the
		 * `state: true` option is enabled; without it the method is absent, so the getter
		 * simply runs to the end and returns `undefined`.
		 */
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
		/**
		 * 選項處理 (Options Handling)：`opts === null` 是「清除」訊號，將 `_opts` 設為
		 * `undefined`，待下一次 `_init()` 才會重新套用 `defaultOptions`；其他假值 (Falsy)
		 * 沿用現有設定，只有真值 (Truthy) 才覆寫，避免一般的重新播种 (Reseed) 呼叫
		 * 意外清掉選項。
		 *
		 * Options handling: `opts === null` is a "clear" signal that sets `_opts` to
		 * `undefined`, so the next `_init()` re-applies `defaultOptions`; other falsy
		 * values keep the current settings and only a truthy value overwrites them,
		 * preventing an ordinary reseed call from accidentally wiping the options.
		 */
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

	/**
	 * 以目前實例的設定複製出新的 `RNGSeedRandom`。
	 * Create a new `RNGSeedRandom` copying the current instance's settings.
	 *
	 * @param seed 覆寫的種子 (Seed to override with) / the seed to override with
	 * @param opts 覆寫的選項 (Options to override with) / the options to override with
	 * @param argv 其餘參數 / the remaining arguments
	 * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
	 */
	// @ts-ignore
	clone(seed?, opts?: IRNGSeedRandomOptions, ...argv): RNGSeedRandom
	{
		return cloneClass(RNGSeedRandom, this, seed, opts, ...argv);
	}

}

/**
 * `seedrandom` 的內部狀態 (Internal State)：`i`、`j` 為洗牌索引 (Shuffle Index)，
 * `S` 為洗牌後的記憶池 (Shuffled Pool)。
 *
 * The internal state of `seedrandom`: `i` and `j` are shuffle indices and `S` is the
 * shuffled pool.
 */
export interface IRNGSeedRandomState
{
	i: number,
	j: number,
	S: number[],
}

/**
 * 可呼叫的亂數來源函式 (Callable Random Source)：呼叫時傳入種子 (Seed) 與選項 (Options)，
 * 回傳可持續取樣的擬隨機數列產生器 (PRNG)。
 *
 * A callable random source: invoked with a seed and options, it returns a
 * pseudorandom number generator that can be sampled continuously.
 */
export interface IRNGSeedRandomGenerator
{
	(seed?: any, opts?: IRNGSeedRandomOptions, ...argv: any[]): ISeedRandomPRNG
}

export default RNGSeedRandom;
