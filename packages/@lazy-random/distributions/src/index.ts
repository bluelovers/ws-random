
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

import { itemByWeight, itemByWeightUnique } from '@lazy-random/df-item-by-weight'

import { dfRandSumFloat, dfRandSumInt } from '@lazy-random/df-sum'

import { dfUuidV4 } from '@lazy-random/df-uuid'

import {
	arrayFill,
	arrayIndex,
	arrayShuffle,
	arrayUnique,
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

	arrayIndex,
	arrayShuffle,
	arrayUnique,

	itemByWeight,
	itemByWeightUnique,

	dfCharID,

	dfRandSumFloat,
	dfRandSumInt,

	dfUuidV4,

	arrayFill,
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

	arrayIndex,
	arrayShuffle,
	arrayUnique,

	itemByWeight,
	itemByWeightUnique,

	dfCharID,

	dfRandSumFloat,
	dfRandSumInt,

	dfUuidV4,

	arrayFill,
}

export default Distributions
