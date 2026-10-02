import { expect } from '@lazy-random/expect';
import { dfUniformFloat } from './uniform';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 建立產生 `[min, max]` 區間（含端點）均勻分佈 (Uniform Distribution) 整數的產生器
 * Create a generator yielding uniform integers in the inclusive `[min, max]` range
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0, 1)
 * @param min 區間下限（含），須為整數；省略 max 時此參數會被視為 max，min 則取 0
 * @param max 區間上限（含），須為整數且大於 min
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)，每次回傳一個整數
 * @throws 當 min/max 不是整數或 max <= min 時拋出錯誤
 */
export function dfUniformInt(random: IRNGLike, min?: number, max?: number)
{
	/**
	 * 只給單一參數時視為 max，此時區間為 [0, max]；與 dfUniformFloat 的參數慣例一致
	 * With a single argument it is treated as max giving [0, max], matching the argument
	 * convention of dfUniformFloat
	 */
	if (max === undefined)
	{
		max = (min === undefined ? 1 : min)
		min = 0
	}

	expect(min).integer();
	expect(max).integer.gt(min);

	//ow(min, ow.number.integer)
	//ow(max, ow.number.integer.gt(min))

	/**
	 * 底層改用浮點版抽樣於 [min, max + 1)，再以 Math.floor 取整，
	 * 使 max 經無條件捨去後仍可能被取到，達到含端點的效果
	 * Sample from the float version over [min, max + 1) and truncate with Math.floor so
	 * that max is still reachable after flooring, giving an inclusive upper bound
	 */
	let fn = dfUniformFloat(random, min, max + 1);

	return () =>
	{
		return Math.floor(fn())
	}
}

export default dfUniformInt
