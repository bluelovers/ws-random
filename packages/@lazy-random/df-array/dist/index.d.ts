import { IRNGLike } from '@lazy-random/rng-abstract';
import { IRNGLike } from '@lazy-random/rng-abstract-core';
import { IArrayInput02 } from '@lazy-random/shared-lib';
import { ITSArrayLikeWriteable } from 'ts-type/lib/generic';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { TypedArray } from 'typedarray-dts';

/**
 * 回傳陣列的索引清單 (Index List)
 * return index list form array
 *
 * 以工廠 (Factory) 形式回傳取樣函式 (Sampler)；每次呼叫產生一組
 * 不重複的索引，屬於不放回抽樣 (Sampling Without Replacement)。
 * Returns a sampler factory; each call yields a set of distinct indexes,
 * i.e. sampling without replacement.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 目標陣列，需有 length > 0
 * @param size 要取得的索引數，需為正整數 (Positive Integer)，預設 1
 * @param start 起始索引（含），負值會被歸零，預設 0
 * @param end 結束索引（不含），預設為陣列長度
 * @returns 取樣函式，每次呼叫回傳 number[] 索引清單
 */
export declare function dfArrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(random: IRNGLike, arr: T, size?: number, start?: number, end?: number): () => number[];
/**
 * 回傳陣列的單一索引值 (Index Number)
 * return index number form array
 *
 * 每次呼叫回傳 [start, end) 內的一個隨機索引，允許重複；
 * 與 dfArrayIndex 的不重複取樣不同。
 * Each call returns one random index in [start, end) and repeats are
 * allowed, unlike the distinct sampling of dfArrayIndex.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 目標陣列
 * @param start 起始索引（含），負值會被歸零，預設 0
 * @param end 結束索引（不含），預設為陣列長度
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個索引
 */
export declare function dfArrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(random: IRNGLike, arr: T, start?: number, end?: number): () => number;
/**
 * 陣列洗牌 (Shuffle) 取樣函式：每次呼叫回傳洗牌後的陣列
 * Array shuffle sampler: each call returns a shuffled array.
 *
 * 預設先複製再洗牌、不動到原陣列；overwrite = true 時原地改寫 (In-Place)。
 * By default the array is cloned first so the input stays untouched;
 * overwrite = true shuffles in place instead.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 一般陣列、型別化陣列 (TypedArray) 或 Buffer
 * @param overwrite 是否原地改寫原陣列，預設 false / overwrite the input in place, defaults to false
 * @returns 取樣函式 (Sampler)，每次呼叫回傳洗牌後的陣列
 */
export declare function dfArrayShuffle<T extends ITSArrayLikeWriteable<any> | TypedArray | Buffer | ITSArrayListMaybeReadonly<any>>(random: IRNGLike, arr: T, overwrite?: boolean): () => T;
export declare namespace dfArrayShuffle {
	var memoizable: boolean;
}
/**
 * 自訂索引亂數函式 (Random Index Function) 的介面
 * Interface of a custom random-index function.
 *
 * 允許各種簽章：只傳長度、附帶額外參數或完全展開的參數皆可，
 * 只要回傳 [0, len) 內的索引。
 * Accepts any signature — length only, extra arguments, or fully spread —
 * as long as it returns an index within [0, len).
 */
export interface IRandIndex {
	(len: number): number;
	(len: number, ...argv: any[]): number;
	(...argv: any[]): number;
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
export interface IArrayUniqueOutOfLimitCallback<T extends unknown> {
	(arr: ITSArrayListMaybeReadonly<T>, limit: number, loop: boolean, fn: IRandIndex): T[] | boolean | void;
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
export declare function dfArrayUnique<T extends unknown>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T>, limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>): () => T;
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
export declare function dfArrayFill(random: IRNGLike, min?: number, max?: number, float?: boolean): <T extends IArrayInput02<number>>(arr: T) => T;

export {};
