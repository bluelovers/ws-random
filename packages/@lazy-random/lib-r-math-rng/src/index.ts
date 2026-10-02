import * as libRMath from 'lib-r-math.js';
import { Random, random } from 'random-extra/src/random';
import { RNG, IRNGLike } from '@lazy-random/rng-abstract';
import isExtendsOf from 'is-extends-of';
import { IRNG } from 'lib-r-math.js';

/**
 * 將 random-extra 的亂數產生器 (Random) 包裝成 lib-r-math.js 的 IRNG
 * Wraps a random-extra `Random` generator as an `IRNG` of lib-r-math.js
 *
 * 讓 lib-r-math.js 的函式可以改用 random-extra 作為亂數 (Random Number) 來源
 * Allows lib-r-math.js functions to consume random-extra as their random number source
 */
export class LibRMathRngWithRandom extends IRNG
{
	protected __random: Random;
	protected __seed;

	/**
	 * 建立實例並立刻套用底層亂數產生器與種子 (Seed)
	 * Create an instance and immediately apply the underlying RNG and seed
	 *
	 * @param _seed - 亂數種子 (Seed)，會一併交給 `use()` 重設
	 * @param rng - 底層亂數來源，可為 `Random`、`RNG`、`IRNGLike` 實例或名稱字串
	 */
	constructor(_seed?: number, rng?: Random | RNG | any | IRNGLike)
	{
		// @ts-ignore
		super(_seed);
		this.use(rng, _seed)
	}

	/**
	 * 供 lib-r-math.js 顯示用的名稱，格式為 `Random<底層產生器名稱>`
	 * Display name for lib-r-math.js, formatted as `Random<underlying generator name>`
	 */
	// @ts-ignore
	protected get _name()
	{
		return 'Random<' + this.__random.rng.name + '>';
	}

	/**
	 * 取得目前的亂數種子 (Seed)
	 * Get the current random seed
	 */
	get seed()
	{
		return this.__seed
	}

	/**
	 * 重設亂數種子 (Seed)，同步呼叫底層 `Random` 的種子設定函式
	 * Reset the random seed, which also invokes the underlying `Random` seed function
	 *
	 * @param _seed - 新的亂數種子 (Seed)
	 */
	set seed(_seed)
	{
		this.__random.seed?.(this.__seed = _seed)
	}

	/**
	 * 切換底層亂數產生器 (RNG)，並在有傳入時重設種子 (Seed)
	 * Switch the underlying RNG and reset the seed when one is provided
	 *
	 * @param rng - 底層亂數來源；未傳入時沿用既有的 `__random`，否則退回全域 `random`
	 * @param _seed - 亂數種子 (Seed)，僅在非 `undefined` 時重設
	 */
	use(rng?: Random | RNG | IRNGLike | any, _seed?)
	{
		/**
		 * 將各種型別的輸入正規化為 `Random` 實例：
		 * `RNG`／`IRNGLike` 已可直接使用故保持原樣；`'seedrandom'` 需以關閉熵源 (Entropy) 的選項建立；
		 * 其餘非 `Random` 的輸入（多為名稱字串）交由 `random.newUse()` 解析
		 * Normalize every input type into a `Random` instance:
		 * `RNG`/`IRNGLike` are already usable and kept as-is; `'seedrandom'` is created with entropy disabled;
		 * any other non-`Random` input (usually a name string) is resolved via `random.newUse()`
		 */
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

		/**
		 * 僅在明確傳入種子 (Seed) 時才重設，避免 `undefined` 覆寫既有種子狀態
		 * Only reseed when a seed is explicitly provided, so `undefined` does not clobber existing seed state
		 */
		if (typeof _seed !== 'undefined')
		{
			this.seed = _seed
		}
	}

	/**
	 * lib-r-math.js 的 IRNG 要求的初始化鉤子 (Hook)，此包裝無需額外初始化
	 * Initialization hook required by lib-r-math.js's `IRNG`; no extra setup is needed here
	 */
	_setup() {}

