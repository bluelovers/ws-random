/// <reference types="node" />
import { expect } from '@lazy-random/expect';
import { RNGSeedRandom } from '@lazy-random/generators-seedrandom';
import { RNG, _assertInstanceOfRNG } from '@lazy-random/rng-abstract'
import { RNGFactory, IRNGFactoryType } from '@lazy-random/rng-factory'
import { autobind } from 'core-decorators';
import { getClass } from '@lazy-random/clone-class';
import { RandomCore } from '@lazy-random/random-core';

/**
 * Seedable random number generator supporting many common distributions.
 *
 * Defaults to Math.random as its underlying pseudorandom number generator.
 *
 * @name Random
 * @class
 *
 * @param {Rng|function} [rng=Math.random] - Underlying pseudorandom number generator.
 */
@autobind
export class Random<R extends RNG = RNG> extends RandomCore<R>
{
	protected override _init(rng?: R)
	{
		/**
		 * 只有在呼叫端真的傳入 rng 時才驗證型別；
		 * 不強制給定 rng，是為了讓預設情況能沿用 Math.random 作為底層亂數產生器。
		 *
		 * The type check only runs when the caller actually passes an rng;
		 * leaving it optional keeps Math.random as the default underlying PRNG.
		 */
		if (rng)
		{
			//ow(rng, ow.object.instanceOf(RNG))
			/**
			 * 改用 `@lazy-random/rng-abstract` 自帶的 `_assertInstanceOfRNG()` 驗證，
			 * 以品牌鍵 (Brand Key) 補足原生 `instanceof` 比對，
			 * 避免 ESM / CJS 重複載入時同一個別被當成不同個體而誤判失敗；
			 * 顯式傳入 `<R>` 讓收窄 (Narrowing) 結果與 `_init()` 的 `R` 一致。
			 * Uses the package's own `_assertInstanceOfRNG()`: the brand check backs up the native
			 * constructor comparison so a duplicate ESM/CJS copy of the same RNG is not misjudged;
			 * the explicit `<R>` keeps the narrowed type aligned with the `R` used by `_init()`.
			 */
			_assertInstanceOfRNG<R>(rng)
		}

		/**
		 * 以不可列舉 (Non-enumerable)、不可設定 (Non-configurable) 的唯讀屬性
		 * 暴露建構子，讓實例能在不污染迴圈與序列化的前提下取得自己的類別。
		 *
		 * Exposes the constructor as a non-enumerable, non-configurable getter so
		 * an instance can reach its own class without polluting loops or serialization.
		 */
		Object.defineProperty(this, 'Random', {
			configurable: false,
			enumerable: false,
			get()
			{
				return Random
			},
		});

		/**
		 * 最後統一交由 use() 套用 rng，確保驗證、屬性設定與初始化的順序一致。
		 *
		 * Delegates to use() at the end so validation, property setup and
		 * initialization always run in the same order.
		 */
		this.use(rng)
	}

	/**
	 * Creates a new `Random` instance, optionally specifying parameters to
	 * set a new seed.
	 *
	 * @see Rng.clone
	 *
	 * @param {string} [seed] - Optional seed for new RNG.
	 * @param {object} [opts] - Optional config for new RNG options.
	 * @return {Random}
	 */
	override clone(seed?: unknown, opts?: unknown, ...args: unknown[]): Random<R>
	override clone<T extends RNG>(seed?: unknown, opts?: unknown, ...args: unknown[]): Random<T>
	/**
	 * Creates a new `Random` instance, optionally specifying parameters to
	 * set a new seed.
	 *
	 * @see Rng.clone
	 *
	 * @param {string} [seed] - Optional seed for new RNG.
	 * @param {object} [opts] - Optional config for new RNG options.
	 * @return {Random}
	 */
	override clone<T>(seed?: T, ...args: unknown[])
	{

		let o: typeof Random;

		/**
		 * 若在實例上呼叫，取實例真正的建構子（可保留子類別）；
		 * 否則（例如直接以類別靜態方式呼叫）退回至 Random 本身，避免拿到 undefined。
		 *
		 * When called on an instance, reuse its real constructor (keeps subclasses);
		 * otherwise fall back to the Random class itself to avoid undefined.
		 */
		if (this instanceof Random)
		{
			// @ts-ignore
			o = (this.__proto__.constructor)
		}
		else
		{
			o = Random
		}

		/**
		 * 以目前的 rng 再 clone 一次後建立新實例，
		 * 如此新實例與原實例擁有各自獨立的亂數狀態。
		 *
		 * Clones the current rng before constructing the new instance so the
		 * original and the clone keep independent random states.
		 */
		// @ts-ignore
		return new o(this.rng.clone(seed, ...args))
	}

