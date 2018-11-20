Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
const byte_1 = require("./byte");
function uniformBytes(random, size, toStr) {
    ow_1.default(size).integer.gt(0);
    const fn = byte_1.default(random, toStr);
    return () => {
        let arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(fn());
        }
        return arr;
    };
}
exports.default = uniformBytes;
// @ts-ignore
Object.freeze(exports);
