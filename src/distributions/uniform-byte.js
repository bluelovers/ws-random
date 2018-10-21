Object.defineProperty(exports, "__esModule", { value: true });
const uniform_int_1 = require("./uniform-int");
function uniformByte(random) {
    return uniform_int_1.default(random, 0, 255);
}
exports.default = uniformByte;
// @ts-ignore
Object.freeze(exports);
