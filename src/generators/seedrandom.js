"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rng_1 = require("../rng");
const seedrandom = require("seedrandom");
const shortid = require("shortid");
const hashSum = require("hash-sum");
class RNGSeedRandom extends rng_1.default {
    constructor(seed, opts, ...argv) {
        super();
        this._opts = { entropy: true };
        this.seed(seed, opts, ...argv);
    }
    get name() {
        return 'seedrandom';
    }
    next() {
        return this._rng();
    }
    seed(seed, opts, ...argv) {
        this._opts = opts || this._opts;
        this._rng = seedrandom(this._to_str(seed), this._opts, ...argv);
    }
    clone(seed, opts) {
        let o;
        if (this instanceof RNGSeedRandom) {
            // @ts-ignore
            o = (this.__proto__.constructor);
        }
        else {
            o = RNGSeedRandom;
        }
        return new o(seed, opts);
    }
    _to_str(seed) {
        //let type = typeof seed;
        if (!seed) {
            seed = shortid();
        }
        else if (typeof seed !== 'string') {
            seed = hashSum(seed);
        }
        return String(seed);
    }
}
exports.RNGSeedRandom = RNGSeedRandom;
exports.default = RNGSeedRandom;
// @ts-ignore
Object.freeze(exports);
