/**
 * Created by user on 2018/10/20/020.
 */
import { Random } from './random';

export interface IRandomDistributionsFn<R = any> extends Function
{
	(random: Random): R
	(random: Random, ...argv: any[]): R
}

export interface IRandomDistributionsCacheRow<F extends IRandomDistributionsFn = IRandomDistributionsFn>
{
	key: string,
	distribution: IRandomDistributions<F>,
}

export interface IRandomDistributions<F extends IRandomDistributionsFn = IRandomDistributionsFn>
{
	(...argv: Parameters<F>): ReturnType<F>
	(random: Random, ...argv): ReturnType<F>
}

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

export default exports as typeof import('./distributions')
