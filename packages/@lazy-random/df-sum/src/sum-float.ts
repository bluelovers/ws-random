import { coreFnRandSumFloat } from './internal/sum-num';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 建立產生「總和固定 (Fixed Sum)」浮點數數列的產生器
 * Create a generator that yields float arrays with a fixed sum
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next()
 * @param size 數列長度，必須為大於 1 的整數
 * @param sum 期望總和，未指定且有 min/max 時取 (size - 1) * min + max，否則取 1.0
 * @param min 每個元素的下限 (Minimum)
 * @param max 每個元素的上限 (Maximum)
 * @param fractionDigits 小數位數 (Fraction Digits)，須為大於 0 的整數
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)，每次回傳一組浮點數數列
 */
export function dfRandSumFloat(random: IRNGLike, size: number, sum?: number, min?: number, max?: number, fractionDigits?: number)
{
	return coreFnRandSumFloat({
		random,
		size,
		sum,
		min,
		max,
		fractionDigits,
	})
}

export default dfRandSumFloat
