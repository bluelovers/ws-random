import { expect } from '@lazy-random/expect';
import { randIndex as _randIndex } from '@lazy-random/util-distributions';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 自訂索引亂數函式 (Random Index Function) 的介面
 * Interface of a custom random-index function.
 *
 * 允許各種簽章：只傳長度、附帶額外參數或完全展開的參數皆可，
 * 只要回傳 [0, len) 內的索引。
 * Accepts any signature — length only, extra arguments, or fully spread —
 * as long as it returns an index within [0, len).
 */
export interface IRandIndex
{
	(len: number): number
	(len: number, ...argv): number
	(...argv): number
}

/**
 * 不重複取樣超過 limit 次時的回呼 (Callback) 介面
 * Callback interface invoked when unique sampling exceeds `limit`.
 *
 * @param arr 原始來源陣列 / the original source array
 * @param limit 建立期算出的可取總數 / the total quota computed at build time
 * @param loop 建立期指定的重來設定 / the loop option given at build time
 * @param fn 目前使用的索引亂數函式 / the random-index function in use
 * @returns 回傳新陣列表示換一批資料；true 表示重來；false 表示停止；undefined 表示採用 loop 設定 / return a new array to switch batches, true to restart, false to stop, or undefined to honour the `loop` option
 */
export interface IArrayUniqueOutOfLimitCallback<T extends unknown>
{
	(arr: ITSArrayListMaybeReadonly<T>, limit: number, loop: boolean, fn: IRandIndex): T[] | boolean | void
}

/**
 * 不重複取樣 (Sampling Without Replacement)：每次回傳一個未取過的元素
 * Unique sampling: each call returns an element not drawn before.
 *
 * 以可被 splice 的複製陣列儲存尚未取出的元素，取滿 limit 個後
 * 依 fnOutOfLimit、loop 設定重來或拋出錯誤。
 * Keeps the not-yet-drawn elements in a spliced-down clone; once `limit`
 * elements have been drawn it restarts or throws, depending on
 * fnOutOfLimit and `loop`.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 來源陣列（不會被改寫）/ source array (never mutated)
 * @param limit 可取得的元素總數，預設並上限為陣列長度，需為正整數
 * @param loop 取滿後是否自動重來，預設 false / restart automatically after reaching `limit`, defaults to false
 * @param fnRandIndex 自訂索引亂數函式，預設使用 random / custom random-index function, defaults to one backed by `random`
 * @param fnOutOfLimit 超過 limit 時的回呼 (Callback)
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個元素
 */
export function dfArrayUnique<T extends unknown>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T>, limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>)
{
	/*
	 * 把隨機索引的取得包一層，讓呼叫端只需考慮長度
	 * Wrap random index picking so callers only deal with a length.
	 */
	const randIndex = (len: number) =>
	{
		return _randIndex(random, len)
	};

	/*
	 * 先複製一份專供取樣的可變陣列：後續 splice 只動到這份複製品，
	 * 使用者的原始陣列維持不變。
	 * Clone a mutable copy for sampling: the splice below only touches this
	 * copy, leaving the caller's original array intact.
	 */
	let clone = arr.slice();

	/*
	 * limit 缺省時視為全取，但仍不可超過陣列長度
	 * Default limit means "take everything", but it can never exceed the array length.
	 */
	limit = Math.min(limit || clone.length, clone.length);

	fnRandIndex = fnRandIndex || randIndex;
	loop = !!loop;

	//ow(limit, ow.number.integer.gt(0));
	//ow(fnRandIndex, ow.function);

	/*
	 * limit 為 0 或非整數時無法構成取樣；fnRandIndex 必須是函式，
	 * 否則後續每次呼叫都會以更難懂的方式失敗。
	 * A zero or fractional limit cannot drive sampling, and fnRandIndex must
	 * be a function or every later call would fail in a far less obvious way.
	 */
	expect(limit, `limit`).integer.gt(0)
	expect(fnRandIndex, `fnRandIndex`).function()

	let count = limit;
	let len: number;

	/*
	 * 重置狀態：重新複製來源陣列、補回計數並同步長度；
	 * 供耗盡後重來（loop 或 fnOutOfLimit 回傳新陣列）時使用。
	 * Reset state by re-cloning the source, restoring the counter and
	 * syncing the length; used when restarting after exhaustion (via `loop`
	 * or a new array returned by fnOutOfLimit).
	 */
	const _fnClone = function _fnClone(arr: ITSArrayListMaybeReadonly<T>)
	{
		clone = arr.slice();
		count = limit;
		len = clone.length;
	}

	return () =>
	{
		len = clone.length;

		/*
		 * 陣列已空或配額用完（count-- === 0 會在判斷同時遞減）時，
		 * 依 fnOutOfLimit 的回傳值決定重來、換批資料或停止。
		 * When the clone is empty or the quota is spent (count-- === 0 tests
		 * and decrements in one step), decide from fnOutOfLimit's return
		 * value whether to restart, switch batches, or stop.
		 */
		if (len === 0 || count-- === 0)
		{
			let _loop: boolean = loop;

			if (fnOutOfLimit)
			{
				let ret = fnOutOfLimit(arr, limit, loop, fnRandIndex);

				/*
				 * 回傳非空陣列：改以該陣列當作新的取樣池，
				 * 並把 _loop 設為 null 讓下方跳過重來與拋錯的判斷。
				 * Returning a non-empty array switches the sampling pool to
				 * it and sets _loop to null so the restart/throw branch below
				 * is skipped entirely.
				 */
				if (Array.isArray(ret) && ret.length > 0)
				{
					_fnClone(ret);

					_loop = null;
				}
				else if (ret == true)
				{
					/*
					 * 回傳 true：無條件重來
					 * Returning true forces an unconditional restart.
					 */
					_loop = true;
				}
				else if (typeof ret !== 'undefined')
				{
					/*
					 * 回傳 false 或其他值：明確要求停止，不再重來
					 * Returning false (or any other value) explicitly asks to stop restarting.
					 */
					_loop = false
				}
			}

			/*
			 * _loop 為 null 代表已被 fnOutOfLimit 接管、無事可做；
			 * 否則依設定重來或在不允許重來時拋出 RangeError。
			 * _loop === null means fnOutOfLimit already took over; otherwise
			 * restart per the option, or throw RangeError when restarting is
			 * not allowed.
			 */
			if (_loop)
			{
				_fnClone(arr)
			}
			else if (_loop !== null)
			{
				throw new RangeError(`can't call arrayUnique > ${limit} times`)
			}
		}

		const i = fnRandIndex(len);

		/*
		 * 以 splice 取出並移除，確保同一元素不會被回傳第二次
		 * splice removes the element as it is returned, so no element is handed out twice.
		 */
		return clone
			.splice(i, 1)[0]
			;
	}
}

export default dfArrayUnique
