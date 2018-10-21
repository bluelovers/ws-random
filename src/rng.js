Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = require("./seeder/default");
const hash_any_1 = require("./seeder/hash-any");
const util_1 = require("./util");
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
    /**
     * return number for make new seed
     */
    _seedNum(seed, opts, ...argv) {
        // TODO: add entropy and stuff
        if (typeof seed === 'undefined') {
            /**
             * breaking change
             * this make always get a new token
             * when seed is undefined
             */
            seed = util_1._MathRandom();
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
// @ts-ignore
Object.freeze(exports);
