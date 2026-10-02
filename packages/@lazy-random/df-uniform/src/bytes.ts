import { expect } from '@lazy-random/expect';
import { dfUniformByte } from './byte';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 建立一次產生多個位元組 (Byte) 陣列的產生器
 * Create a generator yielding an array of multiple bytes
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next()
 * @param size 位元組數量，須為大於 0 的整數，預設 1
 * @param toStr 為 true 時回傳十六進制字串 (Hex String) 陣列，否則回傳數值陣列
 * @returns 依 toStr 回傳 `() => string[]` 或 `() => number[]` 的產生器函式 (Generator Function)
 * @throws 當 size 不是大於 0 的整數時拋出錯誤
 */
export function dfUniformBytes(random: IRNGLike, size: number, toStr: true): () => string[]
export function dfUniformBytes(random: IRNGLike, size?: number, toStr?: false): () => number[]
export function dfUniformBytes(random: IRNGLike, size?: number, toStr?: boolean): (() => string[]) | (() => number[])
export function dfUniformBytes(random: IRNGLike, size: number = 1, toStr?: boolean)
{
	expect(size).integer.gt(0);
	const fn = dfUniformByte(random, toStr);

	/**
	 * 由陣列尾端往前填入（while (i--)），確保每次呼叫都回傳滿長度的陣列；
	 * 反向填值只是實作習慣，不影響各位置的機率分佈
	 * Fill the array from the tail backwards (while (i--)) so every call returns a
	 * full-length array; the reverse order is only a coding habit and does not affect
	 * the distribution of any position
	 */
	return () =>
	{
		let i = size;
		let arr = [];
		while (i--)
		{
			arr[i] = fn()
		}
		return arr
	}
}

export default dfUniformBytes
