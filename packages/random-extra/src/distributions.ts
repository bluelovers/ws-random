/**
 * Created by user on 2018/10/20/020.
 */
import { Random } from './random';

export interface IRandomDistributionsFn<R = any> extends Function
{
	(random: Random): R
	(random: Random, ...argv): R
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

import bates from './distributions/bates'

import bernoulli from './distributions/bernoulli'
import binomial from './distributions/binomial'
import exponential from './distributions/exponential'
import geometric from './distributions/geometric'

import irwinHall from './distributions/irwin-hall'
import logNormal from './distributions/log-normal'

import normal from './distributions/normal'
import pareto from './distributions/pareto'

import poisson from './distributions/poisson'

import {
	uniformFloat as uniform,
	uniformInt,
	uniformBoolean,
	uniformByte as byte,
	uniformBytes as bytes,
} from '@lazy-random/df-uniform'

import charID from './distributions/char-id'

import { itemByWeight, itemByWeightUnique } from '@lazy-random/df-item-by-weight'

import sumFloat from './distributions/sum-float'
import sumInt from './distributions/sum-int'

import uuidv4 from './distributions/uuidv4'

import {
	arrayFill,
	arrayIndex,
	arrayShuffle,
	arrayUnique,
} from '@lazy-random/df-array'

export {
	bates,
	bernoulli,
	binomial,
	exponential,
	geometric,
	irwinHall,
	logNormal,
	normal,
	pareto,
	poisson,
	uniform,
	uniformBoolean,
	uniformInt,

	byte,
	bytes,

	arrayIndex,
	arrayShuffle,
	arrayUnique,

	itemByWeight,
	itemByWeightUnique,

	charID,

	sumFloat,
	sumInt,

	uuidv4,

	arrayFill,
}

export default exports as typeof import('./distributions')
