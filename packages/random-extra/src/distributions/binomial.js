Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, n = 1, p = 0.5) => {
    ow_1.default(n).integer.gt(0);
    ow_1.default(p).number.gte(0).lte(1);
    return () => {
        let i = n;
        let x = 0;
        while (i--) {
            if (random.next() < p) {
                x++;
            }
        }
        return x;
    };
};
// @ts-ignore
Object.freeze(exports);
