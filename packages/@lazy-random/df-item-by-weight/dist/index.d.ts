import { IRNGLike } from '@lazy-random/rng-abstract';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 預設權重函式 (Default Weight Function)：以「值 + 0.001」作為權重
 * Default weight: uses `value + 0.001` as the weight.
 *
 * 加 0.001 有兩個目的：讓數值 0 的項目仍保有非零機率，
 * 並保證權重必 > 0、可通過建立期的 gt(0) 驗證。
 * The 0.001 offset both keeps a zero-valued item selectable with non-zero
 * probability and guarantees the weight is > 0 for the build-time gt(0)
 * validation.
 *
 * @param value 資料的值；陣列輸入時即元素本身 / the value, which is the element itself for array input
 * @param key 該筆資料的鍵 / the key of this entry
 * @returns 權重值 / the resulting weight
 */
export declare function _getWeight(value: number, key: string): number;
/**
 * 自訂權重函式 (Weight Function) 的介面
 * Interface of a custom weight function.
 *
 * @param value 資料的值 / the value to weigh
 * @param key 該筆資料的鍵 / the key of this entry
 * @returns 權重，需 > 0 / the weight, which must be > 0
 */
export interface IGetWeight<T extends unknown, K extends string = string> {
	(value: T, key: K, ...argv: any[]): number;
}
/**
 * 權重計算後的內部資料結構 (Internal Weight Structure)
 * Internal structure produced by the weight calculation.
 *
 * @property sum 權重總和 / total of all weights
 * @property klist 累積權重 (Cumulative Weight) 陣列，供取樣時線性比對 / cumulative weights array for linear lookup while sampling
 * @property plist 每項個別的 percentage / individual percentage of each entry
 * @property vlist `[key, value, percentage]` 三元組清單 / list of `[key, value, percentage]` tuples
 * @property kwlist key 到原始權重的對照表 / lookup from key to the original weight
 * @property list 含權重的原始資料 / raw data including weights
 */
export interface IWeight<T extends unknown, K extends string = string> {
	sum: number;
	klist?: number[];
	plist?: number[];
	vlist: IWeightEntrie<T, K>[];
	/**
	 * key weight table
	 */
	kwlist?: Record<K, number>;
	list?: IWeightRawData<T, K>[];
}
/**
 * 權重原始資料 (Raw Weight Data)：單一項目計算後的中間結果
 * Intermediate result for one item after its weight has been resolved.
 *
 * @property key 該筆資料的鍵 / the key of this entry
 * @property value 該筆資料的值 / the value of this entry
 * @property weight 經 getWeight 計算後的權重 / weight produced by getWeight
 * @property percentage weight / sum 的占比 / the weight divided by the total
 */
export interface IWeightRawData<T extends unknown, K extends string = string> {
	key: K;
	value: T;
	weight: number;
	percentage: number;
}
/**
 * 取樣結果三元組 (Result Tuple)：`[key, value, percentage]`
 * Sampling result tuple: `[key, value, percentage]`.
 *
 * percentage 為建立期算出的固定占比，不等於累積權重。
 * The percentage is the fixed share computed at build time, not a cumulative weight.
 */
export type IWeightEntrie<T extends unknown, K extends string = string> = [
	K,
	T,
	number
];
/**
 * 物件形式的輸入 (Object Input)：鍵為項目識別、值為權重來源
 * Object-shaped input where keys identify items and values feed the weight.
 */
export type IObjectInput<T extends unknown, K extends string = string> = {
	[k in K]: T;
};
/**
 * 排序相關選項 (Sort Options)
 * Options controlling sorting of the candidate list.
 *
 * @property shuffle 排序後是否再洗牌 (Shuffle) / shuffle after sorting
 * @property disableSort 跳過依 percentage 的升冪排序 / skip the ascending percentage sort
 */
export interface IOptionsItemByWeightSort {
	shuffle?: boolean;
	disableSort?: boolean;
}
/**
 * dfItemByWeight 系列的完整選項 (Options)
 * Full options for the dfItemByWeight family.
 *
 * @property getWeight 自訂權重函式，預設「值 + 0.001」/ custom weight function, defaults to `value + 0.001`
 * @property shuffle 排序後是否再洗牌 / shuffle after sorting
 * @property disableSort 跳過依 percentage 的升冪排序 / skip the ascending percentage sort
 */
export interface IOptionsItemByWeight<T extends unknown, K extends string = string> extends IOptionsItemByWeightSort {
	getWeight?: IGetWeight<T, K>;
}
/**
 * 建立權重資料 (Create Weight Data)：把輸入轉成內部權重結構
 * Convert the input into the internal weight structure.
 *
 * 不論陣列或物件輸入都以 `Object.entries` 展開，逐項計算權重與總和，
 * 最後整理成 vlist 與 kwlist；本階段不使用亂數，結果是確定的。
 * Both array and object inputs are expanded via `Object.entries`, with each
 * item's weight and the total accumulated here; no randomness is used, so
 * the outcome is deterministic.
 *
 * @param arr 帶權重的陣列或物件 / the weighted array or object
 * @param options 選項，含 getWeight / options including getWeight
 * @returns 權重總和、原始清單、對照表與三元組清單 / the sum, raw list, lookup table and tuple list
 * @throws 任一權重 ≤ 0 或項目數 ≤ 1 時拋出驗證錯誤 / throws a validation error when any weight ≤ 0 or there are ≤ 1 items
 */
