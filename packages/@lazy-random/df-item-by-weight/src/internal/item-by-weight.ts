import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { dfArrayShuffle } from '@lazy-random/df-array';
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
export function _getWeight(value: number, key: string): number
{
	return value + 0.001
}

/**
 * 自訂權重函式 (Weight Function) 的介面
 * Interface of a custom weight function.
 *
 * @param value 資料的值 / the value to weigh
 * @param key 該筆資料的鍵 / the key of this entry
 * @returns 權重，需 > 0 / the weight, which must be > 0
 */
export interface IGetWeight<T extends unknown, K extends string = string>
{
	(value: T, key: K, ...argv): number
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
export interface IWeight<T extends unknown, K extends string = string>
{
	sum: number,
	//sum2: number,

	//psum: number,
	//psum2: number,

	klist?: number[],
	plist?: number[],
	vlist: IWeightEntrie<T, K>[],

	/**
	 * key weight table
	 */
	kwlist?: Record<K, number>,

	list?: IWeightRawData<T, K>[]

//	list: {
//		[p: number]: IWeightEntrie<T>[]
//		[p: string]: IWeightEntrie<T>[]
//	}
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
export interface IWeightRawData<T extends unknown, K extends string = string>
{
	key: K,
	value: T,
	weight: number,
	percentage: number,
}

/**
 * 取樣結果三元組 (Result Tuple)：`[key, value, percentage]`
 * Sampling result tuple: `[key, value, percentage]`.
 *
 * percentage 為建立期算出的固定占比，不等於累積權重。
 * The percentage is the fixed share computed at build time, not a cumulative weight.
 */
export type IWeightEntrie<T extends unknown, K extends string = string> = [K, T, number]

/**
 * 物件形式的輸入 (Object Input)：鍵為項目識別、值為權重來源
 * Object-shaped input where keys identify items and values feed the weight.
 */
export type IObjectInput<T extends unknown, K extends string = string> = {
	//	[i: number]: T
	[k in K]: T
}

/**
 * 排序相關選項 (Sort Options)
 * Options controlling sorting of the candidate list.
 *
 * @property shuffle 排序後是否再洗牌 (Shuffle) / shuffle after sorting
 * @property disableSort 跳過依 percentage 的升冪排序 / skip the ascending percentage sort
 */
export interface IOptionsItemByWeightSort
{
	shuffle?: boolean,
	disableSort?: boolean,
}

/**
 * dfItemByWeight 系列的完整選項 (Options)
 * Full options for the dfItemByWeight family.
 *
 * @property getWeight 自訂權重函式，預設「值 + 0.001」/ custom weight function, defaults to `value + 0.001`
 * @property shuffle 排序後是否再洗牌 / shuffle after sorting
 * @property disableSort 跳過依 percentage 的升冪排序 / skip the ascending percentage sort
 */
export interface IOptionsItemByWeight<T extends unknown, K extends string = string> extends IOptionsItemByWeightSort
{
	getWeight?: IGetWeight<T, K>,
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
export function _createWeight<T extends unknown, K extends string = string>(arr: ITSArrayListMaybeReadonly<T> | IObjectInput<T, K>,
	options?: IOptionsItemByWeight<T, K>,
): IWeight<T, K>
{
	let sum: number = 0

	/*
	 * 未提供 getWeight 時使用「值 + 0.001」的預設實作
	 * Fall back to the `value + 0.001` default when getWeight is not supplied.
	 */
	const getWeight = options?.getWeight ?? _getWeight;

	/*
	 * 第一遍掃描：逐項取得權重、累加總和，並收集原始資料；
	 * 一併以一元加號 (+weight) 強制轉數字，攔下非數值型別。
	 * First pass: resolve each weight, accumulate the total, and collect the
	 * raw data; the unary `+weight` coerces to a number so non-numeric types
	 * are caught here rather than silently poisoning the sum.
	 */
	let ls2: IWeightRawData<T, K>[] = (Object.entries(arr) as [K, T][])
		.map(function (entrie)
		{
			let [key, value] = entrie

			let weight = getWeight(value as any, key)

			//weight = Math.exp(weight)

			weight = +weight

			//ow(weight, ow.number.gt(0))
			/*
			 * 權重必須為正數，0 或負數會讓累積區間失去意義
			 * A weight must be positive; zero or negative values would break the cumulative ranges.
			 */
			expect(weight).gt(0)

			sum += weight

			return {
				key,
				value,
				weight,
				percentage: 0,
			}
		})
	;

	/*
	 * 第二遍掃描：算出個別 percentage（weight / sum）並建構 vlist；
	 * last 這類累積值交給稍後的 _percentageWeight 統一處理，
	 * 此處只負責三元組與 kwlist 對照表。
	 * Second pass: compute each percentage (weight / sum) and build vlist;
	 * cumulative values are left to _percentageWeight later — this pass only
	 * produces the tuples and the kwlist lookup.
	 */
	let ls = ls2
		.reduce(function (a, entrie)
		{
			entrie.percentage = entrie.weight / sum

			//let k = entrie.percentage

			let item = [entrie.key, entrie.value, entrie.percentage] as IWeightEntrie<T, K>

			if (a.last === 0)
			{
				a.last = entrie.percentage
			}
			else
			{
				a.last += entrie.percentage
			}

			//a.klist.push(a.last)
			//a.plist.push(entrie.percentage)
			a.vlist.push(item)

			a.kwlist[entrie.key] = entrie.weight;

			return a
		}, {
			//klist: [],
			//plist: [],
			vlist: [] as IWeight<T, K>["vlist"],
			kwlist: {} as IWeight<T, K>["kwlist"],
			last: 0,
		})
	;

	/*
	 * 只有一個項目時「加權隨機」毫無意義（必然選中同一項），
	 * 在建立期直接拒絕，避免回傳退化的取樣函式。
	 * A single item makes weighted random pointless (it always wins), so
	 * reject it at build time instead of returning a degenerate sampler.
	 */
	expect(ls.vlist).have.length.gt(1);

	return {
		//source: arr,
		sum,
		//sum2,
		//psum,
		//psum2,
//		list: ls,

		list: ls2,

		//klist: ls.klist,
		//plist: ls.plist,
		kwlist: ls.kwlist,
		vlist: ls.vlist,
	}
}

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
export function _sortWeight<T extends unknown, K extends string = string>(random: IRNGLike,
	ws: IWeight<T, K>,
	options: IOptionsItemByWeightSort = {},
)
{
	/*
	 * disableSort 時保留輸入順序；預設仍會依 percentage 升冪排序
	 * When disableSort is set the input order is kept; otherwise entries are sorted by percentage ascending.
	 */
	if (!options.disableSort)
	{
		ws.vlist = ws.vlist.sort(function (a, b)
		{
			let n = a[2] - b[2]

			return n
		})
	}

	/*
	 * shuffle 在排序之後執行，讓「同權重的相對順序」也隨機化
	 * Shuffling runs after sorting so ties with equal percentages also get a random relative order.
	 */
	if (options.shuffle)
	{
		ws.vlist = dfArrayShuffle(random,ws.vlist, true)();
	}

	return ws
}

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
export function _percentageWeight<T extends unknown, K extends string = string>(random: IRNGLike, ws: IWeight<T, K>)
{
	let psum: number = 0

	ws.plist = []

	/*
	 * 逐項累加成累積權重：首項直接取自身值（psum 為 0 時），
	 * 其餘累加到 psum 上；每次呼叫都會重設 klist 與 plist，
	 * 因此候選清單變動（例如 unique 取樣移除項目）後可安全重算。
	 * Accumulate cumulative weights: the first entry seeds psum directly
	 * (detected by psum === 0) and the rest add onto it. klist and plist are
	 * rebuilt from scratch each call, so the result stays consistent after
	 * candidates are removed (e.g. by unique sampling).
	 */
	ws.klist = ws.vlist
		.reduce(function (a, list)
		{
			let percentage = list[2]

			if (psum === 0)
			{
				psum = percentage
			}
			else
			{
				psum += percentage
			}

			a.push(psum)
			ws.plist.push(percentage)

			return a
		}, [] as number[])
	;

	return ws
}

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
export function _calcWeight<T extends unknown, K extends string = string>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T> | IObjectInput<T, K>,
	options?: IOptionsItemByWeight<T, K>,
): IWeight<T, K>
{
	let ws = _createWeight(arr, options)

	ws = _sortWeight(random, ws, options);

	ws = _percentageWeight(random, ws);

	return ws
}

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
export function _itemByWeightCore(r: number,
	klist: ITSArrayListMaybeReadonly<number>,
): number
{
	let index: number

	/*
	 * 線性掃描累積權重：項目數通常不多，且排序後可提早結束，
	 * 比二分搜尋更簡單也更貼近資料的實際分布。
	 * Linear scan over the cumulative weights: item counts are usually small
	 * and the sort allows an early exit, which is simpler than a binary search
	 * and fits the typical data shape.
	 */
	for (let k = 0; k < klist.length; k++)
	{
		if (r <= klist[k])
		{
			index = k;

			break
		}
	}

	/*
	 * 邊界情況 (Edge Case)：累積權重因浮點誤差略小於 1 時，
	 * 極大的 r 可能掃完整輪仍未命中，此時以最後一項收尾，
	 * 避免回傳 undefined。
	 * Edge case: when floating-point drift leaves the last cumulative weight
	 * slightly below 1, a very large r may match nothing; fall back to the
	 * last entry rather than returning undefined.
	 */
	return index ?? klist.length - 1
}
