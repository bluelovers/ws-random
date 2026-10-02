import { coreFnRandSumInt } from './internal/sum-num';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 建立產生「總和固定 (Fixed Sum)」整數數列的產生器
 * Create a generator that yields integer arrays with a fixed sum
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next()
 * @param size 數列長度，必須為大於 1 的整數
 * @param sum 期望總和，未指定時取 1+2+...+size
 * @param min 每個元素的下限 (Minimum)
 * @param max 每個元素的上限 (Maximum)
 * @param limit 每次抽樣嘗試的規模，越低越快但越容易失敗
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)，每次回傳一組整數數列
 */
export function dfRandSumInt(random: IRNGLike, size: number, sum?: number, min?: number, max?: number, limit?: number)
{
	return coreFnRandSumInt({
		random,
		size,
		sum,
		min,
		max,
		limit,
	})
}

export default dfRandSumInt