export declare function _createWeight<T extends unknown, K extends string = string>(arr: ITSArrayListMaybeReadonly<T> | IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>): IWeight<T, K>;
/**
 * 排序／洗牌權重清單 (Sort / Shuffle Weight List)
 *
 * 依 percentage 升冪排序候選清單，選配地再以洗牌打亂順序。
 * 排序不影響機率分布，只影響 _itemByWeightCore 的線性掃描順序。
 * Sorts candidates by percentage ascending, optionally shuffling afterwards.
 * Sorting does not change the probability distribution, only the scan order
 * used by _itemByWeightCore.
 *
 * @param random 亂數來源，僅 shuffle 時使用 / RNG, only used when shuffling
 * @param ws 待處理的權重結構（原地更新 vlist）/ the weight structure, whose vlist is updated in place
 * @param options 排序選項 / sort options
 * @returns 同一個 ws / the same `ws` instance
 */
export declare function _sortWeight<T extends unknown, K extends string = string>(random: IRNGLike, ws: IWeight<T, K>, options?: IOptionsItemByWeightSort): IWeight<T, K>;
/**
 * 計算累積權重 (Cumulative Weight)：產出取樣用的 klist
 * Compute the cumulative weights that sampling will scan through.
 *
 * klist[i] 為前 i+1 項 percentage 的總和，最後一項應逼近 1；
 * percentage 直接取自 vlist 三元組的第 3 欄，因此候選清單變動後
 * 可安全重算；plist 另存一份逐項 percentage 的副本。
 * klist[i] is the sum of the first i+1 percentages and the last entry
 * approaches 1; percentages are read from the third field of each vlist
 * tuple, so recomputation stays correct after the candidate list changes,
 * and plist keeps a copy of the individual percentages.
 *
 * @param random 保留的亂數來源參數，本函式未使用 / reserved RNG parameter, unused here
 * @param ws 待處理的權重結構（原地更新 klist/plist）/ the weight structure, whose klist/plist are updated in place
 * @returns 同一個 ws / the same `ws` instance
 */
export declare function _percentageWeight<T extends unknown, K extends string = string>(random: IRNGLike, ws: IWeight<T, K>): IWeight<T, K>;
/**
 * 一氣呵成完成權重計算 (Calculate Weights)：建立 → 排序 → 累積
 * Complete the whole weight pipeline: create, sort, then accumulate.
 *
 * 這是 dfItemByWeight（可重複取樣、無需移除項目）使用的正規流程；
 * dfItemByWeightUnique 則在取樣期反覆呼叫 _percentageWeight 重算。
 * This is the normal pipeline for dfItemByWeight (repeatable sampling with
 * no removals), whereas dfItemByWeightUnique reruns _percentageWeight on
 * each draw.
 *
 * @param random 亂數來源，供排序與洗牌使用 / RNG used for sorting and shuffling
 * @param arr 帶權重的陣列或物件 / the weighted array or object
 * @param options 選項 / options
 * @returns 可直接取樣的權重結構 / a weight structure ready for sampling
 */
export declare function _calcWeight<T extends unknown, K extends string = string>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T> | IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>): IWeight<T, K>;
/**
 * 加權取樣核心 (Weighted Sampling Core)：依亂數值挑出候選索引
 * Pick a candidate index from a random draw against cumulative weights.
 *
 * 以 r 與累積權重逐一比對，第一個滿足 r ≤ klist[k] 者即為結果；
 * 因為 klist 是累積的，各項目被選中的區間長度恰好等於其 percentage。
 * Compares the draw r against each cumulative weight and takes the first k
 * with r ≤ klist[k]; because klist is cumulative, each item's winning
 * interval is exactly its percentage.
 *
 * @param r [0, 1) 的亂數值 / a random value within [0, 1)
 * @param klist 累積權重陣列 / the cumulative weight array
 * @returns 命中的索引；未命中時回退到最後一項 / the matched index, falling back to the last entry when nothing matched
 */
export declare function _itemByWeightCore(r: number, klist: ITSArrayListMaybeReadonly<number>): number;
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
export declare function dfItemByWeight<T extends unknown>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T>, options?: IOptionsItemByWeight<T>): () => IWeightEntrie<T>;
export declare function dfItemByWeight<T extends unknown, K extends string = string>(random: IRNGLike, arr: IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>): () => IWeightEntrie<T, K>;
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
export declare function dfItemByWeightUnique<T extends unknown>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T>, size: number, options?: IOptionsItemByWeight<T>): () => IWeightEntrie<T>[];
export declare function dfItemByWeightUnique<T extends unknown, K extends string = string>(random: IRNGLike, arr: IObjectInput<T, K>, size: number, options?: IOptionsItemByWeight<T, K>): () => IWeightEntrie<T, K>[];

export {};
