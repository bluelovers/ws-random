/**
 * 把任意回傳 0～1 的亂數 (Random Number) 函式包裝為 lib-r-math.js 的 IRNG 介面 (Interface)，
 * 使自訂的偽亂數發生器 (PRNG) 能取代 R 統計函式內部的亂數來源。
 *
 * Wraps an arbitrary 0~1 random number function into the IRNG interface of
 * lib-r-math.js, so a custom PRNG can act as the entropy source of R
 * statistical functions.
 *
 * @param fn 底層亂數函式，每次呼叫回傳一個 0～1 的亂數 / the underlying function returning one 0~1 random number
 * @returns 含 `unif_rand` 與 `internal_unif_rand` 的 IRNG 物件 / an IRNG object exposing `unif_rand` and `internal_unif_rand`
 */
export declare function fakeLibRMathRng(fn: () => number): IRNG;

export {
	fakeLibRMathRng as default,
};

export {};
