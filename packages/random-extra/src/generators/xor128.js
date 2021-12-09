"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNGXOR128 = void 0;
const rng_abstract_1 = require("@lazy-random/rng-abstract");
const util_1 = require("../util");
const seed_token_1 = require("@lazy-random/seed-token");
class RNGXOR128 extends rng_abstract_1.RNG {
    constructor(...argv) {
        super();
        this._init(...argv);
        this.seed(this.x);
    }
    get name() {
        return 'xor128';
    }
    get seedable() {
        return true;
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
        //		this.x = this._seedNum(seed, opts, ...argv)
        this._seed(seed, opts, ...argv);
        // discard an initial batch of 64 values
        let i = 64;
        while (i--) {
            this.next();
        }
    }
    clone(seed, opts, ...argv) {
        return (0, util_1.cloneClass)(RNGXOR128, this, seed, opts, ...argv);
    }
    _init(...argv) {
        let [x = (0, seed_token_1.randomSeedNum)(), y = (0, seed_token_1.randomSeedNum)(), z = (0, seed_token_1.randomSeedNum)(), w = (0, seed_token_1.randomSeedNum)(),] = argv;
        this._seed(x, y, z, w);
    }
    _seed(...argv) {
        let [x = this.x, y = this.y, z = this.z, w = this.w,] = argv;
        if (typeof x !== 'number') {
            x = this._seedNum(x) || this.x;
        }
        if (typeof y !== 'number') {
            y = this.y;
        }
        if (typeof z !== 'number') {
            z = this.z;
        }
        if (typeof x !== 'number') {
            w = this.w;
        }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}
exports.RNGXOR128 = RNGXOR128;
exports.default = RNGXOR128;
//# sourceMappingURL=xor128.js.map