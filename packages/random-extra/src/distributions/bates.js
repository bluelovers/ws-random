"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
exports.default = (random, n = 1) => {
    //ow(n, ow.number.integer.positive)
    (0, expect_1.expect)(n).integer.gt(0);
    const irwinHall = random.dfIrwinHall(n);
    return () => {
        return irwinHall() / n;
    };
};
//# sourceMappingURL=bates.js.map