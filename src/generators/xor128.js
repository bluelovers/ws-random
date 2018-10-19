"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rng_1 = require("../rng");
const util_1 = require("../util");
class RNGXOR128 extends rng_1.default {
    constructor(seed, opts, ...argv) {
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.seed(seed, opts, ...argv);
    }
    get name() {
        return 'xor128';
    }
    next() {
        const t = this.x ^ (this.x << 1);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        this.w = this.w ^ ((this.w >>> 19) ^ t ^ (t >>> 8));
        return (this.w >>> 0) / 0x100000000;
    }
    seed(seed, opts, ...argv) {
        // this._rng = seedrandom(this._seed(seed, opts))
        this.x = this._seed(seed, opts, ...argv);
        // discard an initial batch of 64 values
        for (let i = 0; i < 64; ++i) {
            this.next();
        }
    }
    clone(seed, opts, ...argv) {
        return util_1.cloneClass(RNGXOR128, this, seed, opts, ...argv);
    }
}
exports.RNGXOR128 = RNGXOR128;
exports.default = RNGXOR128;
// @ts-ignore
Object.freeze(exports);
