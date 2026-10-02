
/**
 * 將數值陣列整体平移回原區間，並可選地檢查平移後的值是否仍落在 [min, max] 內
 * back to original interval
 *
 * 由陣列尾端往前逐一把每個元素加上 n_diff；一旦某個元素超出區間就立即中斷 (Break)，
 * 該元素與其前方的元素不會被寫回。
 * Iterate from the end of the array, adding n_diff to each element; once an element
 * falls outside the range the loop breaks, leaving that element and all preceding ones untouched.
 *
 * @param ret_b 要平移的數值陣列（會被就地修改）/ the numeric array to shift (modified in place)
 * @param n_diff 每個元素要加上的差值 / the delta added to every element
 * @param min 區間下界；與 max 皆非 number 時略過檢查 / lower bound; check skipped when neither bound is a number
 * @param max 區間上界；與 min 皆非 number 時略過檢查 / upper bound; check skipped when neither bound is a number
 * @returns bool 表示是否全部通過（或略過）檢查，b_sum 為已寫回元素的總和 /
 * bool indicates whether every element passed (or skipped) the check, b_sum is the sum of written elements
 */
export function array_rebase(ret_b: number[], n_diff: number, min: number, max: number)
{
	let b_sum = 0;

	let bool: boolean;

	let i = ret_b.length;

	/**
	 * 只有在呼叫者真的傳入數值界限時才檢查區間，
	 * 讓同一支函式也能單純做「整體平移」而不做邊界限制。
	 * Only enforce the range check when the caller actually supplied numeric bounds,
	 * so the same function can be used for a plain shift without bounds.
	 */
	if (typeof min === 'number' || typeof max === 'number')
	{
		/**
		 * 尾端往前迭代：先檢查較大的索引，超界時中斷即可讓「已寫回」的部分
		 * 維持在區間內，避免把超界的值留在陣列中。
		 * Iterate backwards so that, on abort, everything already written stays in range
		 * and no out-of-range value is left in the array.
		 */
		while (i--)
		{
			let v = ret_b[i];
			let n = v + n_diff;

			/**
			 * 超出界限就停止：不寫回也不累加，保留原值並回報 false。
			 * Stop when out of bounds: skip both the write and the accumulation,
			 * keep the original value and report false.
			 */
			if (n >= min && n <= max)
			{
				bool = true;
				ret_b[i] = n;

				b_sum += n
			}
			else
			{
				bool = false;
				break;
			}
		}
	}
	else
	{
		/**
		 * 未提供界限：無條件平移，全部寫回成功，因此固定回報 true。
		 * No bounds supplied: shift unconditionally, everything is written, so always report true.
		 */
		while (i--)
		{
			let v = ret_b[i];
			let n = v + n_diff;

			ret_b[i] = n;

			b_sum += n
		}

		bool = true;
	}

	/**
	 * TODO: 當 ret_b 為空陣列且有數值界限時，上方迴圈不會執行，
	 * bool 會保持 undefined 而非 true；此處僅記錄疑似邊界情況，未修改原有邏輯。
	 * TODO: when ret_b is empty and numeric bounds are given, the loop never runs and
	 * bool stays undefined instead of true; recorded only, original logic left unchanged.
	 */
	return {
		bool,
		b_sum,
	};
}
