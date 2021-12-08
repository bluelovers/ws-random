"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
exports.default = (random, n = 1, p = 0.5) => {
    (0, expect_1.expect)(n).integer.gt(0);
    (0, expect_1.expect)(p).number.gte(0).lte(1);
    return () => {
        let i = n;
        let x = 0;
        while (i--) {
            if (random.next() < p) {
                x++;
            }
        }
        return x;
    };
};
//# sourceMappingURL=binomial.js.map