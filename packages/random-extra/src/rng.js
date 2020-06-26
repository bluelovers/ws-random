"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNG = void 0;
const default_1 = require("./seeder/default");
const hash_any_1 = require("./seeder/hash-any");
const random_seed_str_1 = require("./util/random-seed-str");
class RNG {
    constructor(seed, opts, ...argv) {
    }
    _init_check(seed, opts, ...argv) {
    }
    _init(seed, opts, ...argv) {
        this._init_check(seed, opts, ...argv);
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
    get seedable() {
        return null;
    }
    /**
     * should return a float between 0 ~ 1
     */
    // @ts-ignore
    next() {
        throw new ReferenceError('RNG.next must be overridden');
    }
    seed(seed, opts, ...argv) {
        //throw new ReferenceError('RNG.seed must be overridden')
    }
    clone(seed, opts, ...argv) {
        throw new ReferenceError('RNG.clone must be overridden');
    }
    _seedAuto(seed, opts, ...argv) {
        if (seed && typeof seed === 'number') {
            return this._seedNum(seed, opts, ...argv);
        }
        return this._seedStr(seed, opts, ...argv);
    }
    /**
     * return number for make new seed
     */
    _seedNum(seed, opts, ...argv) {
        // TODO: add entropy and stuff
        if (typeof seed === 'undefined' || seed === null || seed === 0) {
            /**
             * breaking change
             * this make always get a new token
             * when seed is undefined
             */
            seed = random_seed_str_1.randomSeedStr();
        }
        return default_1.seedToken(seed, opts, ...argv);
    }
    /**
     * return string for make new seed
     */
    _seedStr(seed, opts, ...argv) {
        return hash_any_1.hashAny(seed, opts, ...argv);
    }
}
exports.RNG = RNG;
exports.default = RNG;
//# sourceMappingURL=rng.js.map