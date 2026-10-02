'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arrayRandIndex = require('@lazy-random/array-rand-index');

/**
 * 以交換方式打亂陣列順序的洗牌 (Shuffle) 演算法
 * Shuffle an array by swapping elements (Fisher–Yates style)
 *
 * 由陣列尾端往前迭代，每次以 fn 取得一個隨機索引並與目前位置交換；
 * 因此預設行為不會改寫原陣列，除非傳入 overwrite = true。
 * Iterate from the end towards the start, swapping the current position with a random
 * index produced by fn; the original array is left untouched unless overwrite = true.
 *
 * @param arr 要打亂的陣列 / the array to shuffle
 * @param overwrite true 時就地修改 (In-Place) 原陣列，false 時先複製一份 / modify in place when true, otherwise operate on a copy
 * @param fn 產生隨機索引的函式，輸入上界 n、回傳 0 至 n-1 的索引 /
 * function producing a random index; receives the upper bound n and returns an index in 0..n-1
 * @returns 打亂後的陣列；overwrite 為 false 時是原陣列的副本 (Copy) /
 * the shuffled array; a copy of the input when overwrite is false
 */
function swapAlgorithm(arr, overwrite, fn = arrayRandIndex.arrayRandIndexByLength) {
  let i = arr.length;
  // @ts-ignore
  let ret = overwrite ? arr : arr.slice();
  while (i) {
    let idx = fn(i--);
    if (i === idx) continue;
    let cache = ret[i];
    ret[i] = ret[idx];
    ret[idx] = cache;
  }
  return ret;
}
/**
 * swapAlgorithm 的變體 (Variant)：以完整長度取樣並在原地重試，降低元素留在原位的機率
 * A variant of swapAlgorithm that samples with the full length and re-draws in place,
 * reducing the chance that an element stays at its original position
 *
 * 與 swapAlgorithm 的差異：idx 一律以 len 為上界取樣；若 idx 恰等於目前索引 i，
 * 依 i 位於前半段或後半段，改以 fn(len) 或 fn(i) 重新取樣一次。
 * Difference from swapAlgorithm: idx is always sampled with len as the upper bound; when it
 * lands on the current index i, it is re-drawn once with fn(len) or fn(i) depending on the half.
 *
 * @param arr 要打亂的陣列 / the array to shuffle
 * @param overwrite true 時就地修改 (In-Place) 原陣列，false 時先複製一份 / modify in place when true, otherwise operate on a copy
 * @param fn 產生隨機索引的函式，輸入上界 n、回傳 0 至 n-1 的索引 /
 * function producing a random index; receives the upper bound n and returns an index in 0..n-1
 * @returns 打亂後的陣列 / the shuffled array
 */
function swapAlgorithm2(arr, overwrite, fn = arrayRandIndex.arrayRandIndexByLength) {
  let i = arr.length;
  // @ts-ignore
  let ret = overwrite ? arr : arr.slice();
  let len = i;
  let j = Math.ceil(len / 2);
  while (i) {
    let idx = fn(len);
    i--;
    if (idx === i) {
      if (i < j) {
        idx = fn(len);
      } else {
        idx = fn(i);
      }
    }
    if (i === idx) continue;
    let cache = ret[i];
    ret[i] = ret[idx];
    ret[idx] = cache;
  }
  return ret;
}

/**
 * 將數值陣列整体平移回原區間，並可選地檢查平移後的值是否仍落在 [min, max] 內
 * back to original interval
 *
 * 由陣列尾端往前逐一把每個元素加上 n_diff；一旦某個元素超出區間就立即中斷 (Break)，
 * 該元素與其前方的元素不會被寫回。
 * Iterate from the end of the array, adding n_diff to each element; once an element
 * falls outside the range the loop breaks, leaving that element and all preceding ones untouched.
 *
 * @param ret_b 要平移的數值陣列（會被就地修改）/ the numeric array to shift (modified in place)
 * @param n_diff 每個元素要加上的差值 / the delta added to every element
 * @param min 區間下界；與 max 皆非 number 時略過檢查 / lower bound; check skipped when neither bound is a number
 * @param max 區間上界；與 min 皆非 number 時略過檢查 / upper bound; check skipped when neither bound is a number
 * @returns bool 表示是否全部通過（或略過）檢查，b_sum 為已寫回元素的總和 /
 * bool indicates whether every element passed (or skipped) the check, b_sum is the sum of written elements
 */
function array_rebase(ret_b, n_diff, min, max) {
  let b_sum = 0;
  let bool;
  let i = ret_b.length;
  if (typeof min === 'number' || typeof max === 'number') {
    while (i--) {
      let v = ret_b[i];
      let n = v + n_diff;
      if (n >= min && n <= max) {
        bool = true;
        ret_b[i] = n;
        b_sum += n;
      } else {
        bool = false;
        break;
      }
    }
  } else {
    while (i--) {
      let v = ret_b[i];
      let n = v + n_diff;
      ret_b[i] = n;
      b_sum += n;
    }
    bool = true;
  }
  return {
    bool,
    b_sum
  };
}

exports.array_rebase = array_rebase;
exports.swapAlgorithm = swapAlgorithm;
exports.swapAlgorithm2 = swapAlgorithm2;
//# sourceMappingURL=index.cjs.development.cjs.map
