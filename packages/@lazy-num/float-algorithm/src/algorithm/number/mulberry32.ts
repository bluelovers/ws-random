import { MATH_POW_2_32 } from '../../const';

/**
 * mulberry32 演算法：以單一 32 位元整數為狀態的偽亂數產生器 (PRNG)。
 * mulberry32: a PRNG that keeps its state in a single 32-bit integer.
 *
 * @param n 初始狀態 initial state
 * @returns 每次呼叫回傳 [0, 1) 浮點數的抽樣函式 a thunk returning [0, 1) floats
 */
export function df_mulberry32(n: number)
{
	/**
	 * 先以 |= 0 把任意數值收斂為 32 位元整數 (32-bit Integer)，
	 * 讓不同型別的輸入也能得到一致的狀態與可重現 (Reproducible) 序列。
	 *
	 * Coerces any input into a 32-bit integer first so different input types
	 * yield the same state and a reproducible sequence.
	 */
	n |= 0;
	return () =>
	{
		/**
		 * 狀態先加上一個無理數倍率的常數（黃金比例相關）再做位元混和 (Bit Mixing)，
		 * 讓相鄰兩次呼叫的狀態有足夠差異，避免序列出現明顯規律。
		 *
		 * Advances the state by a golden-ratio-derived constant and bit-mixes it,
		 * so consecutive calls differ enough to avoid visible patterns.
		 */
		n += 0x6D2B79F5;
		/**
		 * Math.imul 保證以 32 位元整數運算（自動取 mod 2^32），
		 * 避免 JavaScript 數值運算超出 32 位元後丟失高位元；
		 * >>> 與 ^ 則負責把狀態的高位元擴散到低位元 (Avalanche)。
		 *
		 * Math.imul forces 32-bit arithmetic (mod 2^32) instead of losing the high
		 * bits in regular JS arithmetic; >>> and ^ spread high bits down to low
		 * bits (avalanche effect).
		 */
		let t = Math.imul(n ^ n >>> 15, 1 | n);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		/**
		 * 結果以 >>> 0 轉成無號 32 位元整數 (Unsigned 32-bit) 後除以 2^32，
		 * 使輸出均勻落在 [0, 1) 區間。
		 *
		 * Converts to an unsigned 32-bit value with >>> 0 and divides by 2^32 so
		 * the output falls uniformly in [0, 1).
		 */
		return ((t ^ t >>> 14) >>> 0) / MATH_POW_2_32;
	};
}
