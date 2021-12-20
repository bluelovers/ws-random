import { array_unique } from 'array-hyper-unique';
import { Multinomial } from 'lib-r-math.js';
import { fixZero } from 'num-is-zero';
import { expect } from '@lazy-random/expect';
import { toFixedNumber } from '@lazy-num/to-fixed-number';
import { fakeLibRMathRng } from '@lazy-random/fake-lib-r-math-rng';
import { get_prob, get_prob_float } from '@lazy-random/util-probabilities';
import { sum_1_to_n, num_array_sum } from '@lazy-num/sum';
import { randIndex, float } from '@lazy-random/util-distributions';
import { isUnset } from '@lazy-random/shared-lib';
import { dfUniformFloat } from '@lazy-random/df-uniform';

function coreFnRandSumInt(argv) {
  let {
    random,
    size,
    sum,
    min,
    max
  } = argv;
  expect(size).finite.integer.gt(1);
  const sum_1_to_size = sum_1_to_n(size);
  sum = isUnset(sum) ? sum_1_to_size : sum;
  expect(sum).is.finite.integer();
  min = isUnset(min) ? sum > 0 ? 0 : sum : min;
  max = isUnset(max) ? Math.abs(sum) : max;
  expect(min).is.finite.integer();
  expect(max).is.finite.integer();
  let n_sum = sum - size * min;
  let maxv = max - min;
  expect(n_sum).gte(0);

  if (sum > 0) {
    expect(sum).gt(min);
  }

  const prob = get_prob(size, maxv);
  expect(prob).array.lengthOf(size);
  const rmultinomFn = Multinomial(fakeLibRMathRng(random.next)).rmultinom;
  const n_len = argv.limit || 5 || n_sum;
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

      if (bool && b_sum === sum) {
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

  const cache_max = 10;
  let cache = [];
  {
    let len = 200;
    let arr = array_unique(rmultinomCreateFn(len).map(v => {
      v.value = v.value.map(fixZero);
      return v;
    }));

    if (arr.length) {
      let i = Math.min(cache_max, arr.length);

      while (i--) {
        cache.push(arr[i].value);
      }

      cache = array_unique(cache.map(v => v.sort()));
    }

    expect(cache, `invalid argv (size=${size}, sum=${sum}, min=${min}, max=${max})`).array.have.lengthOf.gt(0);
    arr = undefined;
  }
  argv = undefined;
  return () => {
    let arr = rmultinomCreateFn(n_len);
    let ret_b;
    let bool_toplevel;
    let c_len = cache.length;

    if (arr.length) {
      ret_b = arr[0].value;
      bool_toplevel = arr[0].bool;
      ret_b = ret_b.map(fixZero);

      if (bool_toplevel && c_len < cache_max) {
        cache.push(ret_b);
      }
    } else if (c_len) {
      let i = randIndex(random, c_len);
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
    sum,
    min,
    max,
    fractionDigits
  } = argv;
  expect(size).is.finite.integer.gt(1);

  if (isUnset(sum) && typeof min === 'number' && typeof max === 'number') {
    sum = (size - 1) * min + max;
  }

  sum = isUnset(sum) ? 1.0 : sum;
  min = isUnset(min) ? sum > 0 ? 0 : sum : min;
  max = isUnset(max) ? Math.abs(sum) : max;
  expect(min).is.finite.number();
  expect(max).is.finite.number();
  expect(sum).is.finite.number();
  sum += 0.0;
  const n_sum = sum - size * min;
  const maxv = max - min;

  if (sum > 0) {
    expect(sum).gt(min);
  }

  expect(n_sum).gte(0);
  let fnFirst;

  if (!isUnset(fractionDigits)) {
    expect(fractionDigits).finite.integer.gt(0);
  }

  {
    const prob = get_prob_float(size, maxv);
    const prob_slice_sum = num_array_sum(prob.slice(0, -1));
    fnFirst = dfUniformFloat(random, 0, prob_slice_sum);
  }
  const fnNext = float;
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
      let n01 = fixZero(n00 + min);

      if (fractionDigits) {
        n01 = toFixedNumber(n01, fractionDigits);
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

        n11 = fixZero(n10 + min);

        if (fractionDigits) {
          n11 = toFixedNumber(n11, fractionDigits);
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

      t1 = fixZero(sum - total2);

      if (fractionDigits) {
        t1 = toFixedNumber(t1, fractionDigits);
      }

      if (t1 < min || t1 > max || t1 === n01 || t1 === n_prev) {
        continue LABEL_TOP;
      }

      ret_a.push(t1);
      bool_toplevel = true;
      ret_b = ret_a;
    } while (!bool_toplevel);

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

export { coreFnRandSumFloat, coreFnRandSumInt, dfRandSumFloat, dfRandSumInt };
//# sourceMappingURL=index.esm.mjs.map
