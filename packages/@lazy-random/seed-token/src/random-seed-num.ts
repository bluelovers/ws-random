import { MATH_POW_2_32 } from '@lazy-random/shared-lib';
import { _MathRandom } from '@lazy-random/original-math-random';

/**
 * 產生數值型別的隨機種子 (Random Seed)。
 * Generate a numeric random seed.
 *
 * 以兩次亂數 (Random Number) 組合，取得超過 32 位元的亂數熵 (Entropy)，
 * 降低不同輸入產生相同種子的碰撞 (Collision) 機率。
 *
 * @returns 隨機數值種子 / A random numeric seed
 */
export function randomSeedNum(): number
{
	/**
	 * 第一段亂數 (Random Number) 取高 32 位元、第二段補上小數尾端，
	 * 使結果涵蓋比單次 Math.random() 更寬的範圍。
	 * The first call supplies the high 32 bits and the second fills the fraction,
	 * covering a wider range than a single Math.random() call.
	 */
	return (_MathRandom() * MATH_POW_2_32) + _MathRandom()
}
