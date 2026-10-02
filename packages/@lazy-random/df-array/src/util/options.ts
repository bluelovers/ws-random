import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { expect } from '@lazy-random/expect';

/**
 * 正規化並驗證陣列存取的 start/end 區間
 * Normalise and validate the start/end range used for array access.
 *
 * 負值歸零、小數向下取整、end 缺省為陣列長度，最後保證
 * 0 ≤ start < end ≤ arr.length。
 * Clamps negatives to 0, floors decimals, defaults end to the array length,
 * and finally guarantees 0 ≤ start < end ≤ arr.length.
 *
 * @param arr 目標陣列，僅用來取得 length / target array, only its length is read
 * @param start 起始索引（含），預設 0 / inclusive start index, defaults to 0
 * @param end 結束索引（不含），預設為陣列長度 / exclusive end index, defaults to the array length
 * @param disableCheck 跳過區間驗證（例如呼叫端已自行驗證過）/ skip range validation when the caller already checked it
 * @returns 正規化後的 { start, end, len } / the normalised { start, end, len }
 */
export function _handleStartEnd<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, start: number = 0, end?: number, disableCheck?: boolean)
{
	const len = arr.length;

	/*
	 * disableCheck 時關閉驗證：dfArrayIndex 會先自行驗證一次，
	 * 重複檢查只會拖慢建立期。
	 * Validation is off when disableCheck is set: dfArrayIndex already
	 * validated once, and a duplicate check would only slow setup.
	 */
	const enableCheck = !disableCheck;

	/*
	 * 負值代表從尾端起算的相對位置，統一歸零；小數索引向下取整
	 * A negative value would mean offset from the tail, so clamp it to 0; floor fractional indexes.
	 */
	start = Math.max(Math.floor(start), 0);

	/*
	 * 只有明確傳入 end 才需檢查：要求 end > start + 1，
	 * 保證區間至少容納一個候選索引（int 取樣才不會空集合）。
	 * Only an explicitly passed end needs checking: requiring end > start + 1
	 * guarantees at least one candidate index (so int sampling is never empty).
	 */
	if (typeof end !== 'undefined' && end !== null)
	{
		end = Math.floor(end);
		enableCheck && expect(end).integer
			.gt(start + 1, `END(${end}) should greater than START(${start}+1)`)
			.gt(0)
			//.gt(start, `END(${end}) should greater than START(${start})`)
		;
	}

	/*
	 * end 缺省（undefined/null）時取陣列長度，再夾進 [0, len]
	 * When end is missing (undefined/null) fall back to the array length, then clamp it into [0, len].
	 */
	end = Math.min(Math.max(0, end ?? len), len);

	enableCheck && expect(end, `END(${end})`).integer.gte(0).lte(len);
	enableCheck && expect(start, `START(${start})`).integer.gte(0).lt(end);

	return {
		start,
		end,
		len,
	}
}
