import { hashSum } from './hash-sum';
import { randomSeedStr } from './random-seed-str';

/**
 * 回傳字串型別的種子 (Seed)，保證呼叫端總能得到字串。
 * Return a seed as a string, guaranteeing callers always receive a string.
 *
 * 空值改用隨機字串種子、非字串改用雜湊 (Hash)、已是字串則原樣保留，
 * 讓不同型別的輸入都有穩定的字串表示。
 *
 * @param seed 種子輸入，可為任意型別 / The seed input, any type
 * @param argv 預留參數，未使用 / Reserved parameter, unused
 * @returns 字串種子 / The string seed
 */
export function hashAny(seed?, ...argv): string
{
	/**
	 * 沒有種子 (Seed) 時才產生隨機字串，維持「有值則沿用、無值才取熵 (Entropy)」的慣例；
	 * 物件等非字串型別無法直接當種子使用，雜湊 (Hash) 可保證同輸入對應同結果。
	 * Only generate a random string when no seed is given; non-string values such as
	 * objects are hashed so the same input always maps to the same result.
	 */
	if (!seed)
	{
		seed = randomSeedStr()
	}
	else if (typeof seed !== 'string')
	{
		seed = hashSum(seed)
	}

	/**
	 * 再次以 String() 收斂，涵蓋數值等殘餘型別的邊界情況。
	 * Call String() once more to cover residual edge cases such as numeric inputs.
	 */
	return String(seed)
}
