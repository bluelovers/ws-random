"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNGMathRandom2 = void 0;
const function_1 = __importDefault(require("./function"));
const _random_1 = require("../util/_random");
class RNGMathRandom2 extends function_1.default {
    constructor(seed = _random_1._MathRandom, opts, ...argv) {
        super(seed || _random_1._MathRandom, opts, ...argv);
    }
    get name() {
        return 'math-random2';
    }
}
exports.RNGMathRandom2 = RNGMathRandom2;
exports.default = RNGMathRandom2;
//# sourceMappingURL=math-random2.js.map