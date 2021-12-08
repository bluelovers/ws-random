"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anybase = void 0;
const assertNumberBase_1 = require("./lib/assertNumberBase");
const padNumber_1 = require("./lib/padNumber");
const convert_1 = require("./lib/convert");
const isIntBetween_1 = require("./lib/isIntBetween");
function anybase(target_base, original_number, original_base = 10, minimum_digits = 0, maximum_digits = 0) {
    target_base = Number(target_base);
    original_base = Number(original_base);
    minimum_digits = Number(minimum_digits);
    maximum_digits = Number(maximum_digits);
    if (!(0, isIntBetween_1.isIntBetween)(target_base, 2, 62)) {
        throw new Error('Invalid target numeric base specified: `' + target_base + '` (expected: 2 .. 62)');
    }
    if (!(0, isIntBetween_1.isIntBetween)(original_base, 2, 62)) {
        throw new Error('Invalid original numeric base specified: `' + original_base + '` (expected: 2 .. 62)');
    }
    if (!(0, isIntBetween_1.isIntBetween)(minimum_digits, 0, 64)) {
        throw new Error('Invalid minimum digits requested: `' + minimum_digits + '` (expected: 1 .. 64)');
    }
    if (!(0, isIntBetween_1.isIntBetween)(maximum_digits, 0, 64)) {
        throw new Error('Invalid minimum digits requested: `' + maximum_digits + '` (expected: 1 .. 64)');
    }
    let returnValue = String(original_number);
    if (original_base <= 16) {
        returnValue = returnValue.toUpperCase();
    }
    (0, assertNumberBase_1.assertNumberBase)(returnValue, original_number, original_base);
    if (original_base !== 10) {
        returnValue = (0, convert_1.baseToDec)(returnValue, original_base);
    }
    else {
        returnValue = Number(returnValue);
    }
    if (target_base !== 10) {
        returnValue = (0, convert_1.decToBase)(returnValue, target_base);
    }
    returnValue = (0, padNumber_1.padNumber)(String(returnValue), minimum_digits, maximum_digits);
    if (original_number === '') {
        return '0';
    }
    return returnValue;
}
exports.anybase = anybase;
exports.default = anybase;
//# sourceMappingURL=index.js.map