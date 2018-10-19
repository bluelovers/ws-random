"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports._MathRandom = Math.random;
class RNG {
    constructor(seed, opts, ...argv) {
    }
    static create(seed, opts, ...argv) {
        if (this === RNG || !this) {
            throw new ReferenceError('RNG is abstract class');
        }
        // @ts-ignore
        return new this(seed, opts, ...argv);
    }
    get name() {
        throw new Error('RNG.name must be overridden');
    }
    get options() {
        return null;
    }
    next() {
        throw new ReferenceError('RNG.next must be overridden');
    }
    seed(seed, opts, ...argv) {
        throw new ReferenceError('RNG.seed must be overridden');
    }
    clone(seed, opts, ...argv) {
        throw new ReferenceError('RNG.clone must be overridden');
    }
    _seed(seed, opts, ...argv) {
        // TODO: add entropy and stuff
        return util_1.seedToken(seed, opts, ...argv);
    }
}
exports.RNG = RNG;
exports.default = RNG;
// @ts-ignore
Object.freeze(exports);
