Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
const util_1 = require("../util");
class RNGMathRandom2 extends function_1.default {
    constructor(seed = util_1._MathRandom, opts, ...argv) {
        super(seed || util_1._MathRandom, opts, ...argv);
    }
    get name() {
        return 'math-random2';
    }
}
exports.RNGMathRandom2 = RNGMathRandom2;
exports.default = RNGMathRandom2;
// @ts-ignore
Object.freeze(exports);
