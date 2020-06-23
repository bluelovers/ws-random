"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNGMathRandom = void 0;
const rng_1 = __importDefault(require("../rng"));
const util_1 = require("../util");
class RNGMathRandom extends rng_1.default {
    get name() {
        return 'math-random';
    }
    get seedable() {
        return false;
    }
    next() {
        return util_1._MathRandom();
    }
    seed(seed, opts, ...argv) {
        // intentionally empty
    }
    clone(seed, opts, ...argv) {
        return util_1.cloneClass(RNGMathRandom, this, seed, opts, ...argv);
    }
}
exports.RNGMathRandom = RNGMathRandom;
exports.default = RNGMathRandom;
//# sourceMappingURL=math-random.js.map