/**
 * mulberry32 演算法：以單一 32 位元整數為狀態的偽亂數產生器 (PRNG)。
 * mulberry32: a PRNG that keeps its state in a single 32-bit integer.
 *
 * @param n 初始狀態 initial state
 * @returns 每次呼叫回傳 [0, 1) 浮點數的抽樣函式 a thunk returning [0, 1) floats
 */
export declare function df_mulberry32(n: number): () => number;
/**
 * splitmix32 演算法：以單一 32 位元整數為狀態、經 TestU01 測試的偽亂數產生器 (PRNG)。
 * splitmix32: a PRNG with a single 32-bit state that passes TestU01 tests.
 *
 * @param n 初始狀態 initial state
 * @returns 每次呼叫回傳 [0, 1) 浮點數的抽樣函式 a thunk returning [0, 1) floats
 */
export declare function df_splitmix32(n: number): () => number;
/**
 * Yet another chaotic PRNG, the sfc stands for "Small Fast Counter". It is part of the PracRand PRNG test suite. It passes PractRand, as well as Crush/BigCrush (TestU01). Also one of the fastest.
 */
export declare function df_sfc32(a: number, b: number, c: number, d: number): () => number;
/**
 * Tyche is based on ChaCha's quarter-round. It's a bit slow but should be good quality. tychei, the inverted version, is 20% faster.
 */
export declare function df_tychei(a: number, b: number, c: number, d: number): () => number;
/**
 * Tyche is based on ChaCha's quarter-round. It's a bit slow but should be good quality. tychei, the inverted version, is 20% faster.
 */
export declare function df_tyche(a: number, b: number, c: number, d: number): () => number;

export {};
