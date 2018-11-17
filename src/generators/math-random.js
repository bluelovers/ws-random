Object.defineProperty(exports, "__esModule", { value: true });
const rng_1 = require("../rng");
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
// @ts-ignore
Object.freeze(exports);
