import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 固定總和抽樣函式的共用參數 (Shared Parameters) 基底介面
 * Base interface of shared parameters for fixed-sum sampling functions
 */
export interface ISumNumParameterBase {
	limit?: number;
	fractionDigits?: number;
}
/**
 * 固定總和抽樣函式 (Fixed-sum Sampling Function) 的輸入參數
 * Input parameters for fixed-sum sampling functions
 */
export interface ISumNumParameter extends ISumNumParameterBase {
	random: IRNGLike;
	size: number;
	min?: number;
	max?: number;
	sum?: number;
}
/**
 * 內部使用、可附加快取 (Cache) 的參數型別，目前與 ISumNumParameter 結構相同
 * Parameter type used internally that may carry a cache; currently identical in shape to ISumNumParameter
 */
export interface ISumNumParameterWuthCache extends ISumNumParameter {
}
/**
 * not support unique, but will try make unique if can
 * thx @SeverinPappadeux for int version
 *
 * @see https://stackoverflow.com/questions/53279807/how-to-get-random-number-list-with-fixed-sum-and-size
 */
export declare function coreFnRandSumInt(argv: ISumNumParameterWuthCache): () => number[];
export declare function coreFnRandSumFloat(argv: ISumNumParameterWuthCache): () => number[];
/**
 * 建立產生「總和固定 (Fixed Sum)」浮點數數列的產生器
 * Create a generator that yields float arrays with a fixed sum
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next()
 * @param size 數列長度，必須為大於 1 的整數
 * @param sum 期望總和，未指定且有 min/max 時取 (size - 1) * min + max，否則取 1.0
 * @param min 每個元素的下限 (Minimum)
 * @param max 每個元素的上限 (Maximum)
 * @param fractionDigits 小數位數 (Fraction Digits)，須為大於 0 的整數
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)，每次回傳一組浮點數數列
 */
export declare function dfRandSumFloat(random: IRNGLike, size: number, sum?: number, min?: number, max?: number, fractionDigits?: number): () => number[];
/**
 * 建立產生「總和固定 (Fixed Sum)」整數數列的產生器
 * Create a generator that yields integer arrays with a fixed sum
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next()
 * @param size 數列長度，必須為大於 1 的整數
 * @param sum 期望總和，未指定時取 1+2+...+size
 * @param min 每個元素的下限 (Minimum)
 * @param max 每個元素的上限 (Maximum)
 * @param limit 每次抽樣嘗試的規模，越低越快但越容易失敗
 * @returns 回傳可反覆呼叫的產生器函式 (Generator Function)，每次回傳一組整數數列
 */
export declare function dfRandSumInt(random: IRNGLike, size: number, sum?: number, min?: number, max?: number, limit?: number): () => number[];

export {};
