
/**
 * 以鴨子型別 (Duck Typing) 描述亂數產生器 (RNG) 的最小形狀，讓未繼承 `RNGCore` 的實作也能共用同一份合約
 * Describes the minimal shape of a random number generator (RNG) via duck typing, so implementations that do not extend `RNGCore` can share the same contract
 */
export interface IRNGLike
{
	/**
	 * 取得下一個亂數 (Random Number)，回傳 `[0, 1)` 的浮點數
	 * Get the next random number, returning a float in `[0, 1)`
	 */
	next(): number

	/**
	 * 重新設定種子 (Seed)；實作可依能力決定是否提供此方法
	 * Reset the seed; implementations may provide this or not depending on capability
	 */
	seed?(seed?, opts?, ...argv)
}

/**
 * 亂數產生器 (RNG) 的抽象核心 (Abstract Core)：提供初始化鉤子 (Hook)、種子 (Seed) 解析與靜態工廠 (Factory)
 * Abstract core of a random number generator: provides initialization hooks, seed resolution, and a static factory
 *
 * 子類別至少必須實作抽象的 `next()`；建議一併覆寫 `name`、`clone()`、`_seedNum()` 與 `_seedStr()`
 * Subclasses must at least implement the abstract `next()`; overriding `name`, `clone()`, `_seedNum()` and `_seedStr()` is also recommended
 */
export abstract class RNGCore implements IRNGLike
{
	/**
	 * 建構器本身不做初始化；實際的種子 (Seed) 解析請由子類別在建構流程中呼叫 `_init()` 完成
	 * The constructor itself performs no initialization; subclasses should call `_init()` during construction to resolve the seed
	 */
	protected constructor();
	protected constructor(seed?);
	protected constructor(seed?, opts?, ...argv);
	protected constructor(seed?, opts?, ...argv)
	{

	}

	/**
	 * 供子類別覆寫的參數驗證鉤子 (Hook)，預設不做任何檢查
	 * Validation hook for subclasses to override; checks nothing by default
	 */
	protected _init_check(seed?, opts?, ...argv)
	{

	}

	/**
	 * 初始化入口：先執行 `_init_check()` 驗證參數，再由子類別延伸後續流程
	 * Initialization entry: run `_init_check()` to validate the arguments first, then let subclasses extend the rest
	 *
	 * @param seed - 種子 (Seed) / the seed
	 * @param opts - 建立選項 (Options) / creation options
	 */
	protected _init(seed?, opts?, ...argv)
	{
		this._init_check(seed, opts, ...argv);
	}

	/**
	 * 靜態工廠 (Factory)：以 `new this(...)` 建立子類別實例
	 * Static factory that instantiates the subclass via `new this(...)`
	 *
	 * @param seed - 種子 (Seed) / the seed
	 * @param opts - 建立選項 (Options) / creation options
	 * @returns 子類別的實例 / an instance of the subclass
	 * @throws 於 `RNGCore` 本身（或無建構器）上呼叫時拋出 `ReferenceError` / throws `ReferenceError` when invoked on `RNGCore` itself (or without a constructor)
	 */
	public static create(seed?, opts?, ...argv)
	{
		/**
		 * `this === RNGCore` 表示未經子類別呼叫，`!this` 則涵蓋可能的 falsy 呼叫情境；
		 * 兩者都代表要直接實例化抽象類別，因此一律拋錯阻止誤用
		 * `this === RNGCore` means no subclass is involved and `!this` covers possible falsy call contexts;
		 * both mean someone is trying to instantiate the abstract class directly, so throw to prevent misuse
		 */
		if (this === RNGCore || !this)
		{
			throw new ReferenceError('RNG is abstract class');
		}

		// @ts-ignore
		return new this(seed, opts, ...argv);
	}

	/**
	 * 亂數產生器 (RNG) 的名稱；抽象核心不提供預設值
	 * Name of the RNG; the abstract core provides no default value
	 *
	 * @throws 子類別未覆寫時拋出 `Error` / throws `Error` when not overridden by a subclass
	 */
	public get name(): string
	{
		throw new Error('RNG.name must be overridden');
	}

