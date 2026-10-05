/**
 * array-algorithm 的公開進入點 (Public Entry)
 *
 * 匯出陣列隨機演算法 (Random Algorithm) 的兩組能力：
 * 交換 (Swap) 類演算法，以及數值區間重分布 (Rebase)。
 * 以彙總 (Barrel) 方式統一導出，讓使用者單一 import 即可取得整個工具集。
 *
 * Public entry of array-algorithm.
 *
 * Exposes two groups of array random algorithms — swap-style algorithms
 * and numeric-range rebasing — through a single barrel so consumers can
 * import the whole toolkit from one place.
 */
export * from './swapAlgorithm';
export * from './array_rebase';
