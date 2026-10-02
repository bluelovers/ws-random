import { df_xfnv1a } from '../algorithm/string/xfnv1a';
import { doubleToIEEE } from '../algorithm/float/int_x_2';
import { _MathRandom } from '@lazy-random/original-math-random';
import { ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 種子輸入的型別 (Type Alias)：可為字串或數字，亦可為其陣列（含唯讀陣列）。
 * Seed input type: a string or number, or an array (including readonly) of them.
 */
export type ISeedInputFromStringOrNumberOrArray = ITSValueOrArrayMaybeReadonly<string | number>;

/**
 * 把任意種子輸入整理成長度為 `size` 的數值陣列，供亂數演算法 (RNG Algorithm) 使用。
 * Normalizes arbitrary seed input into a numeric array of length `size` for an RNG algorithm to consume.
 *
 * @param seedInput 字串、數字或其陣列 / a string, number, or array of them
 * @param size 期望回傳的欄位數 / the number of fields to return
 * @returns 長度為 `size` 的數值陣列 / a numeric array of length `size`
 */
export function seedFromStringOrNumberOrArray<L extends number>(seedInput: ISeedInputFromStringOrNumberOrArray,
	size: L,
): number[] & {
	length: L
}
{
	/**
	 * `exists_zero` 記錄「是否已保留過一個 0」：
	 * 演算法需要避免四個狀態欄位全為 0（會讓某些 PRNG 退化），但又允許保留單一個 0。
	 * `exists_zero` tracks whether one 0 has already been kept: the algorithm must avoid an all-zero state (which degenerates some PRNGs) while still allowing a single 0.
	 */
	let exists_zero = false;
	/**
	 * `s` 暫存一組 IEEE 754 的兩個 32 位元片段，補值時每次取走一個，用完才重新產生以節省熵 (Entropy)。
	 * `s` caches one pair of IEEE 754 halves; each fill consumes one element and a new pair is generated only after both are used, to save entropy.
	 */
	let s: [number, number];

	/**
	 * `[seedInput ?? []].flat()` 同時處理單一值與陣列（含 `undefined`），再以 `slice(0, 4)` 限制最多取 4 個欄位。
	 * `[seedInput ?? []].flat()` accepts a single value or an array (including `undefined`), then `slice(0, 4)` caps it at four fields.
	 */
	const seed = [seedInput ?? []].flat().slice(0, 4);

	/**
	 * 逐欄位把輸入轉成適合當作種子的數值；欄位不足時會在後續的補值分支填入隨機值。
	 * Converts each field into a seed-friendly number; missing fields are filled with random values in the later fallback branch.
	 */
	for (let i = 0; i < size; i++)
	{
		const type = typeof seed[i];

		/**
		 * 字串以 `df_xfnv1a()` 雜湊，並附加 `#sfc32#${i}` 索引後綴：
		 * 讓相同字串出現在不同位置時得到不同結果，降低欄位之間的相關性。
		 * Strings are hashed with `df_xfnv1a()` plus a `#sfc32#${i}` index suffix so the same string at different positions yields different values, reducing correlation between fields.
		 */
		if (type === 'string')
		{
			seed[i] = df_xfnv1a(`${seed[i]}#sfc32#${i}`)();
		}
		/**
		 * 既非字串也非數字（如 `undefined`、`null`、布林值）一律先標記為缺值並設為 `undefined`，
		 * 交由下方的補值邏輯決定要保留 0 還是填隨機值。
		 * Anything that is neither string nor number (e.g. `undefined`, `null`, boolean) is marked as missing and set to `undefined`, deferring to the fallback logic below.
		 *
		 * TODO: 此分支會先把 `exists_zero` 設為 `true`，但該欄位最後會被填入隨機值而非保留 `0`；
		 * 因此後續若真的傳入 `0`，會因為旗標已被占用而被隨機值取代，請確認這是否為預期行為。
		 * This branch sets `exists_zero` to `true` even though the field ends up random rather than a kept `0`, so a later genuine `0` gets replaced; verify whether that is intended.
		 */
		else if (type !== 'number')
		{
			exists_zero = true;
			seed[i] = void 0;
		}
		/**
		 * 數字取絕對值 (Absolute Value)，避免負數種子讓不同輸入對應到同一個狀態。
		 * Numbers take their absolute value so negative seeds do not collide with other states.
		 */
		else
		{
			seed[i] = Math.abs(seed[i] as number);
		}

		/**
		 * 到這裡仍為假值 (Falsy) 的欄位需要補值：
		 * 第一個 `0` 允許保留（只做標記），其餘的 `0` 或缺值則以隨機 32 位元片段取代，
		 * 確保最終陣列不會因為全為 0 而讓亂數序列退化。
		 * Fields still falsy here need a fallback: the first `0` is kept (only marked), while other `0`s and missing values are replaced with a random 32-bit half so an all-zero array cannot degenerate the RNG sequence.
		 */
		if (!seed[i])
		{
			if (seed[i] === 0 && !exists_zero)
			{
				exists_zero = true;
			}
			else
			{
				/**
				 * 每次補值取走一組 IEEE 片段的一半，兩次用完後置為 `undefined` 讓下個缺值重新產生，
				 * 避免每個欄位都消耗一次 `_MathRandom()`。
				 * Each fill consumes one half of an IEEE pair; once both halves are used the cache is cleared so the next missing field regenerates it, avoiding one `_MathRandom()` call per field.
				 */
				s ??= doubleToIEEE(_MathRandom());
				// @ts-ignore
				seed[i] = s.pop();
				if (!s.length)
				{
					s = void 0;
				}
			}
		}
	}

	return seed as any;
}
