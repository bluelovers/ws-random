"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNGFactory = void 0;
const crypto_1 = __importDefault(require("./generators/crypto"));
const math_random2_1 = __importDefault(require("./generators/math-random2"));
const seedrandom_1 = __importDefault(require("./generators/seedrandom"));
const rng_abstract_1 = require("@lazy-random/rng-abstract");
const xor128_1 = __importDefault(require("./generators/xor128"));
const function_1 = __importDefault(require("./generators/function"));
const math_random_1 = __importDefault(require("./generators/math-random"));
const PRNG_BUILTINS = {
    // TODO: add more prng from C++11 lib
    'xor128': xor128_1.default,
    'function': function_1.default,
    'default': math_random2_1.default,
    'math-random': math_random_1.default,
    'math-random2': math_random2_1.default,
    'seedrandom': seedrandom_1.default,
    'crypto': crypto_1.default,
};
function RNGFactory(...args) {
    const [arg0 = 'default', ...rest] = args;
    switch (typeof arg0) {
        case 'object':
            if (arg0 instanceof rng_abstract_1.RNG) {
                return arg0;
            }
            break;
        case 'function':
            return new function_1.default(arg0);
        case 'string':
            const PRNG = PRNG_BUILTINS[arg0];
            if (PRNG) {
                return new PRNG(...rest);
            }
            break;
    }
    throw new TypeError(`invalid RNG "${arg0}"`);
}
exports.RNGFactory = RNGFactory;
exports.default = RNGFactory;
//# sourceMappingURL=rng-factory.js.map