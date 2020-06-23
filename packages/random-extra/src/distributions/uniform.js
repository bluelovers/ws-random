"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../util/math");
const ow_1 = __importDefault(require("../util/ow"));
exports.default = (random, min, max, fractionDigits) => {
    if (max === undefined) {
        max = (min === undefined ? 1 : min);
        min = 0;
    }
    ow_1.default(min).number();
    ow_1.default(max).number.gt(min);
    let fn;
    if (min === 0 && max === 1) {
        fn = random.next;
    }
    else if (min === 0) {
        fn = () => {
            return random.next() * max;
        };
    }
    else {
        fn = () => {
            return random.next() * (max - min) + min;
        };
    }
    if (fractionDigits !== undefined) {
        ow_1.default(fractionDigits).integer.gte(0);
        return () => {
            return math_1.toFixedNumber(fn(), fractionDigits);
        };
    }
    return fn;
};
//# sourceMappingURL=uniform.js.map