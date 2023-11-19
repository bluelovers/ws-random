'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');
var utilDistributions = require('@lazy-random/util-distributions');
var arrayAlgorithm = require('@lazy-random/array-algorithm');
var dfUniform = require('@lazy-random/df-uniform');
var sharedLib = require('@lazy-random/shared-lib');

function _handleStartEnd(arr, start = 0, end, disableCheck) {
  var _end;
  const len = arr.length;
  const enableCheck = !disableCheck;
  start = Math.max(Math.floor(start), 0);
  if (typeof end !== 'undefined' && end !== null) {
    end = Math.floor(end);
    enableCheck && expect.expect(end).integer.gt(start + 1, `END(${end}) should greater than START(${start}+1)`).gt(0);
  }
  end = Math.min(Math.max(0, (_end = end) !== null && _end !== void 0 ? _end : len), len);
  enableCheck && expect.expect(end, `END(${end})`).integer.gte(0).lte(len);
  enableCheck && expect.expect(start, `START(${start})`).integer.gte(0).lt(end);
  return {
    start,
    end,
    len
  };
}

/**
 * return index number form array
 */
function dfArrayIndexOne(random, arr, start = 0, end) {
  ({
    start,
    end
  } = _handleStartEnd(arr, start, end));
  if (start === end - 1) {
    return () => start;
  }
  return () => {
    return utilDistributions.int(random, start, end);
  };
}

/**
 * return index list form array
 */
function dfArrayIndex(random, arr, size = 1, start = 0, end) {
  expect.expect(size, `size`).integer.gt(0);
  expect.expect(arr.length, `arr.length`).integer.gt(0);
  const fn = dfArrayIndexOne(random, arr, start, end);
  let len;
  ({
    start,
    end,
    len
  } = _handleStartEnd(arr, start, end, true));
  let size_runtime = Math.max(Math.min(end - start, len, size), 0);
  expect.expect(size_runtime, `size_runtime(${size_runtime})`).lte(size).gt(0);
  size = size_runtime;
  return () => {
    /**
     * reset size_runtime
     */
    size_runtime = size;
    let ids = [];
    let prev;
    LABEL_TOP: do {
      let i = fn();
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
      // @ts-ignore
      cloneArrayLike = arr => {
        // @ts-ignore
        return Buffer.from(arr);
      };
    } else {
      cloneArrayLike = arr => {
        // @ts-ignore
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
  //ow(limit, ow.number.integer.gt(0));
  //ow(fnRandIndex, ow.function);
  expect.expect(limit, `limit`).integer.gt(0);
  expect.expect(fnRandIndex, `fnRandIndex`).function();
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
    const i = fnRandIndex(len);
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
exports.dfArrayIndexOne = dfArrayIndexOne;
exports.dfArrayShuffle = dfArrayShuffle;
exports.dfArrayUnique = dfArrayUnique;
//# sourceMappingURL=index.cjs.development.cjs.map
