'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hashSum$1 = require('hash-sum');
var nonSecure = require('nanoid/non-secure');
var seedData = require('@lazy-random/seed-data');
var floatToString = require('@lazy-num/float-to-string');
var originalMathRandom = require('@lazy-random/original-math-random');
var sharedLib = require('@lazy-random/shared-lib');
var checkBasic = require('@lazy-assert/check-basic');

/**
 * 計算任意輸入的雜湊 (Hash) 字串。
 * Compute a hash string for any input.
 *
 * 直接委由 `hash-sum` 處理物件、數值等任意型別，作為種子正規化的共用工具 (Utility)。
 *
 * @param input 待雜湊的任意值 / The value to hash
 * @param argv 傳給底層 `hash-sum` 的額外參數 / Extra arguments forwarded to `hash-sum`
 * @returns 雜湊字串 / The hash string
 */
function hashSum(input, ...argv) {
  return hashSum$1(input, ...argv);
}

// @ts-ignore
/**
 * 產生非安全亂數 (Non-secure Random) 的隨機 ID。
 * Generate a random ID from non-secure randomness.
 *
 * 刻意採用 `nanoid/non-secure`：種子只需可重現與足夠分散，無需密碼學強度 (Cryptographic Strength)，
 * 可避開安全來源 (Secure Source) 的額外開銷。
 *
 * @param input 預留參數，未使用 / Reserved parameter, unused
 * @param argv 預留參數，未使用 / Reserved parameter, unused
 * @returns 隨機 ID 字串 / A random ID string
 */
function nanoid(input, ...argv) {
  // @ts-ignore
  return nonSecure.nanoid();
}

let _name;
let _version;
/**
 * 給一個用來建立種子 (Seed) 的隨機字串，由 `nanoid`、套件名稱與版本的雜湊 (Hash)、
 * 時間戳記 (Timestamp) 與亂數 (Random Number) 以 `_` 組合，兼顧唯一性與可追溯性。
 * give a random string for create seed
 *
 * @returns 組合式隨機種子字串 / A composed random seed string
 */
function randomSeedStr() {
  return [nanoid(), _name !== null && _name !== void 0 ? _name : _name = hashSum$1(seedData.name), _version !== null && _version !== void 0 ? _version : _version = hashSum$1(seedData.version), Date.now(), floatToString.floatToString(originalMathRandom._MathRandom())].join('_');
}

/**
 * 回傳字串型別的種子 (Seed)，保證呼叫端總能得到字串。
 * Return a seed as a string, guaranteeing callers always receive a string.
 *
 * 空值改用隨機字串種子、非字串改用雜湊 (Hash)、已是字串則原樣保留，
 * 讓不同型別的輸入都有穩定的字串表示。
 *
 * @param seed 種子輸入，可為任意型別 / The seed input, any type
 * @param argv 預留參數，未使用 / Reserved parameter, unused
 * @returns 字串種子 / The string seed
 */
function hashAny(seed, ...argv) {
  if (!seed) {
    seed = randomSeedStr();
  } else if (typeof seed !== 'string') {
    seed = hashSum(seed);
  }
  return String(seed);
}

/**
 * 產生數值型別的隨機種子 (Random Seed)。
 * Generate a numeric random seed.
 *
 * 以兩次亂數 (Random Number) 組合，取得超過 32 位元的亂數熵 (Entropy)，
 * 降低不同輸入產生相同種子的碰撞 (Collision) 機率。
 *
 * @returns 隨機數值種子 / A random numeric seed
 */
function randomSeedNum() {
  return originalMathRandom._MathRandom() * sharedLib.MATH_POW_2_32 + originalMathRandom._MathRandom();
}

/**
 * 將任意輸入正規化為數值種子 (Numeric Seed)。
 * Normalize any input into a numeric seed.
 *
 * 若 `seed` 已是有限整數 (Finite Integer) 則直接回傳；否則轉成字串後逐字元計算，
 * 使相同輸入永遠得到相同種子，確保亂數 (Random Number) 序列可重現 (Reproducible)。
 *
 * @param seed 待正規化的種子輸入，任意型別 / The seed input to normalize, any type
 * @param opts 預留的選項參數，目前未使用 / Reserved options, currently unused
 * @param argv 預留的額外參數，目前未使用 / Reserved extra arguments, currently unused
 * @returns 數值種子 / The numeric seed
 */
function seedToken(seed, opts, ...argv) {
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
