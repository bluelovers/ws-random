Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, lambda = 1) => {
    ow_1.default(lambda, ow_1.default.number.positive);
    return () => {
        return -Math.log(1 - random.next()) / lambda;
    };
};
// @ts-ignore
Object.freeze(exports);
