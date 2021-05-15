"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnset = exports.expectInDelta = exports.isFloat = exports.isNum = exports.isInt = void 0;
var check_1 = require("chai-asserttype-extra/lib/check");
Object.defineProperty(exports, "isInt", { enumerable: true, get: function () { return check_1.isInt; } });
Object.defineProperty(exports, "isNum", { enumerable: true, get: function () { return check_1.isNum; } });
Object.defineProperty(exports, "isFloat", { enumerable: true, get: function () { return check_1.isFloat; } });
var unsafe001_1 = require("num-in-delta/lib/unsafe001");
Object.defineProperty(exports, "expectInDelta", { enumerable: true, get: function () { return unsafe001_1.numberInDeltaUnsafe001; } });
function isUnset(n) {
    return typeof n === 'undefined' || n === null;
}
exports.isUnset = isUnset;
//# sourceMappingURL=assers.js.map