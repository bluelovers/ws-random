import { IRNGLike } from '@lazy-random/rng-abstract'
import { expect } from '@lazy-random/expect';

/**
 * 建立依機率門檻 (Likelihood Threshold) 回傳布林值 (Boolean) 的產生器
 * Create a generator returning booleans based on a likelihood threshold
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0, 1)
 * @param likelihood 機率門檻，須介於 0 與 1 之間（不含端點），預設 0.5
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)；當 random.next() >= likelihood 時回傳 true
 * @throws 當 likelihood 不在 (0, 1) 區間時拋出錯誤
 */
export function dfUniformBoolean(random: IRNGLike, likelihood: number = 0.5)
{
	//ow(likelihood, ow.number.gt(0).lt(1))

	expect(likelihood).number
		.gt(0)
		.lt(1)
	;

	/**
	 * random.next() 於 [0, 1) 均勻分佈，因此回傳 true 的機率為 1 - likelihood；
	 * likelihood 越大則 true 越少見，等同以門檻值控制正負樣本比例
	 * random.next() is uniform on [0, 1), so the probability of true is 1 - likelihood;
	 * a larger likelihood makes true rarer, i.e. the threshold controls the true/false ratio
	 *
	 * TODO: 參數名稱 `likelihood` 通常被理解為「回傳 true 的機率」，
	 * 但現行實作回傳 true 的機率為 1 - likelihood，語意可能相反；
	 * 僅記錄疑似語意問題，不修改既有邏輯
	 * TODO: the parameter name `likelihood` usually means "probability of returning true",
	 * yet the current implementation yields true with probability 1 - likelihood, so the
	 * semantics may be inverted; suspected semantic issue recorded only, logic untouched
	 */
	return () =>
	{
		return (random.next() >= likelihood)
	}
}

export default dfUniformBoolean
