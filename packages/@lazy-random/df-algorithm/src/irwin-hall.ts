import { fixZero } from 'num-is-zero';
import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * Irwin–Hall 分佈：回傳 n 個均勻分佈樣本的總和
 * Irwin–Hall distribution: returns the sum of n uniform samples.
 *
 * 總和範圍為 [0, n)，是 Bates 分佈 (Bates Distribution) 的基礎；
 * n = 0 時固定回傳 0。
 * The sum ranges over [0, n) and underpins the Bates distribution;
 * when n = 0 the sampler always returns 0.
 *
 * https://zh.wikipedia.org/wiki/%E6%AD%90%E6%96%87%E2%80%93%E8%B3%80%E7%88%BE%E5%88%86%E4%BD%88
 * https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
export function dfIrwinHall(random: IRNGLike, n: number = 1)
{
	/*
	 * 允許 n = 0（不同於 Bates 要求正整數），故用 gte(0) 驗證；
	 * fixZero 把可能的 -0 歸一成 0，避免後續迴圈跑出非預期結果。
	 * n = 0 is allowed here (unlike Bates, which requires a positive integer),
	 * hence gte(0); fixZero normalises a possible -0 to 0 so the loop below
	 * cannot behave unexpectedly.
	 */
	expect(n).integer.gte(0)
	n = fixZero(n)

	/*
	 * n = 0 沒有任何樣本可加，直接回傳常數 0 的取樣函式，
	 * 省下每次呼叫都判斷 n 的開銷。
	 * With no samples to add, return a constant-0 sampler right away so the
	 * hot path never has to re-check n on each call.
	 */
	if (n === 0)
	{
		return () => 0
	}

	return (): number =>
	{
		let i = n
		let sum = 0

		/*
		 * while (i--) 先判斷再遞減，恰好執行 n 次；
		 * 逐一累加亂數值即得總和。
		 * `while (i--)` tests before decrementing for exactly n iterations;
		 * accumulating each draw yields the sum.
		 */
		while (i--)
		{
			sum += random.next()
		}

		return sum
	}
}

