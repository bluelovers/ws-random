"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seedrandom_1 = require("./generators/seedrandom");
const rng_1 = require("./rng");
const xor128_1 = require("./generators/xor128");
const function_1 = require("./generators/function");
const math_random_1 = require("./generators/math-random");
const PRNG_BUILTINS = {
    // TODO: add more prng from C++11 lib
    'xor128': xor128_1.default,
    'function': function_1.default,
    'default': math_random_1.default,
    'seedrandom': seedrandom_1.default,
};
function RNGFactory(...args) {
    const [arg0 = 'default', ...rest] = args;
    switch (typeof arg0) {
        case 'object':
            if (arg0 instanceof rng_1.default) {
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
// @ts-ignore
Object.freeze(exports);
