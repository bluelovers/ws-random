"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilDistributions = exports.int = exports.float = exports.randIndex = void 0;
function randIndex(random, len) {
    return Math.floor(random.next() * len);
}
exports.randIndex = randIndex;
function float(random, min, max) {
    return random.next() * (max - min) + min;
}
exports.float = float;
function int(random, min, max) {
    return Math.floor(float(random, min, max + 1));
}
exports.int = int;
exports.UtilDistributions = exports;
exports.default = exports.UtilDistributions;
//# sourceMappingURL=distributions.js.map