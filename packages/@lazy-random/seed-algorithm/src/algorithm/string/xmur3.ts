/**
 * 以 xmur3 演算法將字串折疊成種子狀態 (Seed State)，回傳可持續產生 32 位元無號整數的閉包 (Closure)。
 * Folds a string into a seed state using the xmur3 algorithm and returns a closure producing unsigned 32-bit integers.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
export function df_xmur3(str: string)
{
	/**
	 * 以字串長度作為初始狀態的一半來源，讓長度不同的輸入一開始就分開。
	 * Seeds part of the initial state with the string length so inputs of different lengths start apart.
	 */
	let h = 1779033703 ^ str.length;
	/**
	 * 逐字元以乘法與旋轉位移 (Rotate Shift) 攪拌；`<< 13 | >>> 19` 等同於 32 位元旋轉，避免高位元被直接丟棄。
	 * Mixes each character with multiplication and a 32-bit rotate (`<< 13 | >>> 19`) so high bits are rotated instead of dropped.
	 */
	for (let i = 0; i < str.length; i++)
	{
		h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
		h = h << 13 | h >>> 19;
	}
	/**
	 * finalizer 以兩輪乘法攪拌提高雪崩效應 (Avalanche Effect)，每次呼叫都會推進 `h` 並回傳無號結果。
	 * The finalizer runs two multiplicative mixing rounds for a better avalanche effect; each call advances `h` and returns an unsigned result.
	 */
	return () =>
	{
		h = Math.imul(h ^ h >>> 16, 2246822507);
			h = Math.imul(h ^ h >>> 13, 3266489909);
		return (h ^= h >>> 16) >>> 0;
	}
}

/**
 * `df_xmur3` 的變體 (Variant)：改以 FNV-1a 的 offset basis 起算，並在折疊時混入第二組旋轉常數，提供不同的雜湊分佈。
 * A variant of `df_xmur3` that starts from the FNV-1a offset basis and folds in a second set of rotate constants, giving a different hash distribution.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
export function df_xmur3a(str: string)
{
	/**
	 * `>>> 0` 將初始值固定為 32 位元無號整數，與基準版的有號初始值行為不同。
	 * `>>> 0` pins the initial value as an unsigned 32-bit integer, unlike the signed start of the base version.
	 */
	let h = 2166136261 >>> 0;
	/**
	 * `k` 是每個字元的暫存攪拌值：先做旋轉再乘常數後才 XOR 進主狀態 `h`，
	 * 相當於多一層擴散 (Diffusion)，`k` 需在迴圈外宣告以避免每次迭代重新配置。
	 * `k` is a per-character scratch mix: it is rotated and scaled before being XORed into `h`, adding an extra diffusion layer; it is declared outside the loop to avoid re-allocation each iteration.
	 */
	for (let k, i = 0; i < str.length; i++)
	{
		k = Math.imul(str.charCodeAt(i), 3432918353);
		k = k << 15 | k >>> 17;
		h ^= Math.imul(k, 461845907);
		h = h << 13 | h >>> 19;
		h = Math.imul(h, 5) + 3864292196 | 0;
	}
	/**
	 * 最後才混入字串長度，與起始時的長度資訊相呼應，降低不同長度輸入碰撞的機會。
	 * Folds in the string length at the end to echo the length information used at the start and reduce collisions between inputs of different lengths.
	 */
	h ^= str.length;
	/**
	 * 與 `df_xmur3` 相同的 finalizer，每次呼叫推進狀態並回傳無號整數。
	 * The same finalizer as `df_xmur3`; each call advances the state and returns an unsigned integer.
	 */
	return () =>
	{
		h ^= h >>> 16;
		h = Math.imul(h, 2246822507);
		h ^= h >>> 13;
		h = Math.imul(h, 3266489909);
		h ^= h >>> 16;
		return h >>> 0;
	}
}
