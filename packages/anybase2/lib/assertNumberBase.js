"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNumberBase = void 0;
const data_1 = require("./data");
const isUnset_1 = require("./isUnset");
function assertNumberBase(val, original_number, original_base) {
    let len = val.length;
    for (let m = 0; m < len; m++) {
        const char = val[m];
        const v = data_1.map[char];
        if ((0, isUnset_1.isUnset)(v) || v > original_base) {
            throw new Error('Invalid digit(s) in number `' + original_number + '` for numeric ' + 'base `' + original_base + '` (expected positive integer ' + 'composed of alphanumeric characters only)');
        }
    }
}
exports.assertNumberBase = assertNumberBase;
//# sourceMappingURL=assertNumberBase.js.map