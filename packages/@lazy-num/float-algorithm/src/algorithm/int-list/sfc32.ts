import { MATH_POW_2_32 } from '../../const';

/**
 * Yet another chaotic PRNG, the sfc stands for "Small Fast Counter". It is part of the PracRand PRNG test suite. It passes PractRand, as well as Crush/BigCrush (TestU01). Also one of the fastest.
 */
export function df_sfc32(a: number, b: number, c: number, d: number)
{
	return function ()
	{
		/**
		 * 每輪開始先把四個狀態都收斂為 32 位元整數 (32-bit Integer)，
		 * 保证外部傳入的初始值與每輪運算都在同一數值範圍內。
		 *
		 * Coerces all four states into 32-bit integers at the start of each round
		 * so both caller-supplied seeds and per-round math stay in range.
		 */
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		/**
		 * 小型快速計數器 (Small Fast Counter) 的核心：以加法與 XOR 混和狀態，
		 * d 另當作計數器遞增，讓序列不會進入短週期 (Short Cycle)；
		 * | 0 與 + 1 | 0 皆為刻意的 32 位元截斷運算。
		 *
		 * Core of the Small Fast Counter: mixes states with addition and XOR while
		 * d doubles as a counter to avoid short cycles; | 0 and + 1 | 0 are
		 * intentional 32-bit truncations.
		 */
		const t = (a + b | 0) + d | 0;
		d = d + 1 | 0;
		a = b ^ b >>> 9;
		b = c + (c << 3) | 0;
		/**
		 * c 以旋轉 (Rotate) 操作跨過高位元與低位元，
		 * 讓狀態的高位資訊能回流到低位元，提升位元擴散效果。
		 *
		 * Rotates c across the high and low bits so high-bit information flows
		 * back into the low bits, improving bit diffusion.
		 */
		c = c << 21 | c >>> 11;
		c = c + t | 0;
		/**
		 * 以 >>> 0 轉成無號 32 位元整數 (Unsigned 32-bit) 後除以 2^32，
		 * 使輸出均勻落在 [0, 1) 區間。
		 *
		 * Converts to an unsigned 32-bit value with >>> 0 and divides by 2^32 so
		 * the output falls uniformly in [0, 1).
		 */
		return (t >>> 0) / MATH_POW_2_32;
	};
}
