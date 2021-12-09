"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
const to_fixed_number_1 = require("@lazy-num/to-fixed-number");
exports.default = (random, min, max, fractionDigits) => {
    if (max === undefined) {
        max = (min === undefined ? 1 : min);
        min = 0;
    }
    (0, expect_1.expect)(min).number();
    (0, expect_1.expect)(max).number.gt(min);
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
        (0, expect_1.expect)(fractionDigits).integer.gte(0);
        return () => {
            return (0, to_fixed_number_1.toFixedNumber)(fn(), fractionDigits);
        };
    }
    return fn;
};
//# sourceMappingURL=uniform.js.map