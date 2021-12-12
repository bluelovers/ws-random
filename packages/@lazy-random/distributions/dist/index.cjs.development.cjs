'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dfAlgorithm = require('@lazy-random/df-algorithm');
var dfPoisson = require('@lazy-random/df-poisson');
var dfUniform = require('@lazy-random/df-uniform');
var dfCharId = require('@lazy-random/df-char-id');
var dfItemByWeight = require('@lazy-random/df-item-by-weight');
var dfSum = require('@lazy-random/df-sum');
var dfUuid = require('@lazy-random/df-uuid');
var dfArray = require('@lazy-random/df-array');

const Distributions = {
  dfBates: dfAlgorithm.dfBates,
  dfBernoulli: dfAlgorithm.dfBernoulli,
  dfBinomial: dfAlgorithm.dfBinomial,
  dfExponential: dfAlgorithm.dfExponential,
  dfGeometric: dfAlgorithm.dfGeometric,
  dfIrwinHall: dfAlgorithm.dfIrwinHall,
  dfLogNormal: dfAlgorithm.dfLogNormal,
  dfNormal: dfAlgorithm.dfNormal,
  dfPareto: dfAlgorithm.dfPareto,
  dfPoisson: dfPoisson.dfPoisson,
  dfUniformFloat: dfUniform.dfUniformFloat,
  dfUniformInt: dfUniform.dfUniformInt,
  dfUniformBoolean: dfUniform.dfUniformBoolean,
  dfUniformByte: dfUniform.dfUniformByte,
  dfUniformBytes: dfUniform.dfUniformBytes,
  dfArrayIndex: dfArray.dfArrayIndex,
  dfArrayShuffle: dfArray.dfArrayShuffle,
  dfArrayUnique: dfArray.dfArrayUnique,
  dfArrayFill: dfArray.dfArrayFill,
  dfItemByWeight: dfItemByWeight.dfItemByWeight,
  dfItemByWeightUnique: dfItemByWeight.dfItemByWeightUnique,
  dfCharID: dfCharId.dfCharID,
  dfRandSumFloat: dfSum.dfRandSumFloat,
  dfRandSumInt: dfSum.dfRandSumInt,
  dfUuidV4: dfUuid.dfUuidV4
};

Object.defineProperty(exports, 'dfBates', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfBates; }
});
Object.defineProperty(exports, 'dfBernoulli', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfBernoulli; }
});
Object.defineProperty(exports, 'dfBinomial', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfBinomial; }
});
Object.defineProperty(exports, 'dfExponential', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfExponential; }
});
Object.defineProperty(exports, 'dfGeometric', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfGeometric; }
});
Object.defineProperty(exports, 'dfIrwinHall', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfIrwinHall; }
});
Object.defineProperty(exports, 'dfLogNormal', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfLogNormal; }
});
Object.defineProperty(exports, 'dfNormal', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfNormal; }
});
Object.defineProperty(exports, 'dfPareto', {
	enumerable: true,
	get: function () { return dfAlgorithm.dfPareto; }
});
Object.defineProperty(exports, 'dfPoisson', {
	enumerable: true,
	get: function () { return dfPoisson.dfPoisson; }
});
Object.defineProperty(exports, 'dfUniformBoolean', {
	enumerable: true,
	get: function () { return dfUniform.dfUniformBoolean; }
});
Object.defineProperty(exports, 'dfUniformByte', {
	enumerable: true,
	get: function () { return dfUniform.dfUniformByte; }
});
Object.defineProperty(exports, 'dfUniformBytes', {
	enumerable: true,
	get: function () { return dfUniform.dfUniformBytes; }
});
Object.defineProperty(exports, 'dfUniformFloat', {
	enumerable: true,
	get: function () { return dfUniform.dfUniformFloat; }
});
Object.defineProperty(exports, 'dfUniformInt', {
	enumerable: true,
	get: function () { return dfUniform.dfUniformInt; }
});
Object.defineProperty(exports, 'dfCharID', {
	enumerable: true,
	get: function () { return dfCharId.dfCharID; }
});
Object.defineProperty(exports, 'dfItemByWeight', {
	enumerable: true,
	get: function () { return dfItemByWeight.dfItemByWeight; }
});
Object.defineProperty(exports, 'dfItemByWeightUnique', {
	enumerable: true,
	get: function () { return dfItemByWeight.dfItemByWeightUnique; }
});
Object.defineProperty(exports, 'dfRandSumFloat', {
	enumerable: true,
	get: function () { return dfSum.dfRandSumFloat; }
});
Object.defineProperty(exports, 'dfRandSumInt', {
	enumerable: true,
	get: function () { return dfSum.dfRandSumInt; }
});
Object.defineProperty(exports, 'dfUuidV4', {
	enumerable: true,
	get: function () { return dfUuid.dfUuidV4; }
});
Object.defineProperty(exports, 'dfArrayFill', {
	enumerable: true,
	get: function () { return dfArray.dfArrayFill; }
});
Object.defineProperty(exports, 'dfArrayIndex', {
	enumerable: true,
	get: function () { return dfArray.dfArrayIndex; }
});
Object.defineProperty(exports, 'dfArrayShuffle', {
	enumerable: true,
	get: function () { return dfArray.dfArrayShuffle; }
});
Object.defineProperty(exports, 'dfArrayUnique', {
	enumerable: true,
	get: function () { return dfArray.dfArrayUnique; }
});
exports["default"] = Distributions;
//# sourceMappingURL=index.cjs.development.cjs.map
