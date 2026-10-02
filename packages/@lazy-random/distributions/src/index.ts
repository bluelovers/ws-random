
/**
 * 依分類群組匯入各子套件的分佈 (Distribution) 函式，供後續具名匯出與集合物件共用
 * Import distribution functions from sub-packages by category, shared by the named
 * exports and the aggregate object below
 */
import {
	dfBates,
	dfBernoulli,
	dfBinomial,
	dfExponential,
	dfGeometric,
	dfIrwinHall,
	dfLogNormal,
	dfNormal,
	dfPareto,
} from '@lazy-random/df-algorithm'

import { dfPoisson } from '@lazy-random/df-poisson'

import {
	dfUniformFloat,
	dfUniformInt,
	dfUniformBoolean,
	dfUniformByte,
	dfUniformBytes,
} from '@lazy-random/df-uniform'

import { dfCharID } from '@lazy-random/df-char-id'

import {
	dfItemByWeight,
	dfItemByWeightUnique
} from '@lazy-random/df-item-by-weight'

import {
	dfRandSumFloat,
	dfRandSumInt
} from '@lazy-random/df-sum'

import { dfUuidV4 } from '@lazy-random/df-uuid'

import {
	dfArrayIndex,
	dfArrayIndexOne,
	dfArrayShuffle,
	dfArrayUnique,
	dfArrayFill,
} from '@lazy-random/df-array'

/**
 * 具名匯出 (Named Export)：讓使用端可直接 import 個別函式，便於 tree-shaking 與閱讀
 * Named exports so consumers can import individual functions, aiding tree-shaking and readability
 */
export {
	dfBates,
	dfBernoulli,
	dfBinomial,
	dfExponential,
	dfGeometric,
	dfIrwinHall,
	dfLogNormal,
	dfNormal,
	dfPareto,
	dfPoisson,
	dfUniformFloat,
	dfUniformInt,
	dfUniformBoolean,

	dfUniformByte,
	dfUniformBytes,

	dfArrayIndex,
	dfArrayIndexOne,
	dfArrayShuffle,
	dfArrayUnique,
	dfArrayFill,

	dfItemByWeight,
	dfItemByWeightUnique,

	dfCharID,

	dfRandSumFloat,
	dfRandSumInt,

	dfUuidV4,
}

/**
 * 預設匯出 (Default Export) 的集合物件：以 as const 凍結屬性，讓使用端可用
 * `Distributions.dfPoisson` 這類命名空間 (Namespace) 風格一次取得所有分佈函式
 * Default-exported aggregate object: `as const` freezes the properties so consumers can
 * access every distribution function in a namespace style such as `Distributions.dfPoisson`
 */
const Distributions = {

	dfBates,
	dfBernoulli,
	dfBinomial,
	dfExponential,
	dfGeometric,
	dfIrwinHall,
	dfLogNormal,
	dfNormal,
	dfPareto,
	dfPoisson,
	dfUniformFloat,
	dfUniformInt,
	dfUniformBoolean,

	dfUniformByte,
	dfUniformBytes,

	dfArrayIndex,
	dfArrayIndexOne,
	dfArrayShuffle,
	dfArrayUnique,
	dfArrayFill,

	dfItemByWeight,
	dfItemByWeightUnique,

	dfCharID,

	dfRandSumFloat,
	dfRandSumInt,

	dfUuidV4,

} as const

export default Distributions
