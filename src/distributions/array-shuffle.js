Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../util/array");
const distributions_1 = require("../util/distributions");
exports.default = (random) => {
    const randIndex = (len) => {
        return distributions_1.randIndex(random, len);
    };
    return (arr, overwrite, fn = randIndex) => {
        return array_1.swapAlgorithm(arr, overwrite, fn || randIndex);
    };
};
// @ts-ignore
Object.freeze(exports);
