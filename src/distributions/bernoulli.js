"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, p = 0.5) => {
    ow_lite_1.default(p, ow_lite_1.default.number.greaterThan(0).lessThan(1));
    return () => {
        return (random.next() + p) | 0;
    };
};
