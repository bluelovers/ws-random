"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const byte_1 = require("../util/byte");
const const_1 = require("../util/const");
const bytes_1 = __importDefault(require("./bytes"));
/**
 * @see https://github.com/tracker1/node-uuid4/blob/master/index.js
 */
function default_1(random, toUpperCase) {
    let fn = bytes_1.default(random, 16);
    let fn2 = toUpperCase ? byte_1._bytesToUuid(const_1.BYTE_TO_HEX_TO_UPPER_CASE) : byte_1._bytesToUuid(const_1.BYTE_TO_HEX_TO_LOWER_CASE);
    return () => {
        let arr = fn();
        arr[6] = (arr[6] & 0x0f) | 0x40;
        arr[8] = (arr[8] & 0x3f) | 0x80;
        let id = fn2(arr);
        return id;
    };
}
exports.default = default_1;
//# sourceMappingURL=uuidv4.js.map