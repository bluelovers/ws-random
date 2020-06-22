Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, p = 0.5) => {
    //ow(p, ow.number.gte(0).lte(1))
    ow_1.default(p).number.gte(0).lte(1);
    return () => {
        return (random.next() + p) | 0;
    };
};
// @ts-ignore
Object.freeze(exports);
