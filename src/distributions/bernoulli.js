"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow = require("ow-lite");
exports.default = (random, p = 0.5) => {
    ow(p, ow.number.gte(0).lte(1));
    return () => {
        return (random.next() + p) | 0;
    };
};
