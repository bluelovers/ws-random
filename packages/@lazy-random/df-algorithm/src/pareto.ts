import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 帕累托分佈 (Pareto Distribution)：以反函數法 (Inverse Transform) 取樣
 * Pareto distribution sampled via inverse transform.
 *
 * 常用於描述「少數個體佔有多數資源」的長尾 (Long Tail) 現象，
 * alpha (α) 為形狀參數 (Shape Parameter)、決定尾部厚度。
 * Commonly models long-tail phenomena where a small share of items holds
 * most of the mass; alpha (α) is the shape parameter controlling tail weight.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param alpha 形狀參數，需 > 0，預設 1
 * @returns 取樣函式 (Sampler)，每次呼叫回傳 ≥ 1 的實數
 */
export function dfPareto(random: IRNGLike, alpha: number = 1)
{
	//ow(alpha, ow.number.gt(0))
	/*
	 * TODO: 此處僅驗證 alpha > 0，未像其他分佈一樣先以 .number() 檢查型別；
	 * 疑似漏寫，若傳入非數字可能在 gt() 內才以不同方式失敗。僅記錄、不修改邏輯。
	 * TODO: unlike the other samplers, only alpha > 0 is checked here and the
	 * .number() type guard appears to be missing; a non-number may fail
	 * differently inside gt(). Recorded only, logic left untouched.
	 */
	expect(alpha).gt(0);

	/*
	 * 預先算出 1 / alpha：反函數公式每次呼叫都會用到，
	 * 提早在建立期算成常數可省去重複的除法。
	 * Precompute 1 / alpha: the inverse formula needs it on every call, so
	 * hoisting it into a constant at build time avoids a repeated division.
	 */
	const invAlpha = 1.0 / alpha

	return () =>
	{
		/*
		 * 反函數公式 1 / (1 - U)^(1 / alpha)：U 接近 0 時結果接近 1（下界），
		 * U 接近 1 時分母趨近 0、產生很大的值，形成右偏的長尾。
		 * Inverse formula 1 / (1 - U)^(1 / alpha): U near 0 gives a value near
		 * 1 (the lower bound) while U near 1 drives the denominator towards 0,
		 * producing very large values and the characteristic right-skewed tail.
		 */
		return 1.0 / Math.pow(1.0 - random.next(), invAlpha)
	}
}

