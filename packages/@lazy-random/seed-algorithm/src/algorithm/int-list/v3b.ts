/**
 * 以 4 個 32 位元狀態欄位產生無號整數序列的閉包 (Closure)，預設常數為 xorshift 家族常用的參數。
 * Produces a sequence of unsigned integers from four 32-bit state words using constants common to the xorshift family.
 *
 * @param a 初始狀態（任意 32 位元無號整數）/ initial state (any unsigned 32-bit integer)
 * @param b 第二狀態欄位，省略時採用預設常數 / second state word, defaults when omitted
 * @param c 第三狀態欄位，省略時採用預設常數 / third state word, defaults when omitted
 * @param d 第四狀態欄位，省略時採用預設常數 / fourth state word, defaults when omitted
 * @returns 每次呼叫回傳一個 32 位元無號整數 / a function returning one unsigned 32-bit integer per call
 *
 * @example
 * var seed = 0; // any unsigned 32-bit integer
 * var next = v3b(seed, 2654435769, 1013904242, 3668340011);
 */
export function df_v3b(a: number, b?: number, c?: number, d?: number)
{
	/**
	 * `||=` 只在參數未提供或為 0 時才補預設值，
	 * 這樣既能省略多數參數，也保留「明確傳 0」以外的自訂能力。
	 * `||=` only fills in the default when the argument is missing or 0, so most calls can omit arguments while still allowing custom values.
	 */
	b ||= 2654435769;
	c ||= 1013904242;
	d ||= 3668340011;

	/**
	 * `a0`/`b0`/`c0`/`d0` 保存每輪的基準值，`pos` 則追蹤目前要回傳哪一個欄位：
	 * 一次狀態更新會產生 4 個輸出，`pos` 讓四次呼叫共用同一輪結果。
	 * `a0`..`d0` keep the per-round base values while `pos` tracks which word to emit next: one state update yields four outputs shared across four calls.
	 */
	let out: number, pos = 0, a0 = 0, b0 = b, c0 = c, d0 = d;
	return () =>
	{
		/**
		 * 僅在上一輪的 4 個輸出都用完 (`pos === 0`) 時才推進狀態，
		 * 避免每次呼叫都做完整輪換，也保證輸出順序固定可重現。
		 * Advances the state only after the previous four outputs are exhausted (`pos === 0`), keeping output order deterministic and reproducible.
		 */
		if (pos === 0)
		{
			/**
			 * 四組「加法 + 旋轉 + XOR」構成一輪攪拌 (Mixing)，讓四個欄位互相影響、提高狀態的擴散效果。
			 * Four add-rotate-xor rounds stir the state so all four words influence each other and diffuse better.
			 */
			a += d;
			a = a << 21 | a >>> 11;
			b = (b << 12 | b >>> 20) + c;
			c ^= a;
			d ^= b;
			a += d;
			a = a << 19 | a >>> 13;
			b = (b << 24 | b >>> 8) + c;
			c ^= a;
			d ^= b;
			a += d;
			a = a << 7 | a >>> 25;
			b = (b << 12 | b >>> 20) + c;
			c ^= a;
			d ^= b;
			a += d;
			a = a << 27 | a >>> 5;
			b = (b << 17 | b >>> 15) + c;
			c ^= a;
			d ^= b;

			/**
			 * 把本輪的基準值加回狀態，讓每一輪的起點都不同（`a0++` 即輪次計數器），
			 * 再以 `pos = 4` 標記這一輪還有 4 個輸出待取。
			 * Adds the per-round base back into the state so each round starts differently (`a0++` is the round counter), then sets `pos = 4` to mark four pending outputs.
			 */
			a += a0;
			b += b0;
			c += c0;
			d += d0;
			a0++;
			pos = 4;
		}
		/**
		 * `--pos` 先遞減再比對，使輸出順序固定為 `a → b → c → d`；
		 * 對應不到的值（理論上不會發生）會沿用上一次的 `out`，避免回傳未定義。
		 * `--pos` decrements before comparing so outputs are emitted as `a → b → c → d`; an unmatched value (which should not happen) reuses the previous `out` instead of returning undefined.
		 */
		switch (--pos)
		{
			case 0:
				out = a;
				break;
			case 1:
				out = b;
				break;
			case 2:
				out = c;
				break;
			case 3:
				out = d;
				break;
		}
		/**
		 * `>>> 0` 確保回傳值一律為 32 位元無號整數，即使內部狀態是有號整數也不會出現負數。
		 * `>>> 0` guarantees an unsigned 32-bit result even though the internal state is signed.
		 */
		return out >>> 0;
	};
}
