Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../util/array");
const distributions_1 = require("../util/distributions");
exports.default = (random, arr, overwrite) => {
    const randIndex = (len) => {
        return distributions_1.randIndex(random, len);
    };
    return (arr) => {
        return array_1.swapAlgorithm2(arr, overwrite, randIndex);
    };
};
// @ts-ignore
Object.freeze(exports);
