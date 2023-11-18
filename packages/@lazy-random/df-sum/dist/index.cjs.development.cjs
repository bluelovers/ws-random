'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arrayHyperUnique = require('array-hyper-unique');
var libRMath_js = require('lib-r-math.js');
var numIsZero = require('num-is-zero');
var expect = require('@lazy-random/expect');
var toFixedNumber = require('@lazy-num/to-fixed-number');
var fakeLibRMathRng = require('@lazy-random/fake-lib-r-math-rng');
var utilProbabilities = require('@lazy-random/util-probabilities');
var sum = require('@lazy-num/sum');
var utilDistributions = require('@lazy-random/util-distributions');
var sharedLib = require('@lazy-random/shared-lib');
var dfUniform = require('@lazy-random/df-uniform');

/**
 * not support unique, but will try make unique if can
 * thx @SeverinPappadeux for int version
 *
 * @see https://stackoverflow.com/questions/53279807/how-to-get-random-number-list-with-fixed-sum-and-size
 */
function coreFnRandSumInt(argv) {
  let {
    random,
    size,
    sum: sum$1,
    min,
    max
  } = argv;
  // @ts-ignore
  expect.expect(size).finite.integer.gt(1);
  const sum_1_to_size = sum.sum_1_to_n(size);
  sum$1 = sharedLib.isUnset(sum$1) ? sum_1_to_size : sum$1;
  // @ts-ignore
  expect.expect(sum$1).is.finite.integer();
  min = sharedLib.isUnset(min) ? sum$1 > 0 ? 0 : sum$1 : min;
  max = sharedLib.isUnset(max) ? Math.abs(sum$1) : max;
  // @ts-ignore
  expect.expect(min).is.finite.integer();
  // @ts-ignore
  expect.expect(max).is.finite.integer();
  //let n_sum = Math.abs(sum - size * min);
  let n_sum = sum$1 - size * min;
  let maxv = max - min;
  expect.expect(n_sum).gte(0);
  /*
  console.log({
      sum_1_to_size,
      size,
      sum,
      min,
      max,
      n_sum,
      maxv,
  });
  */
  if (sum$1 > 0) {
    expect.expect(sum$1).gt(min);
  }
  /**
   * pre-check
   */
  //expect(maxv, `(max - min) should > sum_1_to_size`).gte(sum_1_to_size);
  /**
   * probabilities
   */
  const prob = utilProbabilities.get_prob(size, maxv);
  expect.expect(prob).array.lengthOf(size);
  /**
   * make rmultinom use with random.next
   */
  const rmultinomFn = libRMath_js.Multinomial(fakeLibRMathRng.fakeLibRMathRng(() => random.next())).rmultinom;
  /**
   * low value for speed up, but more chance fail
   */
  const n_len = argv.limit || 5 || n_sum;
  /**
   * rebase number
   */
  let n_diff = min;
  const rmultinomCreateFn = n_len => {
    return rmultinomFn(n_len, n_sum, prob).reduce((a, value) => {
      let i = value.length;
      let b_sum = 0;
      let bool = false;
      let unique_len = 0;
      while (i--) {
        let v = value[i];
        let n = v + n_diff;
        if (value.indexOf(v) === i) {
          unique_len++;
        }
        if (n >= min && n <= max) {
          bool = true;
          value[i] = n;
          b_sum += n;
        } else {
          bool = false;
          break;
        }
      }
      if (bool && b_sum === sum$1) {
        let item = {
          value,
          unique_len,
          b_sum,
          bool
        };
        a.push(item);
      }
      return a;
    }, []).sort((a, b) => b.unique_len - a.unique_len);
  };
  /**
   * pre-make fail-back value
   */
  const cache_max = 10;
  let cache = [];
  {
    let len = 200;
    let arr = arrayHyperUnique.array_unique(rmultinomCreateFn(len).map(v => {
      v.value = v.value.map(numIsZero.fixZero);
      return v;
    }));
    if (arr.length) {
      let i = Math.min(cache_max, arr.length);
      while (i--) {
        cache.push(arr[i].value);
      }
      cache = arrayHyperUnique.array_unique(cache.map(v => v.sort()));
    }
    expect.expect(cache, `invalid argv (size=${size}, sum=${sum$1}, min=${min}, max=${max})`).array.have.lengthOf.gt(0);
    arr = undefined;
    //		console.log(cache);
  }
  /**
   * try reset memory
   */
  argv = undefined;
  return () => {
    let arr = rmultinomCreateFn(n_len);
    let ret_b;
    let bool_toplevel;
    let c_len = cache.length;
    if (arr.length) {
      ret_b = arr[0].value;
      bool_toplevel = arr[0].bool;
      ret_b = ret_b.map(numIsZero.fixZero);
      if (bool_toplevel && c_len < cache_max) {
        cache.push(ret_b);
      }
    } else if (c_len) {
      let i = utilDistributions.randIndex(random, c_len);
      ret_b = cache[i];
      bool_toplevel = true;
    }
    if (!bool_toplevel || !ret_b) {
      throw new Error(`can't generator value by current input argv, or try set limit for high number`);
    }
    return ret_b;
  };
}
function coreFnRandSumFloat(argv) {
  let {
    random,
    size,
    sum: sum$1,
    min,
    max,
    fractionDigits
  } = argv;
  // @ts-ignore
  expect.expect(size).is.finite.integer.gt(1);
  if (sharedLib.isUnset(sum$1) && typeof min === 'number' && typeof max === 'number') {
    sum$1 = (size - 1) * min + max;
    //console.log(sum, min, max);
  }

  sum$1 = sharedLib.isUnset(sum$1) ? 1.0 : sum$1;
  min = sharedLib.isUnset(min) ? sum$1 > 0 ? 0 : sum$1 : min;
  max = sharedLib.isUnset(max) ? Math.abs(sum$1) : max;
  // @ts-ignore
  expect.expect(min).is.finite.number();
  // @ts-ignore
  expect.expect(max).is.finite.number();
  // @ts-ignore
  expect.expect(sum$1).is.finite.number();
  sum$1 += 0.0;
  const n_sum = sum$1 - size * min;
  const maxv = max - min;
  if (sum$1 > 0) {
    expect.expect(sum$1).gt(min);
  }
  expect.expect(n_sum).gte(0);
  let fnFirst;
  if (!sharedLib.isUnset(fractionDigits)) {
    // @ts-ignore
    expect.expect(fractionDigits).finite.integer.gt(0);
  }
  {
    /**
     * get_prob_float(3, 10)
     * // => [ 4.444444444444445, 3.3333333333333335, 2.222222222222222 ]
     */
    const prob = utilProbabilities.get_prob_float(size, maxv);
    /**
     * array_sum(prob.slice(0, -1))
     * // => 7.777777777777779
     */
    const prob_slice_sum = sum.num_array_sum(prob.slice(0, -1));
    fnFirst = dfUniform.dfUniformFloat(random, 0, prob_slice_sum);
  }
  const fnNext = utilDistributions.float;
  return () => {
    let ret_b;
    let bool_toplevel;
    LABEL_TOP: do {
      const ret_a = [];
      let total = n_sum;
      let total2 = 0.0;
      let i = size - 1.0;
      let n10;
      let n11;
      let n00 = fnFirst();
      let n01 = numIsZero.fixZero(n00 + min);
      if (fractionDigits) {
        n01 = toFixedNumber.toFixedNumber(n01, fractionDigits);
      }
      if (n01 < min || n01 > max) {
        continue LABEL_TOP;
      }
      let t0 = total - n00;
      let t1 = t0 + min;
      if (t1 < min) {
        continue LABEL_TOP;
      }
      total2 += n01;
      ret_a.push(n01);
      total = t0;
      let n_prev = n01;
      LABEL_SUB: while (i > 1) {
        n10 = fnNext(random, 0, total);
        let t0 = total - n10;
        let t1 = t0 + min;
        if (t1 < min) {
          continue LABEL_TOP;
        }
        n11 = numIsZero.fixZero(n10 + min);
        if (fractionDigits) {
          n11 = toFixedNumber.toFixedNumber(n11, fractionDigits);
        }
        if (n11 < min || n11 > max || n11 === n_prev) {
          continue LABEL_SUB;
        }
        total2 += n11;
        ret_a.push(n11);
        total = t0;
        i--;
        n_prev = n11;
      }
      t1 = numIsZero.fixZero(sum$1 - total2);
      if (fractionDigits) {
        t1 = toFixedNumber.toFixedNumber(t1, fractionDigits);
      }
      if (t1 < min || t1 > max || t1 === n01 || t1 === n_prev) {
        continue LABEL_TOP;
      }
      ret_a.push(t1);
      bool_toplevel = true;
      ret_b = ret_a;
    } while (!bool_toplevel);
    /*
    if (!bool_toplevel)
    {
        throw new Error(`invalid argv (size=${size}, sum=${sum}, min=${min}, max=${max})`)
    }
    */
    return ret_b;
  };
}

function dfRandSumFloat(random, size, sum, min, max, fractionDigits) {
  return coreFnRandSumFloat({
    random,
    size,
    sum,
    min,
    max,
    fractionDigits
  });
}

function dfRandSumInt(random, size, sum, min, max, limit) {
  return coreFnRandSumInt({
    random,
    size,
    sum,
    min,
    max,
    limit
  });
}

exports.coreFnRandSumFloat = coreFnRandSumFloat;
exports.coreFnRandSumInt = coreFnRandSumInt;
exports.dfRandSumFloat = dfRandSumFloat;
exports.dfRandSumInt = dfRandSumInt;
//# sourceMappingURL=index.cjs.development.cjs.map
