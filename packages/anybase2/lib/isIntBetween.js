"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIntBetween = void 0;
const isUnset_1 = require("./isUnset");
function isIntBetween(n, min, max) {
    return !(isNaN(n)
        || Math.round(n) !== n
        || (!(0, isUnset_1.isUnset)(min) && n < min)
        || (!(0, isUnset_1.isUnset)(max) && n > max));
}
exports.isIntBetween = isIntBetween;
//# sourceMappingURL=isIntBetween.js.map