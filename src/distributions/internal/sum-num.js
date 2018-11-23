Object.defineProperty(exports, "__esModule", { value: true });
const array_hyper_unique_1 = require("array-hyper-unique");
const util_1 = require("../../for3rd/lib-r-math/util");
const util_2 = require("../../util");
const distributions_1 = require("../../util/distributions");
const math_1 = require("../../util/math");
const ow_1 = require("../../util/ow");
const uniform_1 = require("../uniform");
/**
 * not support unique, but will try make unique if can
 * thx @SeverinPappadeux for int version
 *
 * @see https://stackoverflow.com/questions/53279807/how-to-get-random-number-list-with-fixed-sum-and-size
 */
function coreFnRandSumInt(argv) {
    let { random, size, sum, min, max, } = argv;
    // @ts-ignore
    ow_1.expect(size).is.finite.integer.gt(1);
    let sum_1_to_size = math_1.sum_1_to_n(size);
    sum = util_2.isUnset(sum) ? sum_1_to_size : sum;
    // @ts-ignore
    ow_1.expect(sum).is.finite.integer();
    min = util_2.isUnset(min) ? (sum > 0 ? 0 : sum) : min;
    max = util_2.isUnset(max) ? Math.abs(sum) : max;
    // @ts-ignore
    ow_1.expect(min).is.finite.integer();
    // @ts-ignore
    ow_1.expect(max).is.finite.integer();
    //let n_sum = Math.abs(sum - size * min);
    let n_sum = sum - size * min;
    let maxv = max - min;
    ow_1.expect(n_sum).gte(0);
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
        ow_1.expect(sum).gt(min);
    }
    /**
     * pre-check
     */
    //expect(maxv, `(max - min) should > sum_1_to_size`).gte(sum_1_to_size);
    /**
     * probabilities
     */
    let prob = math_1.get_prob(size, maxv);
    ow_1.expect(prob).is.array.lengthOf(size);
    /**
     * make rmultinom use with random.next
     */
    let rmultinomFn = util_1.libRmath.Multinomial(util_1.fakeLibRMathRng(random.next)).rmultinom;
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
        let arr = array_hyper_unique_1.array_unique(rmultinomCreateFn(len).map(v => {
            v.value = v.value.map(math_1.fixZero);
            return v;
        }));
        if (arr.length) {
            let i = Math.min(cache_max, arr.length);
            while (i--) {
                cache.push(arr[i].value);
            }
            cache = array_hyper_unique_1.array_unique(cache.map(v => v.sort()));
        }
        ow_1.expect(cache, `invalid argv (size=${size}, sum=${sum}, min=${min}, max=${max})`)
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
            ret_b = ret_b.map(math_1.fixZero);
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
    ow_1.expect(size).is.finite.integer.gt(1);
    if (util_2.isUnset(sum) && typeof min === 'number' && typeof max === 'number') {
        sum = (size - 1) * min + max;
        //console.log(sum, min, max);
    }
    sum = util_2.isUnset(sum) ? 1 : sum;
    min = util_2.isUnset(min) ? (sum > 0 ? 0 : sum) : min;
    max = util_2.isUnset(max) ? Math.abs(sum) : max;
    // @ts-ignore
    ow_1.expect(min).is.finite.number();
    // @ts-ignore
    ow_1.expect(max).is.finite.number();
    // @ts-ignore
    ow_1.expect(sum).is.finite.number();
    let n_sum = sum - size * min;
    let maxv = max - min;
    if (sum > 0) {
        ow_1.expect(sum).gt(min);
    }
    ow_1.expect(n_sum).gte(0);
    let fnFirst;
    if (!util_2.isUnset(fractionDigits)) {
        ow_1.expect(fractionDigits)
            // @ts-ignore
            .is.finite
            .integer.gt(0);
    }
    {
        /**
         * get_prob_float(3, 10)
         * // => [ 4.444444444444445, 3.3333333333333335, 2.222222222222222 ]
         */
        let prob = math_1.get_prob_float(size, maxv);
        /**
         * array_sum(prob.slice(0, -1))
         * // => 7.777777777777779
         */
        let prob_slice_sum = math_1.array_sum(prob.slice(0, -1));
        fnFirst = uniform_1.default(random, 0, prob_slice_sum);
    }
    let fnNext = distributions_1.UtilDistributions.float;
    return () => {
        let ret_b;
        let bool_toplevel;
        LABEL_TOP: do {
            let ret_a = [];
            let total = n_sum;
            let total2 = 0;
            let i = size - 1;
            let n10;
            let n11;
            let n00 = fnFirst();
            let n01 = math_1.fixZero(n00 + min);
            if (fractionDigits) {
                n01 = math_1.toFixedNumber(n01, fractionDigits);
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
                n11 = math_1.fixZero(n10 + min);
                if (fractionDigits) {
                    n11 = math_1.toFixedNumber(n11, fractionDigits);
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
            t1 = math_1.fixZero(sum - total2);
            if (fractionDigits) {
                t1 = math_1.toFixedNumber(t1, fractionDigits);
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
