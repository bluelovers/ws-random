/**
 * 以 FNV-1a 風格的雜湊 (Hash) 將字串折疊成初始狀態，回傳可持續產生 32 位元無號整數的閉包 (Closure)。
 * Folds a string into an initial state using an FNV-1a style hash and returns a closure producing unsigned 32-bit integers.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 *
 * @see https://github.com/michaeldzjap/rand-seed/blob/939181cf160e929cac8397f702cced6acb0e95d5/src/Algorithms/Base.ts#L13
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 */
export function df_xfnv1a(str: string)
{
	/**
	 * FNV-1a 的 offset basis，以 `>>> 0` 固定為 32 位元無號整數，避免後續運算跨到雙精度範圍。
	 * The FNV-1a offset basis, coerced to an unsigned 32-bit integer so later math stays in range.
	 */
	let h = 2166136261 >>> 0;

	/**
	 * 逐字元做 XOR 再乘以 FNV prime；`Math.imul` 保證在 32 位元整數域內運算，維持與其他語言實作相同的結果。
	 * XORs each character then multiplies by the FNV prime; `Math.imul` keeps the math in the 32-bit integer domain for cross-language consistency.
	 */
	for (let i = 0; i < str.length; i++)
	{
		h = Math.imul(h ^ str.charCodeAt(i), 16777619);
	}

	/**
	 * 回呼 (Callback) 內以一連串位移與 XOR 進行攪拌 (Mixing)：
	 * 每次呼叫都改變 `h`，因此序列可持續產生且不會自我重複。
	 * The callback stirs the state with shifts and XORs; each call mutates `h`, so the sequence keeps producing new values without repeating itself.
	 */
	return (): number =>
	{
		h += h << 13;
		h ^= h >>> 7;
		h += h << 3;
		h ^= h >>> 17;

		return (h += h << 5) >>> 0;
	};
}

/**
 * `df_xfnv1a` 的變體 (Variant)：改用 `0xdeadbeef` 初始常數與不同的攪拌常數，適合需要另一種雜湊分佈的場合。
 * A variant of `df_xfnv1a` using the `0xdeadbeef` seed constant and different mixing constants, useful for a different hash distribution.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
export function df_xfnv1a_2(str: string)
{
	/**
	 * `0xdeadbeef | 0` 會將初始值轉為 32 位元有號整數，讓後續 `h >>> n` 的位移行為與基準版一致。
	 * `0xdeadbeef | 0` coerces the initial value to a signed 32-bit integer so the `h >>> n` shifts behave like the base version.
	 */
	let h = 0xdeadbeef | 0;
	/**
	 * 每個字元都經過兩次乘法與位移攪拌，比基準版有更強的雪崩效應 (Avalanche Effect)。
	 * Each character goes through two multiply-and-shift rounds for a stronger avalanche effect than the base version.
	 */
	for (let i = 0; i < str.length; i++)
	{
		h = Math.imul(h + str.charCodeAt(i), 2654435761);
		h ^= h >>> 24;
		h = Math.imul(h << 11 | h >>> 21, 2246822519);
	}
	/**
	 * 比基準版多做兩輪 finalizer（xmur3 風格的乘法攪拌），降低相鄰輸出之間的相關性。
	 * Runs two extra finalizer rounds (xmur3-style multiplicative mixing) to reduce correlation between adjacent outputs.
	 */
	return (): number =>
	{
		h += h << 13;
		h ^= h >>> 7;
		h += h << 3;
		h ^= h >>> 17;
		h = h ^ h >>> 15;
		h = Math.imul(h, 2246822507);
		h = h ^ h >>> 13;
		h = Math.imul(h, 3266489917);
		return ((h = Math.imul(h ^ h >>> 16, 1597334677)) >>> 0);
	}
}
