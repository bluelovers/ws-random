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
// @ts-ignore
Object.freeze(exports);
