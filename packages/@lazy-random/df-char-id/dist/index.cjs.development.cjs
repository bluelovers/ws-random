'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var UString = require('uni-string');
var sharedLib = require('@lazy-random/shared-lib');
var expect = require('@lazy-random/expect');
var floatToString = require('@lazy-num/float-to-string');
var utilDistributions = require('@lazy-random/util-distributions');

/**
 * 以自訂字元表 (Alphabet) 產生隨機字串 ID
 * Generate a random string ID from a custom alphabet.
 *
 * 建立期會先處理參數多載 (Overload)、驗證 size 與字元表，
 * 取樣期只需不斷抽字元並串接，兼顧安全與效能。
 * The build phase resolves the parameter overloads and validates `size` and
 * the alphabet, so the sampling phase only draws characters and joins them.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param char 字元表：ENUM_ALPHABET、字串、Buffer 或數字；預設 ENUM_ALPHABET.DEFAULT
 * @param size 產生的字元數，需為正整數 (Positive Integer)，預設 8
 * @returns 取樣函式 (Sampler)，每次呼叫回傳長度為 size 的字串
 * @throws 參數不合規時於建立期拋出驗證錯誤 (Validation Error)
 */
function dfCharID(random, char, size) {
  if (typeof char === 'number') {
    if (typeof size === 'number') {
      char = floatToString.floatToString(char);
    } else {
      [size, char] = [char, null];
    }
  }
  size = size || 8;
  expect.expect(size).integer.gt(0);
  if (!char) {
    char = sharedLib.ENUM_ALPHABET.DEFAULT;
  }
  const ls = UString.create(char).split('');
  const len = ls.length;
  expect.expect(ls).lengthOf.gt(1);
  const randIndex = () => {
    return utilDistributions.randIndex(random, len);
  };
  return () => {
    let i = size;
    let list = [];
    while (i--) {
      list.push(ls[randIndex()]);
    }
    return list.join('');
  };
}

exports.default = dfCharID;
exports.dfCharID = dfCharID;
//# sourceMappingURL=index.cjs.development.cjs.map
