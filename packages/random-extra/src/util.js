"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_unique_unsafe = array_unique_unsafe;
/**
 * for non-strict check, try get a little
 */
function array_unique_unsafe(arr) {
    return arr.filter((v, i, arr) => arr.indexOf(v) === i);
}
//# sourceMappingURL=util.js.map