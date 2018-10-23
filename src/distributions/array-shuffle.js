Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../util/array");
exports.default = (random) => {
    const randIndex = (len) => {
        return Math.floor(random.next() * len);
    };
    return (arr, overwrite, fn = randIndex) => {
        return array_1.swapAlgorithm(arr, overwrite, fn || randIndex);
    };
};
// @ts-ignore
Object.freeze(exports);
