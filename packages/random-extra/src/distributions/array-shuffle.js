"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_algorithm_1 = require("@lazy-random/array-algorithm");
const util_distributions_1 = require("@lazy-random/util-distributions");
function arrayShuffle(random, arr, overwrite) {
    const randIndex = (len) => {
        return (0, util_distributions_1.randIndex)(random, len);
    };
    if (!overwrite) {
        let cloneArrayLike;
        if (Buffer.isBuffer(arr)) {
            // @ts-ignore
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
            return (0, array_algorithm_1.swapAlgorithm2)(cloneArrayLike(arr), true, randIndex);
        };
    }
    return () => {
        return (0, array_algorithm_1.swapAlgorithm2)(arr, true, randIndex);
    };
}
arrayShuffle.memoizable = false;
exports.default = arrayShuffle;
//# sourceMappingURL=array-shuffle.js.map