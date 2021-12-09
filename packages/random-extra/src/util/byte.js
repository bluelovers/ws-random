"use strict";
/**
 * Created by user on 2018/11/17/017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHexArray = exports.stringifyByte = void 0;
const shared_lib_1 = require("@lazy-random/shared-lib");
//export { BYTE_TO_HEX_TO_LOWER_CASE, BYTE_TO_HEX_TO_UPPER_CASE }
function stringifyByte(byte) {
    return shared_lib_1.BYTE_TO_HEX_TO_UPPER_CASE[byte];
}
exports.stringifyByte = stringifyByte;
function toHexArray(arr) {
    return arr.map(stringifyByte);
}
exports.toHexArray = toHexArray;
//# sourceMappingURL=byte.js.map