import { MATH_POW_2_32 } from '../../const';

/**
 * splitmix32 演算法：以單一 32 位元整數為狀態、經 TestU01 測試的偽亂數產生器 (PRNG)。
 * splitmix32: a PRNG with a single 32-bit state that passes TestU01 tests.
 *
 * @param n 初始狀態 initial state
 * @returns 每次呼叫回傳 [0, 1) 浮點數的抽樣函式 a thunk returning [0, 1) floats
 */
export function df_splitmix32(n: number)
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
		 * 加上 0x9e3779b9（2^32 / 黃金比例取整）推進狀態；
		 * 這個常數能讓每次迭代的狀態散佈均勻，是 splitmix 系列的關鍵設定。
		 *
		 * Advances the state by 0x9e3779b9 (2^23 golden-ratio constant); this
		 * constant keeps states well-spread across iterations and is the key
		 * tuning of the splitmix family.
		 */
		n += 0x9e3779b9;
		/**
		 * 以 XOR-shift 搭配 Math.imul 乘法混和連續做三輪，
		 * 在只有單一狀態的情況下把位元充分擴散 (Avalanche)；
		 * Math.imul 強制 32 位元運算，避免 JS 數值運算的精度問題。
		 *
		 * Applies three rounds of xor-shift mixed with Math.imul multiplication to
		 * diffuse the bits with only one state word; Math.imul forces 32-bit
		 * arithmetic to avoid JS number precision issues.
		 */
		let t = n ^ n >>> 15;
		t = Math.imul(t, 0x85ebca6b);
		t = t ^ t >>> 13;
		t = Math.imul(t, 0xc2b2ae35);
		/**
		 * 以 >>> 0 轉成無號 32 位元整數 (Unsigned 32-bit) 後除以 2^32，
		 * 使輸出均勻落在 [0, 1) 區間。
		 *
		 * Converts to an unsigned 32-bit value with >>> 0 and divides by 2^32 so
		 * the output falls uniformly in [0, 1).
		 */
		return ((t = t ^ t >>> 16) >>> 0) / MATH_POW_2_32;
	};
}
