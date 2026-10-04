import { RNGCrypto } from '@lazy-random/generators-crypto';
import { RNGMathRandom2 } from '@lazy-random/generators-math-random2';
import { RNGSeedRandom } from '@lazy-random/generators-seedrandom';
import { RNG, _isInstanceOfRNG } from '@lazy-random/rng-abstract'

import { RNGXOR128 } from '@lazy-random/generators-xor128'
import { RNGFunction, IRNGFunctionSeed } from '@lazy-random/generators-function'
import { RNGMathRandom } from '@lazy-random/generators-math-random';

/**
 * 內建亂數產生器 (Built-in RNG) 對照表：字串鍵 (String Key) 對應到具體的 RNG 子類別，
 * 供 `RNGFactory()` 依第一個參數查找並實例化；新增演算法只需在此登錄。
 * Maps string keys to concrete RNG subclasses so `RNGFactory()` can look them up and instantiate them.
 */
const PRNG_BUILTINS = {
	// TODO: add more prng from C++11 lib
	'xor128': RNGXOR128,
	'function': RNGFunction,
	'default': RNGMathRandom2,

	'math-random': RNGMathRandom,
	'math-random2': RNGMathRandom2,

	'seedrandom': RNGSeedRandom,

	'crypto': RNGCrypto,
}

/**
 * `RNGFactory()` 可接受的第一個參數型別：內建字串鍵、既有的 RNG 實例，或種子函式 (Seed Function)。
 * The first argument accepted by `RNGFactory()`: a built-in key, an existing RNG instance, or a seed function.
 *
 * TODO: 尾端的 `| any` 會讓整個聯合型別 (Union Type) 退化成 `any` 而失去型別檢查意義；
 * 且 `PRNG_BUILTINS` 已註冊的 `'math-random'`、`'math-random2'`、`'crypto'` 也未列於此。
 * The trailing `| any` collapses the union to `any`, and the registered `'math-random'`, `'math-random2'`, `'crypto'` keys are missing here.
 */
export type IRNGFactoryType =
	'xor128'
	| 'function'
	| 'default'
	| 'seedrandom'
	| RNG
	| IRNGFunctionSeed
	| any

/**
 * 亂數產生器工廠 (RNG Factory)：依第一個參數決定要建立哪一種 RNG 實例。
 *
 * 可傳入內建字串鍵 (如 `'xor128'`、`'default'`)、函式 (Function)、既有的 RNG 實例，
 * 或用於 `RNGFunction` 的種子函式 (Seed Function)；完全不傳參數時回傳預設實作。
 * Creates an RNG instance based on the first argument: a built-in key, a function, an existing RNG, or a seed function.
 *
 * @param args 第一個參數決定型別，其餘參數轉交給對應的 RNG 建構子 / the first argument selects the type, the rest are forwarded to its constructor
 * @returns 對應的 RNG 實例 / the matching RNG instance
 * @throws {TypeError} 當第一個參數不是合法的 RNG 表示法時 / when the first argument is not a valid RNG representation
 */
/**
 * TODO: 無參數呼叫時實作會走 `'default'` 分派、建立 `RNGMathRandom2`，
 * 但此 overload 宣告回傳 `RNGFunction`，型別與執行期行為可能不一致，待確認。
 * Calling with no arguments instantiates `RNGMathRandom2` via the `'default'` path, but this overload declares `RNGFunction`; verify.
 */
export function RNGFactory(): RNGFunction

export function RNGFactory<R extends RNG>(arg0: R, ...rest): R

export function RNGFactory(arg0: 'xor128', ...rest): RNGXOR128
export function RNGFactory(arg0: 'function', ...rest): RNGFunction
export function RNGFactory<S extends IRNGFunctionSeed = IRNGFunctionSeed>(arg0: 'function', ...rest): RNGFunction<S>
/**
 * TODO: 實作中 `'default'` 對應的是 `RNGMathRandom2`，但此 overload 宣告回傳 `RNGMathRandom`，
 * 請確認兩者的繼承關係是否符合預期。
 * The implementation maps `'default'` to `RNGMathRandom2`, but this overload declares `RNGMathRandom`; verify the inheritance is intended.
 */
export function RNGFactory(arg0: 'default', ...rest): RNGMathRandom
export function RNGFactory(arg0: 'seedrandom', ...rest): RNGSeedRandom

export function RNGFactory<S extends IRNGFunctionSeed = IRNGFunctionSeed>(arg0: S, ...rest): RNGFunction<S>

export function RNGFactory<R extends RNG = RNG>(...argv): R

/**
 * 實作本體：依第一個參數的型別 (Typeof) 分派到對應的建立流程。
 * Implementation body: dispatches to the matching creation path based on the type of the first argument.
 *
 * @param args 第一個參數用於分派，其餘參數轉交給 RNG 建構子 / the first argument selects the path, the rest are forwarded to the RNG constructor
 */
export function RNGFactory(...args)
{
	/**
	 * 未傳入參數時以 `'default'` 取代，確保下方的 switch 永遠有可分派的值。
	 * Defaults to `'default'` so the switch below always has a value to dispatch on.
	 */
	const [arg0 = 'default', ...rest] = args

	/**
	 * 依 `typeof` 分派：物件與函式代表「已存在的 RNG」或「自訂產生器」，
	 * 字串則查表取得內建實作；其餘型別一律落入最後的拋錯。
	 * Dispatches on `typeof`: objects/functions mean an existing RNG or custom generator, strings look up built-ins, everything else throws.
	 */
	switch (typeof arg0)
	{
		case 'object':
			/**
			 * 已經是 RNG 實例就直接回傳，讓呼叫端可以混用「既存實例」與「字串鍵」兩種寫法。
			 * Passes through an existing RNG instance so callers can mix instances and string keys.
			 *
			 * 以 `_isInstanceOfRNG()` 取代原生 `instanceof RNG`：兩者共用品牌鍵 (Brand Key) 驗證，
			 * 可避免 ESM / CJS 重複載入時，同一個別被當成不同個體而誤判成「不是 RNG」。
			 * `_isInstanceOfRNG()` replaces native `instanceof RNG`; both share the brand-key check, so the
			 * same object loaded through a duplicate ESM/CJS copy is not misjudged as "not an RNG".
			 */
			if (_isInstanceOfRNG(arg0))
			{
				return arg0
			}
			/**
			 * TODO: 非 RNG 的物件（含 `null`）會在此中斷並落入後方的 `invalid RNG` 錯誤，
			 * 錯誤訊息會把物件字串化成 `[object Object]`，對除錯沒有幫助。
			 * Non-RNG objects (including `null`) fall through to the error below, whose message stringifies to `[object Object]`.
			 */
			break

		case 'function':
			/**
			 * 傳入函式時視為產生器函式 (Generator Function)，包成 `RNGFunction` 後回傳。
			 * Wraps a generator function in `RNGFunction` when a function is passed in.
			 */
			return new RNGFunction(arg0)

		case 'string':
			/**
			 * 只有查得到內建實作的字串鍵才會建立；未註冊的字串會 `break` 後拋出 `TypeError`。
			 * Only registered string keys instantiate here; unknown strings `break` and throw a `TypeError`.
			 */
			const PRNG = PRNG_BUILTINS[arg0]
			if (PRNG)
			{
				return new PRNG(...rest)
			}
			break
	}

	/**
	 * 走到這裡代表第一個參數無法辨識為任何合法的 RNG 表示法，統一拋出 `TypeError`。
	 * Reached when the first argument does not match any valid RNG representation; throws a `TypeError`.
	 */
	throw new TypeError(`invalid RNG "${arg0}"`)
}

export default RNGFactory

