'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');
var utilDistributions = require('@lazy-random/util-distributions');
var arrayAlgorithm = require('@lazy-random/array-algorithm');
var dfUniform = require('@lazy-random/df-uniform');
var sharedLib = require('@lazy-random/shared-lib');

/**
 * 正規化並驗證陣列存取的 start/end 區間
 * Normalise and validate the start/end range used for array access.
 *
 * 負值歸零、小數向下取整、end 缺省為陣列長度，最後保證
 * 0 ≤ start < end ≤ arr.length。
 * Clamps negatives to 0, floors decimals, defaults end to the array length,
 * and finally guarantees 0 ≤ start < end ≤ arr.length.
 *
 * @param arr 目標陣列，僅用來取得 length / target array, only its length is read
 * @param start 起始索引（含），預設 0 / inclusive start index, defaults to 0
 * @param end 結束索引（不含），預設為陣列長度 / exclusive end index, defaults to the array length
 * @param disableCheck 跳過區間驗證（例如呼叫端已自行驗證過）/ skip range validation when the caller already checked it
 * @returns 正規化後的 { start, end, len } / the normalised { start, end, len }
 */
function _handleStartEnd(arr, start = 0, end, disableCheck) {
  const len = arr.length;
  const enableCheck = !disableCheck;
  start = Math.max(Math.floor(start), 0);
  if (typeof end !== 'undefined' && end !== null) {
    end = Math.floor(end);
    enableCheck && expect.expect(end).integer.gt(start + 1, `END(${end}) should greater than START(${start}+1)`).gt(0);
  }
  end = Math.min(Math.max(0, end !== null && end !== void 0 ? end : len), len);
  enableCheck && expect.expect(end, `END(${end})`).integer.gte(0).lte(len);
  enableCheck && expect.expect(start, `START(${start})`).integer.gte(0).lt(end);
  return {
    start,
    end,
    len
  };
}

/**
 * 回傳陣列的單一索引值 (Index Number)
 * return index number form array
 *
 * 每次呼叫回傳 [start, end) 內的一個隨機索引，允許重複；
 * 與 dfArrayIndex 的不重複取樣不同。
 * Each call returns one random index in [start, end) and repeats are
 * allowed, unlike the distinct sampling of dfArrayIndex.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 目標陣列
 * @param start 起始索引（含），負值會被歸零，預設 0
 * @param end 結束索引（不含），預設為陣列長度
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個索引
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
 * 回傳陣列的索引清單 (Index List)
 * return index list form array
 *
 * 以工廠 (Factory) 形式回傳取樣函式 (Sampler)；每次呼叫產生一組
 * 不重複的索引，屬於不放回抽樣 (Sampling Without Replacement)。
 * Returns a sampler factory; each call yields a set of distinct indexes,
 * i.e. sampling without replacement.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 目標陣列，需有 length > 0
 * @param size 要取得的索引數，需為正整數 (Positive Integer)，預設 1
 * @param start 起始索引（含），負值會被歸零，預設 0
 * @param end 結束索引（不含），預設為陣列長度
 * @returns 取樣函式，每次呼叫回傳 number[] 索引清單
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

/**
 * 陣列洗牌 (Shuffle) 取樣函式：每次呼叫回傳洗牌後的陣列
 * Array shuffle sampler: each call returns a shuffled array.
 *
 * 預設先複製再洗牌、不動到原陣列；overwrite = true 時原地改寫 (In-Place)。
 * By default the array is cloned first so the input stays untouched;
 * overwrite = true shuffles in place instead.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 一般陣列、型別化陣列 (TypedArray) 或 Buffer
 * @param overwrite 是否原地改寫原陣列，預設 false / overwrite the input in place, defaults to false
 * @returns 取樣函式 (Sampler)，每次呼叫回傳洗牌後的陣列
 */
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

/**
 * 不重複取樣超過 limit 次時的回呼 (Callback) 介面
 * Callback interface invoked when unique sampling exceeds `limit`.
 *
 * @param arr 原始來源陣列 / the original source array
 * @param limit 建立期算出的可取總數 / the total quota computed at build time
 * @param loop 建立期指定的重來設定 / the loop option given at build time
 * @param fn 目前使用的索引亂數函式 / the random-index function in use
 * @returns 回傳新陣列表示換一批資料；true 表示重來；false 表示停止；undefined 表示採用 loop 設定 / return a new array to switch batches, true to restart, false to stop, or undefined to honour the `loop` option
 */

/**
 * 不重複取樣 (Sampling Without Replacement)：每次回傳一個未取過的元素
 * Unique sampling: each call returns an element not drawn before.
 *
 * 以可被 splice 的複製陣列儲存尚未取出的元素，取滿 limit 個後
 * 依 fnOutOfLimit、loop 設定重來或拋出錯誤。
 * Keeps the not-yet-drawn elements in a spliced-down clone; once `limit`
 * elements have been drawn it restarts or throws, depending on
 * fnOutOfLimit and `loop`.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 來源陣列（不會被改寫）/ source array (never mutated)
 * @param limit 可取得的元素總數，預設並上限為陣列長度，需為正整數
 * @param loop 取滿後是否自動重來，預設 false / restart automatically after reaching `limit`, defaults to false
 * @param fnRandIndex 自訂索引亂數函式，預設使用 random / custom random-index function, defaults to one backed by `random`
 * @param fnOutOfLimit 超過 limit 時的回呼 (Callback)
 * @returns 取樣函式 (Sampler)，每次呼叫回傳一個元素
 */
function dfArrayUnique(random, arr, limit, loop, fnRandIndex, fnOutOfLimit) {
  const randIndex = len => {
    return utilDistributions.randIndex(random, len);
  };
  let clone = arr.slice();
  limit = Math.min(limit || clone.length, clone.length);
  fnRandIndex = fnRandIndex || randIndex;
  loop = !!loop;
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

/**
 * 陣列隨機填值 (Array Fill)：以亂數填滿整個陣列
 * Fill an array with random values.
 *
 * 依 min/max/float 決定填入位元組 (Byte)、整數 (Integer) 或浮點數 (Float)；
 * 回傳的函式會逐格覆寫傳入的陣列並回傳它。
 * Chooses byte, integer or float values according to min/max/float; the
 * returned function overwrites the passed array cell by cell and returns it.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param min 數值下界；與 max 皆未指定時改用位元組模式 / lower bound; when both min and max are unset, byte mode is used
 * @param max 數值上界 / upper bound
 * @param float true 產生浮點數、false 產生整數 / produce floats instead of integers
 * @returns 填值函式 (Filler)，接收陣列並回傳同一個陣列
 */
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
