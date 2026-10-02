import { expect } from '@lazy-random/expect';
import { toFixedNumber } from '@lazy-num/to-fixed-number';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 建立產生 `[min, max)` 區間均勻分佈 (Uniform Distribution) 浮點數的產生器
 * Create a generator yielding uniform float values in the `[min, max)` range
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0, 1)
 * @param min 區間下限（含）；省略 max 時此參數會被視為 max，min 則取 0
 * @param max 區間上限（不含），必須大於 min；預設與 min 一起推導為 [0, 1)
 * @param fractionDigits 小數位數 (Fraction Digits)，須為大於等於 0 的整數
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)
 * @throws 當 min/max 非有限數值、max <= min，或 fractionDigits 不是 >= 0 的整數時拋出錯誤
 */
export function dfUniformFloat(random: IRNGLike, min?: number, max?: number, fractionDigits?: number)
{
	/**
	 * 只給單一參數時視為 max，此時區間為 [0, max)；
	 * 完全省略則回退到 [0, 1)，與 random.next() 的原生範圍一致
	 * With a single argument it is treated as max giving [0, max); omitting both falls
	 * back to [0, 1), matching the native range of random.next()
	 */
	if (max === undefined)
	{
		max = (min === undefined ? 1 : min)
		min = 0;
	}

	expect(min).number.finite;
	expect(max).number.finite.gt(min);

	let fn: () => number;

	/**
	 * 依區間型態選擇實作：[0,1) 可直接回傳 random.next() 免運算；
	 * 以 0 為下限時省去加法；一般區間才需做 (max - min) 縮放再平移
	 * Pick the implementation by range shape: [0,1) returns random.next() with no math;
	 * a zero lower bound skips the addition; only a general range needs scaling by
	 * (max - min) followed by a shift
	 */
	if (min === 0 && max === 1)
	{
		fn = () => random.next()
	}
	else if (min === 0)
	{
		fn = () =>
		{
			return random.next() * max
		}
	}
	else
	{
		fn = () =>
		{
			return random.next() * (max - min) + min
		}
	}

	/**
	 * 指定小數位數時包一層，把每次結果四捨五入 (Round) 到指定精度再回傳
	 * When a fraction digit count is given, wrap the function so every result is
	 * rounded to that precision before being returned
	 */
	if (fractionDigits !== undefined)
	{
		expect(fractionDigits).integer.gte(0);

		return (): number =>
		{
			return toFixedNumber(fn(), fractionDigits)
		}
	}

	return fn
}

export default dfUniformFloat
