"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_rebase = exports.randIndex = exports.swapAlgorithm2 = exports.swapAlgorithm = void 0;
/**
 * Created by user on 2018/10/24/024.
 */
const util_1 = require("../util");
function swapAlgorithm(arr, overwrite, fn = randIndex) {
    let i = arr.length;
    // @ts-ignore
    let ret = (overwrite ? arr : arr.slice());
    while (i) {
        let idx = fn(i--);
        if (i === idx)
            continue;
        let cache = ret[i];
        ret[i] = ret[idx];
        ret[idx] = cache;
        //console.log(i, idx, ret);
    }
    return ret;
}
exports.swapAlgorithm = swapAlgorithm;
function swapAlgorithm2(arr, overwrite, fn = randIndex) {
    let i = arr.length;
    // @ts-ignore
    let ret = (overwrite ? arr : arr.slice());
    let len = i;
    let j = Math.ceil(len / 2);
    while (i) {
        let idx = fn(len);
        i--;
        if (idx === i) {
            if (i < j) {
                idx = fn(len);
            }
            else {
                idx = fn(i);
            }
        }
        if (i === idx)
            continue;
        let cache = ret[i];
        ret[i] = ret[idx];
        ret[idx] = cache;
        //console.log(i, idx, ret);
    }
    return ret;
}
exports.swapAlgorithm2 = swapAlgorithm2;
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
//# sourceMappingURL=array.js.map