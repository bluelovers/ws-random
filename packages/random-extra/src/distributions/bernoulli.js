"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
exports.default = (random, p = 0.5) => {
    //ow(p, ow.number.gte(0).lte(1))
    (0, expect_1.expect)(p).number.gte(0).lte(1);
    return () => {
        return Math.floor(random.next() + p);
    };
};
//# sourceMappingURL=bernoulli.js.map