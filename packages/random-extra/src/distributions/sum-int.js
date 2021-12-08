"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum_num_1 = require("./internal/sum-num");
exports.default = (random, size, sum, min, max, limit) => {
    return (0, sum_num_1.coreFnRandSumInt)({
        random,
        size,
        sum,
        min,
        max,
        limit,
    });
};
//# sourceMappingURL=sum-int.js.map