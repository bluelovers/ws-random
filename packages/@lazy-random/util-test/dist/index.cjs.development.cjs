'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var simpleWrap = require('@lazy-random/simple-wrap');
var originalMathRandom = require('@lazy-random/original-math-random');
var rngFactory = require('@lazy-random/rng-factory');
var seedrandom = require('seedrandom');

function newRngMathRandom() {
  return simpleWrap.simpleWrap(originalMathRandom._MathRandom);
}
function newRngSeedRandom() {
  return rngFactory.RNGFactory(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'));
}

Object.defineProperty(exports, 'newRngFactory', {
	enumerable: true,
	get: function () { return rngFactory.RNGFactory; }
});
exports.newRngMathRandom = newRngMathRandom;
exports.newRngSeedRandom = newRngSeedRandom;
//# sourceMappingURL=index.cjs.development.cjs.map
