"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, alpha) => {
    ow_lite_1.default(alpha, ow_lite_1.default.number.gt(0));
    const invAlpha = 1.0 / alpha;
    return () => {
        return 1.0 / Math.pow(1.0 - random.next(), invAlpha);
    };
};
