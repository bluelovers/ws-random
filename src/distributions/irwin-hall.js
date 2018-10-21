Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
/**
 * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
exports.default = (random, n) => {
    ow_lite_1.default(n, ow_lite_1.default.number.integer.gte(0));
    return () => {
        let sum = 0;
        for (let i = 0; i < n; ++i) {
            sum += random.next();
        }
        return sum;
    };
};
// @ts-ignore
Object.freeze(exports);
