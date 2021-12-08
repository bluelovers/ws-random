"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
const uniform_1 = __importDefault(require("./uniform"));
exports.default = (random, min, max) => {
    if (max === undefined) {
        max = (min === undefined ? 1 : min);
        min = 0;
    }
    (0, expect_1.expect)(min).integer();
    (0, expect_1.expect)(max).integer.gt(min);
    //ow(min, ow.number.integer)
    //ow(max, ow.number.integer.gt(min))
    let fn = (0, uniform_1.default)(random, min, max + 1);
    return () => {
        return Math.floor(fn());
    };
};
//# sourceMappingURL=uniform-int.js.map