"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padNumber = void 0;
function padNumber(returnValue, minimum_digits, maximum_digits) {
    if (minimum_digits > 0) {
        returnValue = returnValue.padStart(minimum_digits, '0');
    }
    if (maximum_digits > 0 && returnValue.length > maximum_digits) {
        returnValue = returnValue.substr(0, maximum_digits);
    }
    return returnValue;
}
exports.padNumber = padNumber;
//# sourceMappingURL=padNumber.js.map