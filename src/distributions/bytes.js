Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
const uniform_int_1 = require("./uniform-int");
exports.default = (random, size) => {
    //ow(size, ow.number.integer.gt(0))
    ow_1.default(size).integer.gt(0);
    const fn = uniform_int_1.default(random, 0, 255);
    return () => {
        let arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(fn());
        }
        return arr;
    };
};
// @ts-ignore
Object.freeze(exports);
