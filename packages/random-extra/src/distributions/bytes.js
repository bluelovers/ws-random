"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("@lazy-random/expect");
const byte_1 = __importDefault(require("./byte"));
function uniformBytes(random, size, toStr) {
    (0, expect_1.expect)(size).integer.gt(0);
    const fn = (0, byte_1.default)(random, toStr);
    return () => {
        let i = size;
        let arr = [];
        while (i--) {
            arr[i] = fn();
        }
        return arr;
    };
}
exports.default = uniformBytes;
//# sourceMappingURL=bytes.js.map