	/**
	 * Sets the underlying pseudorandom number generator used via
	 * either an instance of `seedrandom`, a custom instance of RNG
	 * (for PRNG plugins), or a string specifying the PRNG to use
	 * along with an optional `seed` and `opts` to initialize the
	 * RNG.
	 *
	 * @example
	 * const random = require('random')
	 *
	 * random.use('xor128', 'foobar')
	 * // or
	 * random.use(seedrandom('kittens'))
	 * // or
	 * random.use(Math.random)
	 *
	 * @param {...*} args
	 */
	override use(arg0: IRNGFactoryType, ...args: unknown[]): this
	{
		/**
		 * 透過 RNGFactory 把字串、RNG 實例或函式統一轉成 RNG 物件後，
		 * 直接覆寫 _rng，因此 use() 會「就地」改變目前實例（相對於 newUse() 會另建實例）。
		 *
		 * RNGFactory normalizes a string, RNG instance or function into an RNG
		 * object; overwriting _rng in place is what makes use() mutate the current
		 * instance (unlike newUse(), which creates a new one).
		 */
		this._rng = RNGFactory(arg0, ...args)

		return this as any;
	}

	override newUse(arg0: 'seedrandom', ...args: unknown[]): Random<RNGSeedRandom>
	override newUse<T extends RNG>(arg0: T, ...args: unknown[]): Random<T>
	override newUse(arg0: IRNGFactoryType, ...args: unknown[]): Random<R | any>
	/**
	 * create new Random and use
	 */
	override newUse(arg0: IRNGFactoryType, ...args: unknown[])
	{
		/**
		 * 以 getClass 取得與呼叫端相同的建構子（含子類別），
		 * 再搭配 RNGFactory 建立全新的 Random 實例，原實例的 rng 狀態不受影響。
		 *
		 * getClass resolves the caller's constructor (including subclasses); the
		 * new instance is built from RNGFactory so the original rng is untouched.
		 */
		let o: typeof Random = getClass(Random, this)

		return new o(RNGFactory(arg0, ...args));
	}

	/**
	 * clone current Random and use
	 */
	override cloneUse<T extends RNG>(arg0: IRNGFactoryType, ...args: unknown[]): Random<T>
	override cloneUse(arg0: IRNGFactoryType, ...args: unknown[]): Random<R | any>
	override cloneUse(arg0: IRNGFactoryType, ...args: unknown[])
	{
		/**
		 * 先 clone 保留原實例的建構子與種子情境，再用 use 套用新的亂數產生器；
		 * 分兩步是為了讓呼叫端同時得到「同型別的新實例」與「指定的 rng」。
		 *
		 * Clones first to preserve the constructor and seed context, then applies
		 * the new generator via use(), giving the caller a same-type instance with
		 * the requested rng.
		 */
		let o = this.clone();
		o.use(arg0, ...args);

		return o;
	}

	protected static default: typeof Random;
	readonly Random: typeof Random;
	static Random = Random;
}

/**
 * 套件層級共用的預設實例 (Default Instance)，
 * 讓使用者不必自行 new 就能直接呼叫 random.float() 等方法。
 *
 * Package-level default instance so callers can use random.float() etc.
 * without constructing a Random themselves.
 */
export const random = new Random()
// @ts-ignore
//random.default = random

/**
 * 以唯讀 getter 連結 default，使 ESM 的 `import random from` 與
 * CommonJS 的 `require()` 取得同一個實例，避免循環參照被快取成 undefined。
 *
 * Wires default via a read-only getter so ESM default imports and CommonJS
 * require() resolve to the same instance without caching undefined through
 * circular references.
 */
Object.defineProperty(random, 'default', {
	configurable: false,
	enumerable: false,
	get()
	{
		return random
	},
});

/**
 * 同時把 Random.default 指到同一實例，
 * 讓從類別端存取 default 的程式碼也拿到相同的全域實例。
 *
 * Points Random.default at the same instance so code reaching default from the
 * class side also gets the shared global instance.
 */
Object.defineProperty(Random, 'default', {
	configurable: false,
	enumerable: false,
	get()
	{
		return random
	},
});

/**
 * 以唯讀的 __esModule 標記相容 Babel/TS 的 interop 判斷，
 * 確保 `import random from` 在 CJS 與 ESM 下都能取到正確的預設匯出。
 *
 * A read-only __esModule flag satisfies Babel/TS interop so
 * `import random from` resolves the correct default export in CJS and ESM.
 */
Object.defineProperty(random, "__esModule", { value: true });

// defaults to Math.random as its RNG
export default random;
