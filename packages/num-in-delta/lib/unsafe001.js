"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberInDeltaUnsafe001 = void 0;
/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
function numberInDeltaUnsafe001(actual, expected, delta = 0.05) {
    return (expected - delta <= actual) && (actual <= expected + delta);
}
exports.numberInDeltaUnsafe001 = numberInDeltaUnsafe001;
//# sourceMappingURL=unsafe001.js.map