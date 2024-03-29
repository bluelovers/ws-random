import { dfBates, dfBernoulli, dfBinomial, dfExponential, dfGeometric, dfIrwinHall, dfLogNormal, dfNormal, dfPareto } from '@lazy-random/df-algorithm';
import { dfPoisson } from '@lazy-random/df-poisson';
import { dfUniformFloat, dfUniformInt, dfUniformBoolean, dfUniformByte, dfUniformBytes } from '@lazy-random/df-uniform';
import { dfCharID } from '@lazy-random/df-char-id';
import { dfItemByWeight, dfItemByWeightUnique } from '@lazy-random/df-item-by-weight';
import { dfRandSumFloat, dfRandSumInt } from '@lazy-random/df-sum';
import { dfUuidV4 } from '@lazy-random/df-uuid';
import { dfArrayIndex, dfArrayIndexOne, dfArrayShuffle, dfArrayUnique, dfArrayFill } from '@lazy-random/df-array';
export { dfBates, dfBernoulli, dfBinomial, dfExponential, dfGeometric, dfIrwinHall, dfLogNormal, dfNormal, dfPareto, dfPoisson, dfUniformFloat, dfUniformInt, dfUniformBoolean, dfUniformByte, dfUniformBytes, dfArrayIndex, dfArrayIndexOne, dfArrayShuffle, dfArrayUnique, dfArrayFill, dfItemByWeight, dfItemByWeightUnique, dfCharID, dfRandSumFloat, dfRandSumInt, dfUuidV4, };
declare const Distributions: {
    readonly dfBates: typeof dfBates;
    readonly dfBernoulli: typeof dfBernoulli;
    readonly dfBinomial: typeof dfBinomial;
    readonly dfExponential: typeof dfExponential;
    readonly dfGeometric: typeof dfGeometric;
    readonly dfIrwinHall: typeof dfIrwinHall;
    readonly dfLogNormal: typeof dfLogNormal;
    readonly dfNormal: typeof dfNormal;
    readonly dfPareto: typeof dfPareto;
    readonly dfPoisson: typeof dfPoisson;
    readonly dfUniformFloat: typeof dfUniformFloat;
    readonly dfUniformInt: typeof dfUniformInt;
    readonly dfUniformBoolean: typeof dfUniformBoolean;
    readonly dfUniformByte: typeof dfUniformByte;
    readonly dfUniformBytes: typeof dfUniformBytes;
    readonly dfArrayIndex: typeof dfArrayIndex;
    readonly dfArrayIndexOne: typeof dfArrayIndexOne;
    readonly dfArrayShuffle: typeof dfArrayShuffle;
    readonly dfArrayUnique: typeof dfArrayUnique;
    readonly dfArrayFill: typeof dfArrayFill;
    readonly dfItemByWeight: typeof dfItemByWeight;
    readonly dfItemByWeightUnique: typeof dfItemByWeightUnique;
    readonly dfCharID: typeof dfCharID;
    readonly dfRandSumFloat: typeof dfRandSumFloat;
    readonly dfRandSumInt: typeof dfRandSumInt;
    readonly dfUuidV4: typeof dfUuidV4;
};
export default Distributions;
