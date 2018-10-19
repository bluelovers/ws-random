"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, n = 1, p = 0.5) => {
    ow_lite_1.default(n, ow_lite_1.default.number.positive.integer);
    ow_lite_1.default(p, ow_lite_1.default.number.gte(0).lte(1));
    return () => {
        let i = 0;
        let x = 0;
        while (i++ < n) {
            // @ts-ignore
            x += (random.next() < p);
        }
        return x;
    };
};
