Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
exports.default = (random, lambda = 1) => {
    ow_lite_1.default(lambda, ow_lite_1.default.number.positive);
    return () => {
        return -Math.log(1 - random.next()) / lambda;
    };
};
// @ts-ignore
Object.freeze(exports);
