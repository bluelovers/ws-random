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
import { dfBates, dfBernoulli, dfBinomial, dfExponential, dfGeometric, dfIrwinHall, dfLogNormal, dfNormal, dfPareto } from '@lazy-random/df-algorithm';
import { dfPoisson } from '@lazy-random/df-poisson';
import { dfUniformFloat, dfUniformInt, dfUniformBoolean, dfUniformByte, dfUniformBytes } from '@lazy-random/df-uniform';
import charID from './distributions/char-id';
import { itemByWeight, itemByWeightUnique } from '@lazy-random/df-item-by-weight';
import sumFloat from './distributions/sum-float';
import sumInt from './distributions/sum-int';
import uuidv4 from './distributions/uuidv4';
import { arrayFill, arrayIndex, arrayShuffle, arrayUnique } from '@lazy-random/df-array';
export { dfBates, dfBernoulli, dfBinomial, dfExponential, dfGeometric, dfIrwinHall, dfLogNormal, dfNormal, dfPareto, dfPoisson, dfUniformFloat, dfUniformInt, dfUniformBoolean, dfUniformByte, dfUniformBytes, arrayIndex, arrayShuffle, arrayUnique, itemByWeight, itemByWeightUnique, charID, sumFloat, sumInt, uuidv4, arrayFill, };
declare const _default: typeof import("./distributions");
export default _default;
