'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hashSum$1 = require('hash-sum');
var nonSecure = require('nanoid/non-secure');
var seedData = require('@lazy-random/seed-data');
var floatToString = require('@lazy-num/float-to-string');
var originalMathRandom = require('@lazy-random/original-math-random');
var sharedLib = require('@lazy-random/shared-lib');
var checkBasic = require('@lazy-assert/check-basic');

function hashSum(input, ...argv) {
  return hashSum$1(input, ...argv);
}

// @ts-ignore
function nanoid(input, ...argv) {
  // @ts-ignore
  return nonSecure.nanoid();
}

let _name;
let _version;
/**
 * give a random string for create seed
 */
function randomSeedStr() {
  var _name2, _version2;
  return [nanoid(), (_name2 = _name) !== null && _name2 !== void 0 ? _name2 : _name = hashSum$1(seedData.name), (_version2 = _version) !== null && _version2 !== void 0 ? _version2 : _version = hashSum$1(seedData.version), Date.now(), floatToString.floatToString(originalMathRandom._MathRandom())].join('_');
}

function hashAny(seed, ...argv) {
  if (!seed) {
    seed = randomSeedStr();
  } else if (typeof seed !== 'string') {
    seed = hashSum(seed);
  }
  return String(seed);
}

function randomSeedNum() {
  return originalMathRandom._MathRandom() * sharedLib.MATH_POW_2_32 + originalMathRandom._MathRandom();
}

function seedToken(seed, opts, ...argv) {
  // TODO: add entropy and stuff
  if (checkBasic.isFiniteInt(seed)) {
    return seed;
  }
  const strSeed = String(seed);
  let s = 0;
  const len = strSeed.length;
  for (let k = 0; k < len; ++k) {
    s ^= strSeed.charCodeAt(k) | 0;
  }
  return s;
}

exports.default = seedToken;
exports.hashAny = hashAny;
exports.hashSum = hashSum;
exports.nanoid = nanoid;
exports.randomSeedNum = randomSeedNum;
exports.randomSeedStr = randomSeedStr;
exports.seedToken = seedToken;
//# sourceMappingURL=index.cjs.development.cjs.map
