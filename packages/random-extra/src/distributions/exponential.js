"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
exports.default = (random, lambda = 1) => {
    //ow(lambda, ow.number.positive)
    (0, expect_1.expect)(lambda).number.gt(0);
    return () => {
        return -Math.log(1 - random.next()) / lambda;
    };
};
//# sourceMappingURL=exponential.js.map