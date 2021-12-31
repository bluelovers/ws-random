'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');
var toFixedNumber = require('@lazy-num/to-fixed-number');
var sharedLib = require('@lazy-random/shared-lib');

function dfUniformFloat(random, min, max, fractionDigits) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }

  expect.expect(min).number.finite;
  expect.expect(max).number.finite.gt(min);
  let fn;

  if (min === 0 && max === 1) {
    fn = () => random.next();
  } else if (min === 0) {
    fn = () => {
      return random.next() * max;
    };
  } else {
    fn = () => {
      return random.next() * (max - min) + min;
    };
  }

  if (fractionDigits !== undefined) {
    expect.expect(fractionDigits).integer.gte(0);
    return () => {
      return toFixedNumber.toFixedNumber(fn(), fractionDigits);
    };
  }

  return fn;
}

function dfUniformInt(random, min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }

  expect.expect(min).integer();
  expect.expect(max).integer.gt(min);
  let fn = dfUniformFloat(random, min, max + 1);
  return () => {
    return Math.floor(fn());
  };
}

function dfUniformBoolean(random, likelihood = 0.5) {
  expect.expect(likelihood).number.gt(0).lt(1);
  return () => {
    return random.next() >= likelihood;
  };
}

function dfUniformByte(random, toStr) {
  let fn = dfUniformInt(random, 0, 255);

  if (typeof toStr !== 'undefined') {
    expect.expect(toStr).boolean();
  }

  if (toStr) {
    return () => sharedLib.stringifyByte(fn());
  }

  return fn;
}

function dfUniformBytes(random, size = 1, toStr) {
  expect.expect(size).integer.gt(0);
  const fn = dfUniformByte(random, toStr);
  return () => {
    let i = size;
    let arr = [];

    while (i--) {
      arr[i] = fn();
    }

    return arr;
  };
}

exports.dfUniformBoolean = dfUniformBoolean;
exports.dfUniformByte = dfUniformByte;
exports.dfUniformBytes = dfUniformBytes;
exports.dfUniformFloat = dfUniformFloat;
exports.dfUniformInt = dfUniformInt;
//# sourceMappingURL=index.cjs.development.cjs.map
