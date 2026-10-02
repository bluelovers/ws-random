/**
 * 陣列 (Array) 取樣函式的統一出口
 * Single entry point for all array sampling factories.
 *
 * 每個 `dfArray*` 函式皆為工廠 (Factory)：接收亂數來源與選項，
 * 回傳可反覆呼叫的取樣函式 (Sampler)。
 * Each `dfArray*` function is a factory that takes an RNG plus options and
 * returns a sampler callable any number of times.
 */

export { dfArrayIndex } from './array-index'
export { dfArrayIndexOne } from './array-index-one'
export { dfArrayShuffle } from './array-shuffle'

export { dfArrayUnique } from './array-unique'
export { dfArrayFill } from './array-fill'

