import { df_sfc32 } from '@lazy-num/float-algorithm';
import { RNGCore } from '@lazy-random/rng-abstract-core';
import { ISeedInputFromStringOrNumberOrArray, seedFromStringOrNumberOrArray } from '@lazy-random/seed-algorithm';

/**
 * SFC32 的種子狀態 (Seed State)：正規化後固定為四個 32 位元整數組成的唯讀四元組 (Readonly Tuple)。
 * The SFC32 seed state: a readonly tuple of exactly four 32-bit integers after normalization.
 */
export type IRNGSfc32SeedTypes = readonly [number, number, number, number];

/**
 * 以 SFC32（Small Fast Counting 32-bit）擬隨機演算法 (PRNG Algorithm) 為核心的
 * 可設定種子亂數產生器 (Seedable Random Number Generator)。種子 (Seed) 經正規化為
 * 四個 32 位元整數後，交由 `df_sfc32` 建立 128 位元狀態的亂數來源。
 *
 * A seedable random number generator built on the SFC32 (Small Fast Counting 32-bit)
 * pseudorandom algorithm. The seed is normalized into four 32-bit integers and fed to
 * `df_sfc32` to create a 128-bit state random source.
 */
export class RNGSfc32 extends RNGCore
{
	/**
	 * 內部亂數來源 (Internal Random Source)：由 `df_sfc32(...seed)` 建立、每次呼叫回傳一個
	 * `[0, 1)` 浮點數的函式；`_seed` 則保存正規化後的四元組種子，供重新播种 (Reseed)
	 * 或除錯時檢視。
	 *
	 * Internal random source: a function created by `df_sfc32(...seed)` that returns one
	 * `[0, 1)` float per call. `_seed` keeps the normalized seed tuple for reseeding or debugging.
	 */
	protected readonly _rng: () => number;
	protected readonly _seed: IRNGSfc32SeedTypes;

	/**
	 * 建立 SFC32 亂數產生器。
	 * Create an SFC32 random number generator.
	 *
	 * @param seed 種子 (Seed)，可為字串、數字或陣列 / the seed: a string, number or array
	 * @param opts 保留參數 (Reserved)，目前 `_init()` 未使用 / reserved; currently unused by `_init()`
	 * @param argv 其餘參數，原樣轉交基類 / remaining arguments forwarded to the base class
	 */
	constructor(seed?: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any)
	{
		super(seed, opts, ...argv);

		/**
		 * 於 `super()` 之後顯式呼叫 `_init()`，確保種子正規化與 `_rng` 的建立
		 * 都發生在基類建構完成之後，避免繼承鏈初始化順序 (Initialization Order)
		 * 造成子類別欄位尚未就緒就被寫入。
		 *
		 * Explicitly call `_init()` after `super()` so seed normalization and `_rng`
		 * creation happen only once the base class has finished constructing, avoiding
		 * an initialization-order problem where subclass fields are written too early.
		 */
		this._init(seed, opts, ...argv);
	}

	/**
	 * 初始化 (Initialize) 種子狀態與亂數來源 (Random Source)，`seed()` 重新播种時也會重用此流程。
	 * Initialize the seed state and random source; `seed()` reuses this flow when reseeding.
	 *
	 * @param seed 種子 (Seed)，可為字串、數字或陣列 / the seed: a string, number or array
	 * @param opts 保留參數 (Reserved)，目前未使用 / reserved; currently unused
	 * @param argv 其餘參數，目前未參與初始化 / remaining arguments; currently not part of initialization
	 */
	protected override _init(seed: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any)
	{
		/**
		 * 正規化 (Normalize)：SFC32 需要 128 位元狀態，故不論原始輸入為字串、數字或陣列，
		 * 一律交由 seed 演算法轉成恰好四個 32 位元整數。
		 *
		 * Normalize: SFC32 needs a 128-bit state, so whatever the raw input is (string,
		 * number or array), the seed algorithm converts it into exactly four 32-bit integers.
		 */
		seed = seedFromStringOrNumberOrArray(seed, 4);

		/**
		 * 將正規化後的四元組存入 `_seed`，並展開 (Spread) 成 `df_sfc32` 的四個參數建立
		 * 亂數來源；`opts` 與 `...argv` 目前不影響初始化結果。
		 *
		 * Store the normalized tuple in `_seed` and spread it into the four arguments of
		 * `df_sfc32` to build the random source; `opts` and `...argv` currently do not
		 * affect the result.
		 */
		// @ts-ignore
		this._seed = seed;
		// @ts-ignore
		this._rng = df_sfc32(...seed);
	}

	/**
	 * 重新播种 (Reseed)：重新正規化種子並重建亂數來源 (Random Source)。
	 * Reseed: re-normalize the seed and rebuild the random source.
	 *
	 * @param seed 新的種子 (New seed)，可為字串、數字或陣列 / the new seed: a string, number or array
	 * @param opts 保留參數 (Reserved)，目前未使用 / reserved; currently unused
	 * @param argv 其餘參數 / the remaining arguments
	 */
	public override seed(seed?: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any)
	{
		return this._init(seed, opts, ...argv);
	}

	/**
	 * 固定回傳 `true`，標示此產生器可設定種子 (Seedable)，基類允許呼叫 `seed()`。
	 * Always returns `true`, marking this generator as seedable so the base class allows `seed()` calls.
	 */
	public override get seedable(): boolean
	{
		return true;
	}

	/**
	 * 取下一個亂數 (Random Number)。
	 * Get the next random number.
	 *
	 * @returns `[0, 1)` 區間的浮點數 (Float in `[0, 1)`) / a float in `[0, 1)`
	 */
	next()
	{
		return this._rng();
	}

	/**
	 * 產生器名稱 (Generator Name)，供除錯或辨識演算法時使用。
	 * The generator name, used for debugging or algorithm identification.
	 *
	 * @returns 固定字串 `'sfc32'` / the constant string `'sfc32'`
	 */
	override get name()
	{
		return 'sfc32';
	}
}

export default RNGSfc32;