	/**
	 * 取得下一個亂數 (Random Number)，委派給底層 `Random.next()`
	 * Get the next random number, delegating to the underlying `Random.next()`
	 *
	 * @returns 底層 `Random` 產生的亂數 / the random number produced by the underlying `Random`
	 */
	internal_unif_rand()
	{
		return this.__random.next()
	}
}

/**
 * 型別守衛 (Type Guard)：判斷是否為 lib-r-math.js 的 RNGLike
 * Type guard: checks whether a value is a lib-r-math.js RNGLike
 *
 * 以鴨子型別 (Duck Typing) 檢查 `unif_rand` 或 `internal_unif_rand` 是否存在
 * Uses duck typing to check for `unif_rand` or `internal_unif_rand`
 *
 * @param rng - 待檢查的值 / the value to check
 * @returns 是否為 RNGLike / whether the value is RNGLike
 */
export function _isLibRMathRNGLike<R extends IRNG>(rng: R | unknown): rng is R
{
	/**
	 * 兩種函式名稱任一存在即視為 RNGLike，相容有無公開 `unif_rand` 的實作
	 * Treat the value as RNGLike when either function exists, covering implementations with or without a public `unif_rand`
	 */
	// @ts-ignore
	if (rng && (typeof rng.unif_rand === 'function' || typeof rng.internal_unif_rand === 'function'))
	{
		return true
	}
	return false
}

/**
 * 型別守衛 (Type Guard)：判斷是否為 lib-r-math.js `IRNG` 的子類別 (Subclass)
 * Type guard: checks whether a value is a subclass of lib-r-math.js's `IRNG`
 *
 * 與 `_isLibRMathRNGLike` 的差別在於此處檢查的是類別繼承關係而非實例特徵
 * Unlike `_isLibRMathRNGLike`, this checks class inheritance rather than instance shape
 *
 * @param rng - 待檢查的值 / the value to check
 * @returns 是否為 `IRNG` 子類別 / whether the value is an `IRNG` subclass
 */
export function _isExtendsOfLibRMathRNGLike<R extends IRNG>(rng: R | unknown): rng is R
{
	/**
	 * 先確認值存在再檢查繼承關係，避免 `null`／`undefined` 直接交給 `isExtendsOf` 造成誤判
	 * Ensure the value exists before checking inheritance, so `null`/`undefined` is not misjudged by `isExtendsOf`
	 */
	if (rng && isExtendsOf(rng, IRNG as any))
	{
		return true
	}
	return false
}

/**
 * 將 lib-r-math.js 的亂數產生器 (RNG) 包裝成 `@lazy-random` 的 `RNG`
 * Wraps a lib-r-math.js RNG as a `@lazy-random` `RNG`
 *
 * 讓 `@lazy-random`／`random-extra` 的函式可以改用 lib-r-math.js 作為亂數 (Random Number) 來源
 * Allows `@lazy-random`/`random-extra` functions to consume lib-r-math.js as their random number source
 *
 * @template R - 底層的 lib-r-math.js `IRNG` 型別 / the underlying lib-r-math.js `IRNG` type
 */
export class RandomRngWithLibRMath<R extends IRNG> extends RNG
{
	protected _rng: R;
	protected _seedable: boolean = true;
	protected _fn: () => number;

	/**
	 * 建立包裝器，實際的亂數產生器 (RNG) 解析交給 `_init()` 處理
	 * Create the wrapper; actual RNG resolution is delegated to `_init()`
	 *
	 * @param seed - 種子 (Seed) 或 `IRNG` 實例／子類別／RNGLike 實例
	 * @param opts - 第二個候選的亂數產生器 (RNG) 或名稱
	 */
	constructor(seed?, opts?, ...argv)
	{
		super();
		this._init(seed, opts, ...argv)
	}

