/**
 * Created by user on 2018/10/20/020.
 */
import { Random } from './random';
export interface IRandomDistributionsFn<R = any> extends Function {
    (random: Random): R;
    (random: Random, ...argv: any[]): R;
}
export interface IRandomDistributionsCacheRow<F extends IRandomDistributionsFn = IRandomDistributionsFn> {
    key: string;
    distribution: IRandomDistributions<F>;
}
export interface IRandomDistributions<F extends IRandomDistributionsFn = IRandomDistributionsFn> {
    (...argv: Parameters<F>): ReturnType<F>;
    (random: Random, ...argv: any[]): ReturnType<F>;
}
import bates from './distributions/bates';
import bernoulli from './distributions/bernoulli';
import binomial from './distributions/binomial';
import exponential from './distributions/exponential';
import geometric from './distributions/geometric';
import irwinHall from './distributions/irwin-hall';
import logNormal from './distributions/log-normal';
import normal from './distributions/normal';
import pareto from './distributions/pareto';
import poisson from './distributions/poisson';
import uniform from './distributions/uniform';
import uniformBoolean from './distributions/uniform-boolean';
import uniformInt from './distributions/uniform-int';
import uniformByte from './distributions/uniform-byte';
import bytes from './distributions/bytes';
import arrayIndex from './distributions/array-index';
import arrayShuffle from './distributions/array-shuffle';
import arrayUnique from './distributions/array-unique';
import charID from './distributions/char-id';
import itemByWeight from './distributions/item-by-weight';
import sumFloat from './distributions/sum-float';
import sumInt from './distributions/sum-int';
export { bates, bernoulli, binomial, exponential, geometric, irwinHall, logNormal, normal, pareto, poisson, uniform, uniformBoolean, uniformInt, uniformByte, bytes, arrayIndex, arrayShuffle, arrayUnique, itemByWeight, charID, sumFloat, sumInt, };
import * as Distributions from './distributions';
export { Distributions };
export default Distributions;
