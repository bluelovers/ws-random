/**
 * 加權隨機挑選 (Weighted Random Pick) 相關函式的統一出口
 * Single entry point for weighted random pick factories.
 *
 * - dfItemByWeight：依權重挑一個項目 / pick one item by weight
 * - dfItemByWeightUnique：依權重挑出多個不重複項目 / pick several distinct items by weight
 * - internal/item-by-weight：權重計算的核心與型別 / core weight calculation and types
 */

export * from './internal/item-by-weight'

export { dfItemByWeight } from './item-by-weight'
export { dfItemByWeightUnique } from './item-by-weight-unique'
