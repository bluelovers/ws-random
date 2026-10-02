
import { dfSumFloat as create } from 'random-extra';
export { create }

/**
 * 依數量 (Size)、總和 (Sum)、下界 (Min)、上界 (Max) 產生一組總和相符的浮點數陣列。
 * Create an array of random floats whose length is size and whose total is sum.
 *
 * @param size 陣列長度 array length
 * @param sum 陣列總和；省略或傳入 null 時自動推估 total sum; estimated when omitted or null
 * @param min 元素下界 lower bound of each element
 * @param max 元素上界 upper bound of each element
 * @returns 長度為 size、總和符合 sum 的浮點數陣列 an array of length size summing to sum
 *
 * TODO: 此函式每次呼叫都會執行 create(...)() 重建抽樣函式；
 * 若呼叫端固定參數卻在迴圈中呼叫，效能會明顯低於先用 create 建立 thunk。
 * TODO: every call rebuilds the thunk via create(...)(); looping with fixed
 * parameters is much slower than creating the thunk once via create first.
 */
export function randomSumFloat(size: number, sum?: number, min?: number, max?: number)
{
	/**
	 * dfSumFloat 回傳的是「抽樣函式 (Thunk)」，
	 * 這裡立刻呼叫一次以取得單一批次的陣列結果。
	 *
	 * dfSumFloat returns a thunk; it is invoked immediately here to obtain a
	 * single batch of the array.
	 */
	return create(size, sum, min, max)()
}

export default randomSumFloat
