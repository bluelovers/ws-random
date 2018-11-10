Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, min, max) => {
    if (max === undefined) {
        max = (min === undefined ? 1 : min);
        min = 0;
    }
    ow_1.default(min, ow_1.default.number);
    ow_1.default(max, ow_1.default.number.gte(min));
    return () => {
        return random.next() * (max - min) + min;
    };
};
// @ts-ignore
Object.freeze(exports);
