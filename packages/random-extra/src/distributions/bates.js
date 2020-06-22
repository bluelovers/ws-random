Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
exports.default = (random, n) => {
    //ow(n, ow.number.integer.positive)
    ow_1.default(n).integer.gt(0);
    const irwinHall = random.dfIrwinHall(n);
    return () => {
        return irwinHall() / n;
    };
};
// @ts-ignore
Object.freeze(exports);
