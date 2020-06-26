"use strict";
/**
 * Created by user on 2020/6/27.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixZero = exports.isZero = void 0;
function isZero(val) {
    return val === 0 || val === -0;
}
exports.isZero = isZero;
function fixZero(val) {
    // @ts-ignore
    return val === -0 ? 0 : val;
}
exports.fixZero = fixZero;
exports.default = isZero;
//# sourceMappingURL=index.js.map