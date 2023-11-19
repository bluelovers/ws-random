
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
