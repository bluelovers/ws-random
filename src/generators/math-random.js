"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rng_1 = require("../rng");
class RNGMathRandom extends rng_1.default {
    get name() {
        return 'default';
    }
    next() {
        return rng_1._MathRandom();
    }
    seed(seed, opts) {
        // intentionally empty
    }
    clone() {
        return new RNGMathRandom();
    }
}
exports.RNGMathRandom = RNGMathRandom;
exports.default = RNGMathRandom;
// @ts-ignore
Object.freeze(exports);
