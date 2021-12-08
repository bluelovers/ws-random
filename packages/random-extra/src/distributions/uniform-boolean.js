"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
exports.default = (random, likelihood = 0.5) => {
    //ow(likelihood, ow.number.gt(0).lt(1))
    (0, expect_1.expect)(likelihood).number
        .gt(0)
        .lt(1);
    return () => {
        return (random.next() >= likelihood);
    };
};
//# sourceMappingURL=uniform-boolean.js.map