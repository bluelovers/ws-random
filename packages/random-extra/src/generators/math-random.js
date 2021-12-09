"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNGMathRandom = void 0;
const rng_abstract_1 = require("@lazy-random/rng-abstract");
const util_1 = require("../util");
const original_math_random_1 = require("@lazy-random/original-math-random");
class RNGMathRandom extends rng_abstract_1.RNG {
    get name() {
        return 'math-random';
    }
    get seedable() {
        return false;
    }
    next() {
        return (0, original_math_random_1._MathRandom)();
    }
    seed(seed, opts, ...argv) {
        // intentionally empty
    }
    clone(seed, opts, ...argv) {
        return (0, util_1.cloneClass)(RNGMathRandom, this, seed, opts, ...argv);
    }
}
exports.RNGMathRandom = RNGMathRandom;
exports.default = RNGMathRandom;
//# sourceMappingURL=math-random.js.map