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
export interface ICryptoLike
{
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
export const crossCrypto = (() =>
{
	let crypto: ICryptoLike;

	return (): ICryptoLike =>
	{
		/*
		 * 只在第一次呼叫時初始化；之後直接回傳快取的實例，
		 * 避免重複載入模組或重複建立 polyfill。
		 * Initialize only on the first call and reuse the cached instance
		 * afterwards, so the module is not reloaded nor the polyfill rebuilt.
		 */
		if (typeof crypto === 'undefined')
		{
			let _crypto: ICryptoLike;
			try
			{
				_crypto = crypto = require('crypto')
			}
			catch (e)
			{
				/*
				 * Node.js 之外（瀏覽器等）改用全域 `crypto`／`msCrypto`，
				 * 且必須具備 `getRandomValues` 才採用，否則等同於不支援。
				 * Outside Node.js (e.g. browsers) fall back to the global
				 * `crypto`／`msCrypto`, and only accept it when `getRandomValues`
				 * exists; otherwise treat it as unsupported.
				 */
				// @ts-ignore
				_crypto = global.crypto || global.msCrypto;

				if (_crypto?.getRandomValues)
				{
					crypto = _crypto
				}
			}

			/*
			 * 瀏覽器的 `crypto` 沒有 `randomBytes`，在此以 `getRandomValues` 補齊，
			 * 讓兩種環境對外的 API 一致；若 `crypto` 本身仍不存在，
			 * 下方 `crypto.randomBytes` 會先拋出 TypeError 而非 `not support crypto`。
			 * Browsers lack `randomBytes`, so it is polyfilled on top of
			 * `getRandomValues` to keep the API consistent across environments;
			 * when `crypto` itself is missing, `crypto.randomBytes` below throws
			 * a TypeError before the intended `not support crypto` error.
			 *
			 * TODO: 上述 `crypto` 缺失時的 TypeError 為疑似 bug，應改為先檢查 `crypto` 是否存在。
			 * TODO: the TypeError when `crypto` is missing looks like a bug; guard for it first.
			 */
			if (!crypto?.randomBytes)
			{
				crypto.randomBytes = crypto.randomBytes || function randomBytes(size: number, cb?: (err: Error | null, buf: Buffer) => void)
				{
					/*
					 * 規格限制 `getRandomValues` 單次最多 65536 bytes，
					 * 超過時直接拒絕，避免回傳長度不足的結果。
					 * The spec caps `getRandomValues` at 65536 bytes per call;
					 * reject larger requests instead of silently truncating.
					 */
					if (size > 65536) throw new Error('requested too many random bytes');
					let rawBytes = new Uint8Array(size);

					/*
					 * size 為 0 時不需呼叫 `getRandomValues`，
					 * 也可避開某些實作對空陣列的處理問題。
					 * Skip `getRandomValues` for size 0, which also avoids
					 * implementations that mishandle empty arrays.
					 */
					if (size > 0)
					{
						_crypto.getRandomValues(rawBytes)
					}

					// XXX: phantomjs doesn't like a buffer being passed here
					/*
					 * 轉成 Buffer 以維持與 Node.js 相同的回傳型別；
					 * 僅在有提供 callback 時呼叫，同步回傳值一律給出。
					 * Wrap into a Buffer to keep the same return type as Node.js;
					 * the callback fires only when provided, and the bytes are
					 * always returned synchronously.
					 */
					let bytes = Buffer.from(rawBytes.buffer);

					if (typeof cb === 'function')
					{
						cb(null, bytes)
					}

					return bytes
				}
			}
		}

		/*
		 * 判斷放在初始化之後，確保所有嘗試都失敗時，
		 * 快取設為 null 讓後續呼叫不再重複嘗試，並回報明確錯誤。
		 * Checked after initialization so that, once every attempt has
		 * failed, the cache is set to null to prevent retries and a clear
		 * error is reported on later calls.
		 */
		if (!crypto)
		{
			crypto = null;
			throw new Error(`not support crypto`)
		}

		return crypto
	};
})();

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
export function randomBytes(size: number, callback?: (err: Error | null, buf: Buffer) => void): Buffer
{
	return crossCrypto().randomBytes(size, callback)
}

export default crossCrypto
