Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, n) => {
    ow_lite_1.default(n, ow_lite_1.default.number.integer.positive);
    const irwinHall = random.irwinHall(n);
    return () => {
        return irwinHall() / n;
    };
};
// @ts-ignore
Object.freeze(exports);
