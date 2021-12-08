"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSeedNum = void 0;
const _random_1 = require("./_random");
const const_1 = require("./const");
function randomSeedNum() {
    return ((0, _random_1._MathRandom)() * const_1.MATH_POW_2_32) + (0, _random_1._MathRandom)();
}
exports.randomSeedNum = randomSeedNum;
//# sourceMappingURL=seed.js.map