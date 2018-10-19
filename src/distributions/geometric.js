"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, p = 0.5) => {
    ow_lite_1.default(p, ow_lite_1.default.number.greaterThan(0).lessThanOrEqual(1));
    const invLogP = 1.0 / Math.log(1.0 - p);
    return () => {
        return 1 + (Math.log(random.next()) * invLogP) | 0;
    };
};
