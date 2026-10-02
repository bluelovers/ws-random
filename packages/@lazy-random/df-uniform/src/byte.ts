import { expect } from '@lazy-random/expect';
import { dfUniformInt } from './uniform-int';
import { stringifyByte } from '@lazy-random/shared-lib';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 建立產生 0～255 位元組 (Byte) 的產生器
 * Create a generator yielding bytes in the 0-255 range
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next()
 * @param toStr 為 true 時回傳十六進制字串 (Hex String)，否則回傳數值
 * @returns 依 toStr 回傳 `() => string` 或 `() => number` 的產生器函式 (Generator Function)
 * @throws 當 toStr 有值但不是布林值 (Boolean) 時拋出錯誤
 */
export function dfUniformByte(random: IRNGLike, toStr: true): () => string
export function dfUniformByte(random: IRNGLike, toStr?: false): () => number
export function dfUniformByte(random: IRNGLike, toStr?: boolean): (() => string) | (() => number)
export function dfUniformByte(random: IRNGLike, toStr?: boolean)
{
	/**
	 * 底層直接以 dfUniformInt(0, 255) 抽樣，兩端皆為含端點 (Inclusive)
	 * The floor is simply dfUniformInt(0, 255), which is inclusive on both ends
	 */
	let fn = dfUniformInt(random, 0, 255);

	if (typeof toStr !== 'undefined')
	{
		expect(toStr).boolean();
	}

	/**
	 * 要求字串格式時，把數值經 stringifyByte 轉成兩碼十六進制字串再回傳
	 * When a string form is requested, pass each value through stringifyByte to a
	 * two-digit hex string before returning
	 */
	if (toStr)
	{
		return () => stringifyByte(fn())
	}

	return fn
}

export default dfUniformByte

