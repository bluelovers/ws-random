import { dfUniformByte, dfUniformFloat, dfUniformInt } from '@lazy-random/df-uniform';
import { expect } from '@lazy-random/expect';
import { IArrayInput02 } from '@lazy-random/shared-lib';
import { isUnset } from '@lazy-random/shared-lib';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 陣列隨機填值 (Array Fill)：以亂數填滿整個陣列
 * Fill an array with random values.
 *
 * 依 min/max/float 決定填入位元組 (Byte)、整數 (Integer) 或浮點數 (Float)；
 * 回傳的函式會逐格覆寫傳入的陣列並回傳它。
 * Chooses byte, integer or float values according to min/max/float; the
 * returned function overwrites the passed array cell by cell and returns it.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param min 數值下界；與 max 皆未指定時改用位元組模式 / lower bound; when both min and max are unset, byte mode is used
 * @param max 數值上界 / upper bound
 * @param float true 產生浮點數、false 產生整數 / produce floats instead of integers
 * @returns 填值函式 (Filler)，接收陣列並回傳同一個陣列
 */
export function dfArrayFill(random: IRNGLike, min?: number, max?: number, float?: boolean)
{
	let fn: () => number;

	{
		let min_unset = isUnset(min);
		let max_unset = isUnset(max);

		/*
		 * 三分支決定取樣器：min/max 都未指定時用預設位元組 (0 ～ 255)，
		 * 否則依 float 決定走浮點或整數的均勻分佈。
		 * Three branches pick the sampler: default byte (0-255) when both
		 * bounds are unset, otherwise uniform float or integer per `float`.
		 */
		if (max_unset && min_unset)
		{
			fn = dfUniformByte(random);
		}
		else if (float)
		{
			fn = dfUniformFloat(random, min, max);
		}
		else
		{
			fn = dfUniformInt(random, min, max);
		}

		/*
		 * 參數已在上面決定取樣器，清空後避免閉包多留一份無用參數
		 * The bounds already selected the sampler; clear them so the closure keeps no unused references.
		 */
		min = void 0;
		max = void 0;
	}

	/*
	 * 確保真的選到取樣器，萬一分支都沒命中時在此明確失敗
	 * Guarantee a sampler was chosen so a missed branch fails clearly here.
	 */
	expect(fn).function();

	return <T extends IArrayInput02<number>>(arr: T) =>
	{
		/*
		 * 由尾端填到頭端，while (i--) 的方向與索引遞減一致
		 * Fill from the tail towards the head so the direction matches the `while (i--)` decrement.
		 */
		let i = arr.length;
		while (i--)
		{
			arr[i] = fn();
		}
		return arr
	}
}

export default dfArrayFill
