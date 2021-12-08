"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = __importDefault(require("../util/ow"));
const to_fixed_number_1 = require("@lazy-random/to-fixed-number");
exports.default = (random, min, max, fractionDigits) => {
    if (max === undefined) {
        max = (min === undefined ? 1 : min);
        min = 0;
    }
    (0, ow_1.default)(min).number();
    (0, ow_1.default)(max).number.gt(min);
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
        (0, ow_1.default)(fractionDigits).integer.gte(0);
        return () => {
            return (0, to_fixed_number_1.toFixedNumber)(fn(), fractionDigits);
        };
    }
    return fn;
};
//# sourceMappingURL=uniform.js.map