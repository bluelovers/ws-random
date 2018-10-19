"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rng_1 = require("../rng");
const function_1 = require("./function");
class RNGMathRandom2 extends function_1.default {
    constructor(seed = rng_1._MathRandom, opts, ...argv) {
        super(seed || rng_1._MathRandom, opts, ...argv);
    }
    get name() {
        return 'math-random2';
    }
}
exports.RNGMathRandom2 = RNGMathRandom2;
exports.default = RNGMathRandom2;
// @ts-ignore
Object.freeze(exports);
