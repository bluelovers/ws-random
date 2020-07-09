"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decToBase = exports.baseToDec = void 0;
const data_1 = require("./data");
function baseToDec(original_number, base) {
    let len, m, n10;
    n10 = 0;
    for (m = 0, len = original_number.length; m < len; m++) {
        let char = original_number[m];
        (n10 = n10 * base + data_1.map[char]);
    }
    return n10;
}
exports.baseToDec = baseToDec;
function decToBase(n, base) {
    let nx = '';
    while (n > 0) {
        let mod = n % base;
        n = (n - mod) / base;
        nx = data_1.chars[mod] + nx;
    }
    return nx;
}
exports.decToBase = decToBase;
//# sourceMappingURL=convert.js.map