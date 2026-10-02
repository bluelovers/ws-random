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
export declare class RNGMathRandom2 extends RNGFunction<typeof _MathRandom> {
	/**
	 * 建立 `Math.random` 亂數產生器。
	 * Create a `Math.random`-backed random number generator.
	 *
	 * @param seed 亂數來源函式 (Random source function)，省略時回退至 `_MathRandom` / the random source function; falls back to `_MathRandom` when omitted
	 * @param opts 傳給基類 `RNGFunction` 的選項 (Options) / options forwarded to the base `RNGFunction` class
	 * @param argv 其餘參數，原樣轉交基類 / remaining arguments forwarded to the base class
	 */
	constructor(seed?: typeof _MathRandom, opts?: any, ...argv: any[]);
	/**
	 * 產生器名稱 (Generator Name)，供除錯、序列化或辨識演算法時使用。
	 * The generator name, used for debugging, serialization and algorithm identification.
	 *
	 * @returns 固定字串 `'math-random2'` / the constant string `'math-random2'`
	 */
	get name(): string;
}

export {
	RNGMathRandom2 as default,
};

export {};
