"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum_num_1 = require("./internal/sum-num");
exports.default = (random, size, sum, min, max, fractionDigits) => {
    return sum_num_1.coreFnRandSumFloat({
        random,
        size,
        sum,
        min,
        max,
        fractionDigits,
    });
};
//# sourceMappingURL=sum-float.js.map