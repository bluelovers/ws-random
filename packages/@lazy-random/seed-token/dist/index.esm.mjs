import hashSum$1 from 'hash-sum';
import { nanoid as nanoid$1 } from 'nanoid/non-secure';
import { name, version } from '@lazy-random/seed-data';
import { floatToString } from '@lazy-num/float-to-string';
import { _MathRandom } from '@lazy-random/original-math-random';
import { MATH_POW_2_32 } from '@lazy-random/shared-lib';
import { isFiniteInt } from '@lazy-assert/check-basic';

function hashSum(input, ...argv) {
  return hashSum$1(input, ...argv);
}

function nanoid(input, ...argv) {
  return nanoid$1();
}

let _name;

let _version;

function randomSeedStr() {
  var _name2, _version2;

  return [nanoid(), (_name2 = _name) !== null && _name2 !== void 0 ? _name2 : _name = hashSum$1(name), (_version2 = _version) !== null && _version2 !== void 0 ? _version2 : _version = hashSum$1(version), Date.now(), floatToString(_MathRandom())].join('_');
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
  return _MathRandom() * MATH_POW_2_32 + _MathRandom();
}

function seedToken(seed, opts, ...argv) {
  if (isFiniteInt(seed)) {
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

export { seedToken as default, hashAny, hashSum, nanoid, randomSeedNum, randomSeedStr, seedToken };
//# sourceMappingURL=index.esm.mjs.map
