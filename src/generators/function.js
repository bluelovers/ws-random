"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ow = require("ow-lite");
const rng_1 = require("../rng");
class RNGFunction extends rng_1.default {
    constructor(seed, opts) {
        super();
        this.seed(seed, opts);
    }
    get name() {
        return 'function';
    }
    next() {
        return this._rng();
    }
    seed(seed, opts) {
        ow(seed, ow.function);
        this._rng = seed;
    }
    clone(seed, opts) {
        let o;
        if (this instanceof RNGFunction) {
            // @ts-ignore
            o = (this.__proto__.constructor);
        }
        else {
            o = RNGFunction;
        }
        return new o(seed, opts);
    }
}
exports.RNGFunction = RNGFunction;
exports.default = RNGFunction;
// @ts-ignore
Object.freeze(exports);
