Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, n) => {
    ow_1.default(n, ow_1.default.number.integer.positive);
    const irwinHall = random.dfIrwinHall(n);
    return () => {
        return irwinHall() / n;
    };
};
// @ts-ignore
Object.freeze(exports);
