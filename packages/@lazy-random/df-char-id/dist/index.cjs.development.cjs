'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var UString = require('uni-string');
var expect = require('@lazy-random/expect');
var floatToString = require('@lazy-num/float-to-string');
var utilDistributions = require('@lazy-random/util-distributions');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var UString__default = /*#__PURE__*/_interopDefaultLegacy(UString);

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
    char = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  const ls = UString__default["default"].create(char).split('');
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

exports["default"] = dfCharID;
exports.dfCharID = dfCharID;
//# sourceMappingURL=index.cjs.development.cjs.map
