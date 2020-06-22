Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../util/math");
const ow_1 = require("../util/ow");
/**
 * https://zh.wikipedia.org/wiki/%E6%AD%90%E6%96%87%E2%80%93%E8%B3%80%E7%88%BE%E5%88%86%E4%BD%88
 * https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
exports.default = (random, n) => {
    ow_1.default(n).integer.gte(0);
    n = math_1.fixZero(n);
    if (n === 0) {
        return () => 0;
    }
    return () => {
        let i = n;
        let sum = 0;
        while (i--) {
            sum += random.next();
        }
        return sum;
    };
};
// @ts-ignore
Object.freeze(exports);
