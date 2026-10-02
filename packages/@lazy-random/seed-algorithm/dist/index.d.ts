import { ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 以 FNV-1a 風格的雜湊 (Hash) 將字串折疊成初始狀態，回傳可持續產生 32 位元無號整數的閉包 (Closure)。
 * Folds a string into an initial state using an FNV-1a style hash and returns a closure producing unsigned 32-bit integers.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 *
 * @see https://github.com/michaeldzjap/rand-seed/blob/939181cf160e929cac8397f702cced6acb0e95d5/src/Algorithms/Base.ts#L13
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 */
export declare function df_xfnv1a(str: string): () => number;
/**
 * `df_xfnv1a` 的變體 (Variant)：改用 `0xdeadbeef` 初始常數與不同的攪拌常數，適合需要另一種雜湊分佈的場合。
 * A variant of `df_xfnv1a` using the `0xdeadbeef` seed constant and different mixing constants, useful for a different hash distribution.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
export declare function df_xfnv1a_2(str: string): () => number;
/**
 * 以 xmur3 演算法將字串折疊成種子狀態 (Seed State)，回傳可持續產生 32 位元無號整數的閉包 (Closure)。
 * Folds a string into a seed state using the xmur3 algorithm and returns a closure producing unsigned 32-bit integers.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
export declare function df_xmur3(str: string): () => number;
/**
 * `df_xmur3` 的變體 (Variant)：改以 FNV-1a 的 offset basis 起算，並在折疊時混入第二組旋轉常數，提供不同的雜湊分佈。
 * A variant of `df_xmur3` that starts from the FNV-1a offset basis and folds in a second set of rotate constants, giving a different hash distribution.
 *
 * @param str 要雜湊的字串 / the string to hash
 * @returns 每次呼叫推進狀態並回傳下一個亂數的函式 / a function that advances the state and returns the next number
 */
export declare function df_xmur3a(str: string): () => number;
/**
 * 將 64 位元倍精度浮點數 (Double) 拆成兩個 32 位元整數，以便把浮點種子以整數形式參與運算。
 * Splits a 64-bit double into two 32-bit integers so a floating-point seed can be used in integer math.
 *
 * @param floatNumber 要拆解的浮點數 / the float to split
 * @returns `[low, high]` 兩個 32 位元整數 / two 32-bit integers, low then high
 *
 * @example
 * doubleToIEEE(0.732821894576773)
 */
export declare function doubleToIEEE(floatNumber: number): [
	number,
	number
];
/**
 * 以 4 個 32 位元狀態欄位產生無號整數序列的閉包 (Closure)，預設常數為 xorshift 家族常用的參數。
 * Produces a sequence of unsigned integers from four 32-bit state words using constants common to the xorshift family.
 *
 * @param a 初始狀態（任意 32 位元無號整數）/ initial state (any unsigned 32-bit integer)
 * @param b 第二狀態欄位，省略時採用預設常數 / second state word, defaults when omitted
 * @param c 第三狀態欄位，省略時採用預設常數 / third state word, defaults when omitted
 * @param d 第四狀態欄位，省略時採用預設常數 / fourth state word, defaults when omitted
 * @returns 每次呼叫回傳一個 32 位元無號整數 / a function returning one unsigned 32-bit integer per call
 *
 * @example
 * var seed = 0; // any unsigned 32-bit integer
 * var next = v3b(seed, 2654435769, 1013904242, 3668340011);
 */
export declare function df_v3b(a: number, b?: number, c?: number, d?: number): () => number;
/**
 * 種子輸入的型別 (Type Alias)：可為字串或數字，亦可為其陣列（含唯讀陣列）。
 * Seed input type: a string or number, or an array (including readonly) of them.
 */
export type ISeedInputFromStringOrNumberOrArray = ITSValueOrArrayMaybeReadonly<string | number>;
/**
 * 把任意種子輸入整理成長度為 `size` 的數值陣列，供亂數演算法 (RNG Algorithm) 使用。
 * Normalizes arbitrary seed input into a numeric array of length `size` for an RNG algorithm to consume.
 *
 * @param seedInput 字串、數字或其陣列 / a string, number, or array of them
 * @param size 期望回傳的欄位數 / the number of fields to return
 * @returns 長度為 `size` 的數值陣列 / a numeric array of length `size`
 */
export declare function seedFromStringOrNumberOrArray<L extends number>(seedInput: ISeedInputFromStringOrNumberOrArray, size: L): number[] & {
	length: L;
};

export {};
