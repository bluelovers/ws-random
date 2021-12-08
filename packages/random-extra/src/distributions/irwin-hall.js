"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const num_is_zero_1 = require("num-is-zero");
const expect_1 = require("@lazy-random/expect");
/**
 * https://zh.wikipedia.org/wiki/%E6%AD%90%E6%96%87%E2%80%93%E8%B3%80%E7%88%BE%E5%88%86%E4%BD%88
 * https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
exports.default = (random, n = 1) => {
    (0, expect_1.expect)(n).integer.gte(0);
    n = (0, num_is_zero_1.fixZero)(n);
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
//# sourceMappingURL=irwin-hall.js.map