"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, n) => {
    ow_lite_1.default(n, ow_lite_1.default.number.integer.greaterThanOrEqual(0));
    return () => {
        let sum = 0;
        for (let i = 0; i < n; ++i) {
            sum += random.next();
        }
        return sum;
    };
};
