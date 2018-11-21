Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2018/10/24/024.
 */
const util_1 = require("../util");
function swapAlgorithm(arr, overwrite, fn = randIndex) {
    let len = arr.length;
    let ret = (overwrite ? arr : arr.slice());
    while (len > 0) {
        let idx = fn(len--);
        let cache = ret[len];
        ret[len] = ret[idx];
        ret[idx] = cache;
    }
    return ret;
}
exports.swapAlgorithm = swapAlgorithm;
function randIndex(len, ...argv) {
    return Math.floor(util_1._MathRandom() * len);
}
exports.randIndex = randIndex;
/**
 * back to original interval
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
            }
            else {
                bool = false;
                break;
            }
        }
    }
    else {
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
        b_sum,
    };
}
exports.array_rebase = array_rebase;
// @ts-ignore
Object.freeze(exports);
