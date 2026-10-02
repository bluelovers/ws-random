import { MATH_POW_2_32 } from '../../const';

/**
 * Tyche is based on ChaCha's quarter-round. It's a bit slow but should be good quality. tychei, the inverted version, is 20% faster.
 */
export function df_tychei(a: number, b: number, c: number, d: number)
{
	return () =>
	{
		/**
		 * 每輪開始先把四個狀態都收斂為 32 位元整數 (32-bit Integer)，
		 * 保證外部傳入的初始值與每輪運算都在同一數值範圍內。
		 *
		 * Coerces all four states into 32-bit integers at the start of each round
		 * so both caller-supplied seeds and per-round math stay in range.
		 */
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		/**
		 * 依 Tyche 的反轉 (Inverted) 版本實作：以 XOR 搭配位元旋轉 (Rotate)
		 * 混和狀態、以減法交替推進，四個狀態輪流作為輸出源；
		 * 旋轉的位數（25/7、24/8、20/12、16/16）是原演算法的調校值。
		 *
		 * Implements the inverted Tyche variant: mixes states with XOR and bit
		 * rotations while advancing with subtraction, rotating the output source
		 * among the four words; the rotation counts (25/7, 24/8, 20/12, 16/16)
		 * are the original algorithm's tuning.
		 */
		b = (b << 25 | b >>> 7) ^ c;
		c = c - d | 0;
		d = (d << 24 | d >>> 8) ^ a;
		a = a - b | 0;
		b = (b << 20 | b >>> 12) ^ c;
		c = c - d | 0;
		d = (d << 16 | d >>> 16) ^ a;
		a = a - b | 0;
		/**
		 * 以 >>> 0 轉成無號 32 位元整數 (Unsigned 32-bit) 後除以 2^32，
		 * 使輸出均勻落在 [0, 1) 區間。
		 *
		 * Converts to an unsigned 32-bit value with >>> 0 and divides by 2^32 so
		 * the output falls uniformly in [0, 1).
		 */
		return (a >>> 0) / MATH_POW_2_32;
	};
}

/**
 * Tyche is based on ChaCha's quarter-round. It's a bit slow but should be good quality. tychei, the inverted version, is 20% faster.
 */
export function df_tyche(a: number, b: number, c: number, d: number)
{
	return () =>
	{
		/**
		 * 每輪開始先把四個狀態都收斂為 32 位元整數 (32-bit Integer)，
		 * 保證外部傳入的初始值與每輪運算都在同一數值範圍內。
		 *
		 * Coerces all four states into 32-bit integers at the start of each round
		 * so both caller-supplied seeds and per-round math stay in range.
		 */
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		/**
		 * Tyche 的標準版本：以加法推進狀態、XOR 搭配位元旋轉 (Rotate) 混和資訊；
		 * 兩段相同的混和步驟（先 12 位元、再 8 位元、最後 7 位元旋轉）
		 * 對應原演算法的 quarter-round 結構。
		 *
		 * Standard Tyche: advances with addition and mixes with XOR plus bit
		 * rotations; the two repeated mixing passes (12-, 8- then 7-bit rotates)
		 * mirror the original algorithm's quarter-round structure.
		 */
		a = a + b | 0;
		d = d ^ a;
		d = d << 16 | d >>> 16;
		c = c + d | 0;
		b = b ^ c;
		b = b << 12 | b >>> 20;
		a = a + b | 0;
		d = d ^ a;
		d = d << 8 | d >>> 24;
		c = c + d | 0;
		b = b ^ c;
		b = b << 7 | b >>> 25;
		/**
		 * 以 >>> 0 轉成無號 32 位元整數 (Unsigned 32-bit) 後除以 2^32，
		 * 使輸出均勻落在 [0, 1) 區間。
		 *
		 * Converts to an unsigned 32-bit value with >>> 0 and divides by 2^32 so
		 * the output falls uniformly in [0, 1).
		 */
		return (b >>> 0) / MATH_POW_2_32;
	};
}
