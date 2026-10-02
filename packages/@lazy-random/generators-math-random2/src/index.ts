import { RNGFunction } from '@lazy-random/generators-function';
import { _MathRandom } from '@lazy-random/original-math-random';

/**
 * 以原生 `Math.random` 為亂數 (Random Number) 來源的亂數產生器 (Random Number Generator)。
 * 將函式型 (Function-based) 來源包裝為 `RNGFunction` 實例，以便與 `@lazy-random` 系列其他演算法共用同一介面。
 *
 * A random number generator backed by the native `Math.random`. It wraps a
 * function-based source into an `RNGFunction` instance so it can share the
 * same interface with other algorithms in the `@lazy-random` family.
 */
export class RNGMathRandom2 extends RNGFunction<typeof _MathRandom>
{
	/**
	 * 建立 `Math.random` 亂數產生器。
	 * Create a `Math.random`-backed random number generator.
	 *
	 * @param seed 亂數來源函式 (Random source function)，省略時回退至 `_MathRandom` / the random source function; falls back to `_MathRandom` when omitted
	 * @param opts 傳給基類 `RNGFunction` 的選項 (Options) / options forwarded to the base `RNGFunction` class
	 * @param argv 其餘參數，原樣轉交基類 / remaining arguments forwarded to the base class
	 */
	constructor(seed: typeof _MathRandom = _MathRandom, opts?, ...argv)
	{
		/**
		 * 邊界情況 (Boundary Case)：預設值只攔截「完全省略參數」的情形，
		 * 調用方仍可能明確傳入 `null`、`undefined` 或其他假值 (Falsy)，
		 * 此處再次以 `||` 兜底，確保後續取樣一定有可用的亂數來源。
		 *
		 * The default value only covers a completely omitted argument; callers may
		 * still explicitly pass `null`, `undefined` or another falsy value, so the
		 * `||` fallback here guarantees a usable random source for later sampling.
		 */
		super(seed || _MathRandom, opts, ...argv)
	}

	/**
	 * 產生器名稱 (Generator Name)，供除錯、序列化或辨識演算法時使用。
	 * The generator name, used for debugging, serialization and algorithm identification.
	 *
	 * @returns 固定字串 `'math-random2'` / the constant string `'math-random2'`
	 */
	override get name()
	{
		return 'math-random2'
	}
}

export default RNGMathRandom2