	/**
	 * 建立時的選項 (Options) 或種子 (Seed) 資訊，預設回傳 `null`
	 * Creation options or seed information; returns `null` by default
	 */
	public get options(): unknown
	{
		return null;
	}

	/**
	 * 是否支援重新設定種子 (Seed)
	 * Whether reseeding is supported
	 *
	 * TODO: 預設實作回傳 `null` 而非 `false`（宣告型別為 `boolean`），
	 * 呼叫端若以 `=== true` 判定會得到非預期結果；僅記錄、不修改邏輯
	 * TODO: the default returns `null` instead of `false` (declared as `boolean`),
	 * which surprises callers checking `=== true`; recorded only, logic untouched
	 */
	public get seedable(): boolean
	{
		return null;
	}

	/**
	 * should return a float between 0 ~ 1
	 */
	// @ts-ignore
	abstract next(): number
	// {
	// 	throw new ReferenceError('RNG.next must be overridden');
	// }

	/**
	 * 重新設定種子 (Seed)；預設為無操作 (No-op)，由子類別覆寫以實際套用種子
	 * Reset the seed; a no-op by default, overridden by subclasses to actually apply the seed
	 *
	 * @param seed - 新的種子 (Seed) / the new seed
	 * @param opts - 建立選項 (Options) / creation options
	 */
	public seed(seed?, opts?, ...argv)
	{
		//throw new ReferenceError('RNG.seed must be overridden')
	}

	/**
	 * 複製目前的 RNG 實例（可指定新的種子 (Seed)）
	 * Clone the current RNG instance (optionally with a new seed)
	 *
	 * @param seed - 新實例使用的種子 (Seed) / seed for the new instance
	 * @param opts - 建立選項 (Options) / creation options
	 * @throws 子類別未覆寫時拋出 `ReferenceError` / throws `ReferenceError` when not overridden by a subclass
	 */
	public clone(seed?, opts?, ...argv)
	{
		throw new ReferenceError('RNG.clone must be overridden');
	}

	protected _seedAuto(seed: number, opts?, ...argv): number;
	protected _seedAuto(seed: unknown, opts?, ...argv): string;
	protected _seedAuto(seed?, opts?, ...argv): number | string;
	/**
	 * 依輸入型別分流種子 (Seed) 解析路徑
	 * Route seed resolution by the input type
	 *
	 * TODO: 條件 `seed && typeof seed === 'number'` 是真值 (Truthy) 檢查，
	 * 當 `seed` 為 `0` 或 `NaN` 等 falsy 數字時會落入 `_seedStr()` 分支，
	 * 與「數字走 `_seedNum()`」的意圖可能不符；僅記錄、不修改邏輯
	 * TODO: the condition `seed && typeof seed === 'number'` is a truthy check;
	 * falsy numbers such as `0` or `NaN` fall into the `_seedStr()` branch,
	 * which may contradict the "numbers use `_seedNum()`" intent; recorded only, logic untouched
	 */
	protected _seedAuto(seed?, opts?, ...argv): number | string
	{
		/**
		 * 值須同時通過真值檢查且型別為數字才走 `_seedNum()`；其餘（含 `undefined`、字串、falsy 數字）一律交給 `_seedStr()`
		 * Only take `_seedNum()` when the value passes the truthy check and is a number; everything else (including `undefined`, strings, falsy numbers) goes to `_seedStr()`
		 */
		if (seed && typeof seed === 'number')
		{
			return this._seedNum(seed, opts, ...argv);
		}

		return this._seedStr(seed, opts, ...argv);
	}

	/**
	 * return number for make new seed
	 */
	protected _seedNum(seed?, opts?, ...argv): number
	{
		throw new ReferenceError('RNG._seedNum must be overridden');
	}

	/**
	 * return string for make new seed
	 */
	protected _seedStr(seed?, opts?, ...argv): string
	{
		throw new ReferenceError('RNG._seedStr must be overridden');
	}

}

export default RNGCore;

