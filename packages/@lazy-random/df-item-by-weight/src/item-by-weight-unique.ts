import {
	IOptionsItemByWeight,
	IWeightEntrie,
	IObjectInput,
	_createWeight,
	_sortWeight,
	_percentageWeight,
	_itemByWeightCore,
	IWeight,
} from './internal/item-by-weight';
import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 加權不重複多選 (Weighted Unique Pick)：依權重挑出 size 個互不相同的項目
 * Pick `size` distinct items at random, each weighted by its share.
 *
 * 建立期算好整體權重與累積表；取樣期每抽一項就把該項移出候選池
 * 並重算累積權重，因此同一輪內不會重複，權重也隨候選池縮小而重新分佈。
 * The build phase computes the overall weights and cumulative table; during
 * sampling each drawn item is removed from the pool and the cumulative
 * weights are recomputed, so a round never repeats an item and probabilities
 * redistribute as the pool shrinks.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 帶權重的陣列或物件 / the weighted array or object
 * @param size 每輪要取出的項目數，需 > 1 且不得超過資料筆數 / items per round, must be > 1 and no more than the number of items
 * @param options 選項，見 IOptionsItemByWeight / options, see IOptionsItemByWeight
 * @returns 取樣函式 (Sampler)，每輪回傳一組不重複的 [key, value, percentage]
 * @throws size 或資料筆數不合規時拋出驗證錯誤 / throws a validation error when `size` or the item count is invalid
 */
export function dfItemByWeightUnique<T extends unknown>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T>,
	size: number,
	options?: IOptionsItemByWeight<T>,
): () => IWeightEntrie<T>[]
export function dfItemByWeightUnique<T extends unknown, K extends string = string>(random: IRNGLike,
	arr: IObjectInput<T, K>,
	size: number,
	options?: IOptionsItemByWeight<T, K>,
): () => IWeightEntrie<T, K>[]
export function dfItemByWeightUnique<T extends unknown, K extends string = string>(random: IRNGLike,
	arr: ITSArrayListMaybeReadonly<T> | IObjectInput<T, K>,
	size: number,
	options?: IOptionsItemByWeight<T, K>,
): () => IWeightEntrie<T, K>[]
{
	let ws = _createWeight(arr, options);

	/*
	 * size 必須是 > 1 的整數、且不得超過候選數：
	 * 兩者不成立時「不重複取出 size 個」根本不可能，在建立期就拒絕。
	 * `size` must be an integer > 1 and no larger than the candidate count;
	 * otherwise "size distinct items" is impossible, so reject eagerly.
	 */
	expect(size).integer.gt(1);
	expect(ws.vlist).have.length.gte(size);

	/*
	 * 與 dfItemByWeight 相同的 排序 → 累積 流程，建立整體權重表
	 * The same sort → accumulate pipeline as dfItemByWeight, building the overall weight table.
	 */
	ws = _percentageWeight(random, _sortWeight(random, ws, options));

	/*
	 * 只保留取樣所需的 klist/vlist，其餘結構可釋放
	 * Keep only klist/vlist for sampling; the rest can be released.
	 */
	const { vlist, klist } = ws;

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

	/*
	 * 預先算好 size - 1，最後一項不需移出候選池
	 * Precompute size - 1 so the last draw never has to remove a candidate.
	 */
	const size_sub_1 = size - 1;

	return () =>
	{
		const result: IWeightEntrie<T, K>[] = [];

		/*
		 * 每輪都複製一份候選池，讓移除動作只影響本輪；
		 * 上層的 vlist/klist 維持完整，下一輪從頭開始。
		 * Clone the pool each round so removals only affect this round; the
		 * outer vlist/klist stay intact and the next round starts fresh.
		 */
		const ws = {
			vlist: vlist.slice(),
			klist: klist.slice(),
		} as IWeight<T, K>;

		/*
		 * 逐項抽出：索引由累積權重決定（權重高者機率大），
		 * 除了最後一項，其餘抽中後立刻移出候選池並重算累積權重，
		 * 使下一抽不會命中已取過的項目。
		 * Draw one at a time: the index comes from the cumulative weights
		 * (heavier items win more often). Every draw but the last removes
		 * the item from the pool and recomputes the cumulative weights so
		 * the next draw cannot hit an item already taken.
		 */
		for (let i = 0; i < size; i++)
		{
			let index = _itemByWeightCore(random.next(), ws.klist)

			result.push(ws.vlist[index])

			/*
			 * 最後一項抽完即結束，不需再移除與重算
			 * The final draw ends the round with no removal or recompute needed.
			 */
			if (i < size_sub_1)
			{
				/*
				 * TODO: 移除項目後，vlist 內的 percentage 並未重新正規化 (Renormalize)，
				 * 累積權重總和會 < 1，多出的機率質量全數落在最後一項（依排序為權重最大者），
				 * 疑似與「其餘候選依剩餘權重重新分佈」的預期不符。僅記錄、不修改邏輯。
				 * TODO: after removing an entry, the percentages in vlist are not
				 * renormalised, so the cumulative weights sum to < 1 and the whole
				 * leftover probability mass lands on the last entry (the heaviest
				 * one after sorting) — possibly at odds with the intent of
				 * redistributing across the remaining candidates. Recorded only,
				 * logic left untouched.
				 */
				ws.vlist.splice(index, 1);
				_percentageWeight(random, ws);
			}
		}

		return result
	}
}

export default dfItemByWeightUnique
