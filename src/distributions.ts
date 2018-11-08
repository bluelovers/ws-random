/**
 * Created by user on 2018/10/20/020.
 */
import { Random } from './random';

export interface IRandomDistributions<R extends any>
{
	(random: Random): IRandomDistributionsReturn<R>

	(random: Random, ...argv): IRandomDistributionsReturn<R>
}

export interface IRandomDistributionsReturn<R = any>
{
	(): R

	(...argv): R

	(a1, ...argv): R

	(a1, a2, ...argv): R

	(a1, a2, a3, ...argv): R
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

import uniform from './distributions/uniform'
import uniformBoolean from './distributions/uniform-boolean'
import uniformInt from './distributions/uniform-int'

import uniformByte from './distributions/uniform-byte'
import bytes from './distributions/bytes'

import arrayIndex from './distributions/array-index'
import arrayShuffle from './distributions/array-shuffle'

import arrayUnique from './distributions/array-unique'

import charID from './distributions/char-id'

import itemByWeight from './distributions/item-by-weight'

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

	uniformByte,
	bytes,

	arrayIndex,
	arrayShuffle,
	arrayUnique,

	itemByWeight,

	charID,
}

import * as Distributions from './distributions';
export { Distributions }
export default Distributions
Object.freeze(exports)
