import { dfBates, dfBernoulli, dfBinomial, dfExponential, dfGeometric, dfIrwinHall, dfLogNormal, dfNormal, dfPareto } from '@lazy-random/df-algorithm';
import { dfArrayFill, dfArrayIndex, dfArrayIndexOne, dfArrayShuffle, dfArrayUnique } from '@lazy-random/df-array';
import { dfCharID } from '@lazy-random/df-char-id';
import { dfItemByWeight, dfItemByWeightUnique } from '@lazy-random/df-item-by-weight';
import { dfPoisson } from '@lazy-random/df-poisson';
import { dfRandSumFloat, dfRandSumInt } from '@lazy-random/df-sum';
import { dfUniformBoolean, dfUniformByte, dfUniformBytes, dfUniformFloat, dfUniformInt } from '@lazy-random/df-uniform';
import { dfUuidV4 } from '@lazy-random/df-uuid';

/**
 * 預設匯出 (Default Export) 的集合物件：以 as const 凍結屬性，讓使用端可用
 * `Distributions.dfPoisson` 這類命名空間 (Namespace) 風格一次取得所有分佈函式
 * Default-exported aggregate object: `as const` freezes the properties so consumers can
 * access every distribution function in a namespace style such as `Distributions.dfPoisson`
 */
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

export {
	Distributions as default,
	dfArrayFill,
	dfArrayIndex,
	dfArrayIndexOne,
	dfArrayShuffle,
	dfArrayUnique,
	dfBates,
	dfBernoulli,
	dfBinomial,
	dfCharID,
	dfExponential,
	dfGeometric,
	dfIrwinHall,
	dfItemByWeight,
	dfItemByWeightUnique,
	dfLogNormal,
	dfNormal,
	dfPareto,
	dfPoisson,
	dfRandSumFloat,
	dfRandSumInt,
	dfUniformBoolean,
	dfUniformByte,
	dfUniformBytes,
	dfUniformFloat,
	dfUniformInt,
	dfUuidV4,
};

export {};
