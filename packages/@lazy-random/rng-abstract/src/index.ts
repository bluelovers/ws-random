import { hashAny, randomSeedStr, seedToken } from '@lazy-random/seed-token';
import { RNGCore, IRNGLike } from '@lazy-random/rng-abstract-core';

export type { IRNGLike };

/**
 * 亂數產生器 (Random Number Generator) 的抽象基底類別 (Abstract Base Class)
 *
 * 統一實例化的入口與種子 (Seed) 推導規則，實際演算法由繼承的子類別實作。
 * Abstract base class that centralizes instantiation and seed derivation; concrete algorithms live in subclasses.
 */
export abstract class RNG extends RNGCore implements IRNGLike
{

	/**
	 * 建立目前子類別的實例，作為統一的實例化工廠 (Factory Method)
	 *
	 * 僅供繼承 `RNG` 的具體子類別呼叫，抽象類別本身不可被實例化。
	 * Creates an instance of the current subclass as a unified factory method.
	 *
	 * @param seed 種子 (Seed)，任意型別；未提供時交由種子推導處理
	 * @param opts 種子推導所使用的選項 (Options)
	 * @param argv 其餘欲傳給建構子的參數 (Extra constructor arguments)
	 * @returns 目前子類別的實例 / an instance of the current subclass
	 * @throws {ReferenceError} 當 `this` 為 `RNG`、`RNGCore` 或空值時，抽象類別不可直接實例化
	 */
	public static override create(seed?, opts?, ...argv)
	{
		/**
		 * 以 `this` 判斷是否直接對抽象類別呼叫：`RNG` 與 `RNGCore` 只能被繼承不能被實例化，
		 * `!this` 則涵蓋以 `call` / `apply` 綁定到空值 (Falsy) 的邊界情況，
		 * 這兩種情況都應立即拋出錯誤，避免建立出沒有實際演算法的無效實例。
		 * Guards against instantiating the abstract class itself, including edge cases bound via `call` / `apply`.
		 */
		if (this === RNG || this === RNGCore || !this)
		{
			throw new ReferenceError('RNG is abstract class');
		}

		/**
		 * 子類別建構子的簽章 (Signature) 在靜態型別上無法確知，
		 * 因此需要 `@ts-ignore` 才能將參數原樣轉交給 `new`。
		 * The subclass constructor signature is not statically known, so `@ts-ignore` is required to forward all arguments.
		 */
		// @ts-ignore
		return new this(seed, opts, ...argv);
	}

	/**
	 * return number for make new seed
	 */
	protected override _seedNum(seed?, opts?, ...argv): number
	{
		// TODO: add entropy and stuff
		/**
		 * 種子 (Seed) 缺失或為空值 (Falsy) 時不能直接沿用，否則每次都會推導出相同的種子，
		 * 因此先以 `randomSeedStr()` 產生新的隨機字串，確保結果不會被固定住。
		 * Falls back to a fresh random seed string when the given seed is missing or falsy, so results are not fixed.
		 */
		if (typeof seed === 'undefined' || seed === null || seed === 0)
		{
			/**
			 * breaking change
			 * this make always get a new token
			 * when seed is undefined
			 */
			seed = randomSeedStr();
		}

		return seedToken(seed, opts, ...argv);
	}

	/**
	 * return string for make new seed
	 */
	protected override _seedStr(seed?, opts?, ...argv): string
	{
		return hashAny(seed, opts, ...argv);
	}

}

export default RNG;

