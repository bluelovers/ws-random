"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const num_is_zero_1 = require("num-is-zero");
const ow_1 = __importDefault(require("../util/ow"));
/**
 * https://zh.wikipedia.org/wiki/%E6%AD%90%E6%96%87%E2%80%93%E8%B3%80%E7%88%BE%E5%88%86%E4%BD%88
 * https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
exports.default = (random, n = 1) => {
    ow_1.default(n).integer.gte(0);
    n = num_is_zero_1.fixZero(n);
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