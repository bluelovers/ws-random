Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../util/array");
const distributions_1 = require("../util/distributions");
function arrayShuffle(random, arr, overwrite) {
    const randIndex = (len) => {
        return distributions_1.randIndex(random, len);
    };
    if (!overwrite) {
        let cloneArrayLike;
        if (Buffer.isBuffer(arr)) {
            cloneArrayLike = (arr) => {
                // @ts-ignore
                return Buffer.from(arr);
            };
        }
        else {
            cloneArrayLike = (arr) => {
                // @ts-ignore
                return arr.slice();
            };
        }
        return () => {
            return array_1.swapAlgorithm2(cloneArrayLike(arr), true, randIndex);
        };
    }
    return () => {
        return array_1.swapAlgorithm2(arr, true, randIndex);
    };
}
arrayShuffle.memoizable = false;
exports.default = arrayShuffle;
// @ts-ignore
Object.freeze(exports);
