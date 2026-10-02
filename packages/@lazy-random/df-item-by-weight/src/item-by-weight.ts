import {
	IObjectInput,
	IWeightEntrie,
	IOptionsItemByWeight,
	_itemByWeightCore,
	_calcWeight,
} from './internal/item-by-weight';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 加權單選 (Weighted Single Pick)：依權重隨機挑一個項目
 * Pick one item at random, weighted by its share.
 *
 * 建立期把權重算成累積表並釋放原始參照，取樣期只需一次亂數
 * 與線性掃描，不重複驗證也不複製資料。
 * The build phase resolves the weights into a cumulative table and drops
 * the original references; each sample then costs one random draw and a
 * linear scan, with no revalidation or copying.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 帶權重的陣列或物件 / the weighted array or object
 * @param options 選項，見 IOptionsItemByWeight / options, see IOptionsItemByWeight
 * @returns 取樣函式 (Sampler)，每次呼叫回傳 [key, value, percentage]
 * @throws 項目數 ≤ 1 或權重不合規時拋出驗證錯誤 / throws a validation error when there are ≤ 1 items or a weight is invalid
 */
export function dfItemByWeight<T extends unknown>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T>,
	options?: IOptionsItemByWeight<T>,
): () => IWeightEntrie<T>
export function dfItemByWeight<T extends unknown, K extends string = string>(random: IRNGLike,
	arr: IObjectInput<T, K>,
	options?: IOptionsItemByWeight<T, K>,
): () => IWeightEntrie<T, K>
export function dfItemByWeight<T extends unknown>(random: IRNGLike,
	arr: ITSArrayListMaybeReadonly<T> | IObjectInput<T>,
	options?: IOptionsItemByWeight<T>,
)
{
	/*
	let ws = _createWeight(arr, options)

	ws = _sortWeight(random, ws, options);

	ws = _percentageWeight(random, ws);
	 */

	/*
	 * 一氣呵成完成 建立 → 排序 → 累積 三個步驟
	 * Run create → sort → accumulate in one go.
	 */
	let ws = _calcWeight(random, arr, options);

	/*
	 * 只保留取樣所需的 klist/vlist，其餘結構可釋放
	 * Keep only klist/vlist for sampling; the rest can be released.
	 */
	const { vlist, klist } = ws;

	//console.dir(ws)

	/*
	 * 把用不到的參照清空：閉包只捕獲 vlist 與 klist，
	 * 讓上游的 arr、options 與整個 ws 不會被長生命週期的取樣函式拖住。
	 * Clear unused references: the closure only captures vlist and klist, so
	 * the upstream arr, options and whole ws are not kept alive by the
	 * long-lived sampler.
	 */
	ws = void 0;
	arr = void 0;
	options = void 0;

	return () =>
	{
		/*
		 * 每次呼叫只取一個 [0, 1) 亂數值，交給核心函式在累積權重表中
		 * 找出對應索引，再以索引取回三元組。
		 * Each call draws a single [0, 1) value, lets the core function find
		 * the matching index in the cumulative table, and maps it back to the
		 * tuple.
		 */
		return vlist[_itemByWeightCore(random.next(), klist)]
	}
}

export default dfItemByWeight
