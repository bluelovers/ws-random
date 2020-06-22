Object.defineProperty(exports, "__esModule", { value: true });
const ow_1 = require("../util/ow");
const uniform_int_1 = require("./uniform-int");
const byte_1 = require("../util/byte");
function uniformByte(random, toStr) {
    let fn = uniform_int_1.default(random, 0, 255);
    if (typeof toStr !== 'undefined') {
        ow_1.default(toStr).is.boolean();
    }
    if (toStr) {
        return () => byte_1.stringifyByte(fn());
    }
    return fn;
}
exports.default = uniformByte;
// @ts-ignore
Object.freeze(exports);
