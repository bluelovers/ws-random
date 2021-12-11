"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreFnRandSumFloat = exports.coreFnRandSumInt = void 0;
const array_hyper_unique_1 = require("array-hyper-unique");
const lib_r_math_js_1 = require("lib-r-math.js");
const distributions_1 = require("../../util/distributions");
const num_is_zero_1 = require("num-is-zero");
const expect_1 = require("@lazy-random/expect");
const uniform_1 = __importDefault(require("../uniform"));
const assers_1 = require("../../util/assers");
const to_fixed_number_1 = require("@lazy-num/to-fixed-number");
const fake_lib_r_math_rng_1 = require("@lazy-random/fake-lib-r-math-rng");
const util_probabilities_1 = require("@lazy-random/util-probabilities");
const sum_1 = require("@lazy-num/sum");
/**
 * not support unique, but will try make unique if can
 * thx @SeverinPappadeux for int version
 *
 * @see https://stackoverflow.com/questions/53279807/how-to-get-random-number-list-with-fixed-sum-and-size
 */
function coreFnRandSumInt(argv) {
    let { random, size, sum, min, max, } = argv;
    // @ts-ignore
    (0, expect_1.expect)(size).is.finite.integer.gt(1);
    let sum_1_to_size = (0, sum_1.sum_1_to_n)(size);
    sum = (0, assers_1.isUnset)(sum) ? sum_1_to_size : sum;
    // @ts-ignore
    (0, expect_1.expect)(sum).is.finite.integer();
    min = (0, assers_1.isUnset)(min) ? (sum > 0 ? 0 : sum) : min;
    max = (0, assers_1.isUnset)(max) ? Math.abs(sum) : max;
    // @ts-ignore
    (0, expect_1.expect)(min).is.finite.integer();
    // @ts-ignore
    (0, expect_1.expect)(max).is.finite.integer();
    //let n_sum = Math.abs(sum - size * min);
    let n_sum = sum - size * min;
    let maxv = max - min;
    (0, expect_1.expect)(n_sum).gte(0);
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
    if (sum > 0) {
        (0, expect_1.expect)(sum).gt(min);
    }
    /**
     * pre-check
     */
    //expect(maxv, `(max - min) should > sum_1_to_size`).gte(sum_1_to_size);
    /**
     * probabilities
     */
    let prob = (0, util_probabilities_1.get_prob)(size, maxv);
    (0, expect_1.expect)(prob).is.array.lengthOf(size);
    /**
     * make rmultinom use with random.next
     */
    let rmultinomFn = (0, lib_r_math_js_1.Multinomial)((0, fake_lib_r_math_rng_1.fakeLibRMathRng)(random.next)).rmultinom;
    /**
     * low value for speed up, but more chance fail
     */
    let n_len = argv.limit || 5 || n_sum;
    /**
     * rebase number
     */
    let n_diff = min;
    const rmultinomCreateFn = (n_len) => {
        return rmultinomFn(n_len, n_sum, prob)
            .reduce((a, value) => {
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
                }
                else {
                    bool = false;
                    break;
                }
            }
            if (bool && b_sum === sum) {
                let item = {
                    value,
                    unique_len,
                    b_sum,
                    bool,
                };
                a.push(item);
            }
            return a;
        }, [])
            .sort((a, b) => b.unique_len - a.unique_len);
    };
    /**
     * pre-make fail-back value
     */
    const cache_max = 10;
    let cache = [];
    {
        let len = 200;
        let arr = (0, array_hyper_unique_1.array_unique)(rmultinomCreateFn(len).map(v => {
            v.value = v.value.map(num_is_zero_1.fixZero);
            return v;
        }));
        if (arr.length) {
            let i = Math.min(cache_max, arr.length);
            while (i--) {
                cache.push(arr[i].value);
            }
            cache = (0, array_hyper_unique_1.array_unique)(cache.map(v => v.sort()));
        }
        (0, expect_1.expect)(cache, `invalid argv (size=${size}, sum=${sum}, min=${min}, max=${max})`)
            .is.array
            .have.lengthOf.gt(0);
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
            ret_b = ret_b.map(num_is_zero_1.fixZero);
            if (bool_toplevel && c_len < cache_max) {
                cache.push(ret_b);
            }
        }
        else if (c_len) {
            let i = distributions_1.UtilDistributions.randIndex(random, c_len);
            ret_b = cache[i];
            bool_toplevel = true;
        }
        if (!bool_toplevel || !ret_b) {
            throw new Error(`can't generator value by current input argv, or try set limit for high number`);
        }
        return ret_b;
    };
}
exports.coreFnRandSumInt = coreFnRandSumInt;
function coreFnRandSumFloat(argv) {
    let { random, size, sum, min, max, fractionDigits, } = argv;
    // @ts-ignore
    (0, expect_1.expect)(size).is.finite.integer.gt(1);
    if ((0, assers_1.isUnset)(sum) && typeof min === 'number' && typeof max === 'number') {
        sum = (size - 1) * min + max;
        //console.log(sum, min, max);
    }
    sum = (0, assers_1.isUnset)(sum) ? 1.0 : sum;
    min = (0, assers_1.isUnset)(min) ? (sum > 0 ? 0 : sum) : min;
    max = (0, assers_1.isUnset)(max) ? Math.abs(sum) : max;
    // @ts-ignore
    (0, expect_1.expect)(min).is.finite.number();
    // @ts-ignore
    (0, expect_1.expect)(max).is.finite.number();
    // @ts-ignore
    (0, expect_1.expect)(sum).is.finite.number();
    sum += 0.0;
    let n_sum = sum - size * min;
    let maxv = max - min;
    if (sum > 0) {
        (0, expect_1.expect)(sum).gt(min);
    }
    (0, expect_1.expect)(n_sum).gte(0);
    let fnFirst;
    if (!(0, assers_1.isUnset)(fractionDigits)) {
        (0, expect_1.expect)(fractionDigits)
            // @ts-ignore
            .is.finite
            .integer.gt(0);
    }
    {
        /**
         * get_prob_float(3, 10)
         * // => [ 4.444444444444445, 3.3333333333333335, 2.222222222222222 ]
         */
        let prob = (0, util_probabilities_1.get_prob_float)(size, maxv);
        /**
         * array_sum(prob.slice(0, -1))
         * // => 7.777777777777779
         */
        let prob_slice_sum = (0, sum_1.num_array_sum)(prob.slice(0, -1));
        fnFirst = (0, uniform_1.default)(random, 0, prob_slice_sum);
    }
    let fnNext = distributions_1.UtilDistributions.float;
    return () => {
        let ret_b;
        let bool_toplevel;
        LABEL_TOP: do {
            let ret_a = [];
            let total = n_sum;
            let total2 = 0.0;
            let i = size - 1.0;
            let n10;
            let n11;
            let n00 = fnFirst();
            let n01 = (0, num_is_zero_1.fixZero)(n00 + min);
            if (fractionDigits) {
                n01 = (0, to_fixed_number_1.toFixedNumber)(n01, fractionDigits);
            }
            if (n01 < min || n01 > max) {
                continue LABEL_TOP;
            }
            let t0 = total - n00;
            let t1 = (t0 + min);
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
                let t1 = (t0 + min);
                if (t1 < min) {
                    continue LABEL_TOP;
                }
                n11 = (0, num_is_zero_1.fixZero)(n10 + min);
                if (fractionDigits) {
                    n11 = (0, to_fixed_number_1.toFixedNumber)(n11, fractionDigits);
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
            t1 = (0, num_is_zero_1.fixZero)(sum - total2);
            if (fractionDigits) {
                t1 = (0, to_fixed_number_1.toFixedNumber)(t1, fractionDigits);
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
exports.coreFnRandSumFloat = coreFnRandSumFloat;
//# sourceMappingURL=sum-num.js.map