Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, p = 0.5) => {
    ow_1.ow(p, ow_1.ow.number.gte(0).lte(1));
    return () => {
        return (random.next() + p) | 0;
    };
};
// @ts-ignore
Object.freeze(exports);
