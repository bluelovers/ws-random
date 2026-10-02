/**
 * Created by user on 2018/11/25/025.
 */
/**
 * 跨環境 (Cross-environment) 亂數來源的最小介面 (Minimal Interface)
 * 最小介面需同時涵蓋 Node.js 的 `crypto.randomBytes` 與
 * 瀏覽器的 `crypto.getRandomValues`，讓上層程式可用單一 API 取得加密安全亂數。
 *
 * Minimal interface covering both Node.js `crypto.randomBytes` and
 * browser `crypto.getRandomValues`, so callers can obtain cryptographically
 * secure random numbers through a single API.
 */
export interface ICryptoLike {
	/**
	 * 以同步回傳或 callback 方式取得指定數量的隨機位元組 (Random Bytes)
	 * Obtain the given number of random bytes, either synchronously or via callback.
	 *
	 * @param size 要產生的位元組數 / how many bytes to generate
	 * @param callback 完成時的回呼，第一參數為錯誤 / completion callback whose first argument is an error
	 * @returns 隨機位元組 / the random bytes
	 */
	randomBytes(size: number, callback?: (err: Error | null, buf: Buffer) => void): Buffer;
	/**
	 * 填入加密安全的隨機值，型別由呼叫端決定（僅瀏覽器環境提供）
	 * Fill the given typed array with cryptographically secure random values;
	 * the element type is chosen by the caller (browser environments only).
	 *
	 * @param array 要被填滿的型別化陣列 / the typed array to fill
	 * @returns 與傳入相同的陣列 / the same array instance that was passed in
	 */
	getRandomValues?<T extends Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | null>(array: T): T;
}
/**
 * 以閉包 (Closure) 快取 (Cache) 方式，解析並回傳目前環境可用的 `crypto` 實作
 * Resolve and return the `crypto` implementation available in the current
 * environment, caching the resolved instance inside a closure.
 *
 * 首次呼叫會依序嘗試 `require('crypto')`、全域 (Global) 的 `crypto`／`msCrypto`；
 * 瀏覽器缺少 `randomBytes` 時會補上 (Polyfill) 對應實作。
 * The first call tries `require('crypto')` then global `crypto`／`msCrypto`;
 * a `randomBytes` polyfill is added when the browser lacks one.
 *
 * @returns 目前環境的 `crypto` 實例 / the `crypto` instance for the current environment
 * @throws 環境完全不支援 `crypto` 時拋出 `not support crypto` / throws `not support crypto` when nothing is available
 */
export declare const crossCrypto: () => ICryptoLike;
/**
 * 取得指定數量的加密安全隨機位元組 (Cryptographically Secure Random Bytes)
 * Obtain the given number of cryptographically secure random bytes.
 *
 * 等同於 `crossCrypto().randomBytes(size, callback)`。
 * Equivalent to `crossCrypto().randomBytes(size, callback)`.
 *
 * @param size 要產生的位元組數 / how many bytes to generate
 * @param callback 完成時的回呼，第一參數為錯誤 / completion callback whose first argument is an error
 * @returns 隨機位元組 / the random bytes
 */
export declare function randomBytes(size: number, callback?: (err: Error | null, buf: Buffer) => void): Buffer;

export {
	crossCrypto as default,
};

export {};
