"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
exports.default = (random, p = 0.5) => {
    //ow(p, ow.number.gt(0).lte(1))
    (0, expect_1.expect)(p).number.gt(0).lte(1);
    const invLogP = 1.0 / Math.log(1.0 - p);
    return () => {
        return Math.floor(1 + Math.log(random.next()) * invLogP);
    };
};
//# sourceMappingURL=geometric.js.map