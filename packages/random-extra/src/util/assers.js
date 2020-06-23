"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnset = exports.isFloat = exports.isInt = exports.isNum = exports.expectInDelta = void 0;
var unsafe001_1 = require("num-in-delta/lib/unsafe001");
Object.defineProperty(exports, "expectInDelta", { enumerable: true, get: function () { return unsafe001_1.numberInDeltaUnsafe001; } });
function isNum(n) {
    return n === +n;
}
exports.isNum = isNum;
/**
 * @todo support 1e+23
 */
function isInt(n) {
    return n === (n | 0);
}
exports.isInt = isInt;
function isFloat(n) {
    return n === +n && n !== (n | 0);
}
exports.isFloat = isFloat;
function isUnset(n) {
    return typeof n === 'undefined' || n === null;
}
exports.isUnset = isUnset;
//# sourceMappingURL=assers.js.map