	/**
	 * 依優先順序解析底層 `IRNG`，並綁定取亂數 (Random Number) 的函式
	 * Resolve the underlying `IRNG` by priority and bind the random number function
	 *
	 * @param seed - 種子 (Seed) 或第一個候選的亂數來源
	 * @param opts - 第二個候選的亂數來源或名稱
	 */
	protected override _init(seed?, opts?, ...argv)
	{
		/**
		 * 解析優先順序（高 → 低）：
		 * 1. `seed`／`opts` 本身已是 `IRNG` 實例則直接採用
		 * 2. `seed`／`opts` 是 `IRNG` 子類別則以另一個參數作為種子 (Seed) 實例化
		 * 3. `seed`／`opts` 是具有 `unif_rand`／`internal_unif_rand` 的 RNGLike 實例則直接採用
		 * 4. `opts` 是 lib-r-math.js 匯出的名稱則查表實例化
		 * 5. 以上皆非時退回預設的 MersenneTwister
		 *
		 * Resolution priority (highest first):
		 * 1. Use `seed`/`opts` directly when it is already an `IRNG` instance
		 * 2. Instantiate it with the other argument as the seed when it is an `IRNG` subclass
		 * 3. Use `seed`/`opts` directly when it is an RNGLike instance exposing `unif_rand`/`internal_unif_rand`
		 * 4. Look the name up in lib-r-math.js exports when `opts` is an exported name
		 * 5. Fall back to the default MersenneTwister otherwise
		 */
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
		/**
		 * TODO: `libRMath[opts]` 未過濾非 `IRNG` 的匯出（例如 `rng` 命名空間物件或其他工具函式），
		 * 傳入此類名稱時 `new r(...)` 可能拋出「不是建構函式」的錯誤
		 * TODO: `libRMath[opts]` does not filter non-`IRNG` exports (such as the `rng` namespace object or other helpers);
		 * passing such a name may make `new r(...)` throw a "not a constructor" error
		 */
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

		/**
		 * 優先綁定 `internal_unif_rand`（與 lib-r-math.js 的 `IRNG` 內部慣用法一致），
		 * 底層實作沒有該方法時才退回公開的 `unif_rand`
		 * Prefer binding `internal_unif_rand` (consistent with lib-r-math.js's `IRNG` convention),
		 * falling back to the public `unif_rand` only when the underlying implementation lacks it
		 */
		// @ts-ignore
		this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
	}

	/**
	 * 亂數產生器 (RNG) 的名稱，格式為 `libRMath<底層產生器名稱>`
	 * Name of the RNG, formatted as `libRMath<underlying generator name>`
	 */
	override get name()
	{
		return 'libRMath'
			+ (this._rng.name ? `<${this._rng.name}>` : '')
		;
	}

	/**
	 * 回傳底層 `IRNG` 的種子 (Seed)
	 * Return the seed of the underlying `IRNG`
	 */
	public override get options(): number[]
	{
		// @ts-ignore
		return this._rng.seed
	}

	/**
	 * 取得下一個亂數 (Random Number)
	 * Get the next random number
	 *
	 * @returns 底層 `IRNG` 產生的亂數 / the random number produced by the underlying `IRNG`
	 */
	public next(): number
	{
		return this._fn()
	}

	/**
	 * 將種子 (Seed) 寫入底層 `IRNG`
	 * Write the seed into the underlying `IRNG`
	 *
	 * 種子 (Seed) 會先經 `_seedNum()` 整理後，以單元素陣列寫入底層 `IRNG.seed`
	 * The seed is normalized via `_seedNum()` and written into the underlying `IRNG.seed` as a single-element array
	 *
	 * @param seed - 新的亂數種子 (Seed)，亦可為種子陣列
	 */
	// @ts-ignore
	public override seed(seed?: any | number[], opts?, ...argv)
	{
		// @ts-ignore
		this._rng.seed = [this._seedNum(seed)]
	}
}

export default RandomRngWithLibRMath
