"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
const uniform_int_1 = __importDefault(require("./uniform-int"));
const byte_1 = require("../util/byte");
function uniformByte(random, toStr) {
    let fn = (0, uniform_int_1.default)(random, 0, 255);
    if (typeof toStr !== 'undefined') {
        (0, expect_1.expect)(toStr).is.boolean();
    }
    if (toStr) {
        return () => (0, byte_1.stringifyByte)(fn());
    }
    return fn;
}
exports.default = uniformByte;
//# sourceMappingURL=byte.js.map