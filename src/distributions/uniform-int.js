Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, min, max) => {
    if (max === undefined) {
        max = (min === undefined ? 1 : min);
        min = 0;
    }
    ow_lite_1.default(min, ow_lite_1.default.number.integer);
    ow_lite_1.default(max, ow_lite_1.default.number.integer.gte(min));
    return () => {
        return Math.floor(random.next() * (max - min + 1) + min);
    };
};
// @ts-ignore
Object.freeze(exports);
