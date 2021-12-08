"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
exports.default = (random, alpha = 1) => {
    //ow(alpha, ow.number.gt(0))
    (0, expect_1.expect)(alpha).gt(0);
    const invAlpha = 1.0 / alpha;
    return () => {
        return 1.0 / Math.pow(1.0 - random.next(), invAlpha);
    };
};
//# sourceMappingURL=pareto.js.map