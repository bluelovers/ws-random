'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');
var utilDistributions = require('@lazy-random/util-distributions');
var arrayAlgorithm = require('@lazy-random/array-algorithm');
var dfUniform = require('@lazy-random/df-uniform');
var sharedLib = require('@lazy-random/shared-lib');

function dfArrayIndex(random, arr, size = 1, start = 0, end) {
  let len = arr.length - 1;
  expect.expect(size).integer.gt(0);
  start = Math.max(Math.floor(start), 0);
  end = Math.max(0, Math.floor(end)) || len;
  expect.expect(end).integer.gt(0).lte(len);
  expect.expect(start).integer.gte(0).lt(end);
  const fn = utilDistributions.int;
  let size_runtime = Math.max(Math.min(end - start, len, size), 0);
  expect.expect(size_runtime).gte(size).gt(0);
  return () => {
    let ids = [];
    let prev;

    LABEL_TOP: do {
      let i = fn(random, start, end);

      if (prev === i || ids.includes(i)) {
        continue LABEL_TOP;
      }

      ids.push(prev = i);
      --size_runtime;
    } while (size_runtime > 0);

    return ids;
  };
}

function dfArrayShuffle(random, arr, overwrite) {
  const randIndex = len => {
    return utilDistributions.randIndex(random, len);
  };

  if (!overwrite) {
    let cloneArrayLike;

    if (Buffer.isBuffer(arr)) {
      cloneArrayLike = arr => {
        return Buffer.from(arr);
      };
    } else {
      cloneArrayLike = arr => {
        return arr.slice();
      };
    }

    return () => {
      return arrayAlgorithm.swapAlgorithm2(cloneArrayLike(arr), true, randIndex);
    };
  }

  return () => {
    return arrayAlgorithm.swapAlgorithm2(arr, true, randIndex);
  };
}
dfArrayShuffle.memoizable = false;

function dfArrayUnique(random, arr, limit, loop, fnRandIndex, fnOutOfLimit) {
  const randIndex = len => {
    return utilDistributions.randIndex(random, len);
  };

  let clone = arr.slice();
  limit = Math.min(limit || clone.length, clone.length);
  fnRandIndex = fnRandIndex || randIndex;
  loop = !!loop;
  expect.expect(limit).integer.gt(0);
  expect.expect(fnRandIndex).function();
  let count = limit;
  let len;

  const _fnClone = function _fnClone(arr) {
    clone = arr.slice();
    count = limit;
    len = clone.length;
  };

  return () => {
    len = clone.length;

    if (len === 0 || count-- === 0) {
      let _loop = loop;

      if (fnOutOfLimit) {
        let ret = fnOutOfLimit(arr, limit, loop, fnRandIndex);

        if (Array.isArray(ret) && ret.length > 0) {
          _fnClone(ret);

          _loop = null;
        } else if (ret == true) {
          _loop = true;
        } else if (typeof ret !== 'undefined') {
          _loop = false;
        }
      }

      if (_loop) {
        _fnClone(arr);
      } else if (_loop !== null) {
        throw new RangeError(`can't call arrayUnique > ${limit} times`);
      }
    }

    let i = fnRandIndex(len);
    return clone.splice(i, 1)[0];
  };
}

function dfArrayFill(random, min, max, float) {
  let fn;
  {
    let min_unset = sharedLib.isUnset(min);
    let max_unset = sharedLib.isUnset(max);

    if (max_unset && min_unset) {
      fn = dfUniform.dfUniformByte(random);
    } else if (float) {
      fn = dfUniform.dfUniformFloat(random, min, max);
    } else {
      fn = dfUniform.dfUniformInt(random, min, max);
    }

    min = void 0;
    max = void 0;
  }
  expect.expect(fn).function();
  return arr => {
    let i = arr.length;

    while (i--) {
      arr[i] = fn();
    }

    return arr;
  };
}

exports.dfArrayFill = dfArrayFill;
exports.dfArrayIndex = dfArrayIndex;
exports.dfArrayShuffle = dfArrayShuffle;
exports.dfArrayUnique = dfArrayUnique;
//# sourceMappingURL=index.cjs.development.cjs.map
