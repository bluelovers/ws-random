'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arrayRandIndex = require('@lazy-random/array-rand-index');

function swapAlgorithm(arr, overwrite, fn = arrayRandIndex.arrayRandIndexByLength) {
  let i = arr.length;
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
function swapAlgorithm2(arr, overwrite, fn = arrayRandIndex.arrayRandIndexByLength) {
  let i = arr.length;
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
