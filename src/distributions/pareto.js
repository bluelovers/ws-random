Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, alpha) => {
    ow_1.ow(alpha, ow_1.ow.number.gt(0));
    const invAlpha = 1.0 / alpha;
    return () => {
        return 1.0 / Math.pow(1.0 - random.next(), invAlpha);
    };
};
// @ts-ignore
Object.freeze(exports);
