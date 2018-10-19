"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow = require("ow-lite");
const rng_1 = require("../rng");
const util_1 = require("../util");
class RNGFunction extends rng_1.default {
    constructor(seed, opts, ...argv) {
        super();
        this.seed(seed, opts, ...argv);
    }
    get name() {
        return 'function';
    }
    next() {
        return this._rng();
    }
    seed(seed, opts, ...argv) {
        this._rng = seed || this._rng;
        ow(this._rng, ow.function);
    }
    clone(seed, opts, ...argv) {
        return util_1.cloneClass(RNGFunction, this, seed, opts, ...argv);
    }
}
exports.RNGFunction = RNGFunction;
exports.default = RNGFunction;
// @ts-ignore
Object.freeze(exports);
