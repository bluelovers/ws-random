Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, min, max) => {
    if (max === undefined) {
        max = (min === undefined ? 1 : min);
        min = 0;
    }
    ow_1.default(min, ow_1.default.number.integer);
    ow_1.default(max, ow_1.default.number.integer.gte(min));
    return () => {
        return Math.floor(random.next() * (max - min + 1) + min);
    };
};
// @ts-ignore
Object.freeze(exports);
