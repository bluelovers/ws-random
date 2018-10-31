Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const function_1 = require("./function");
const seedrandom = require("seedrandom");
exports.defaultOptions = Object.freeze({
    entropy: true
});
class RNGSeedRandom extends function_1.default {
    constructor(seed, opts, ...argv) {
        super(seed, opts, ...argv);
    }
    static create(...argv) {
        return new this(...argv);
    }
    _init(seed, opts, ...argv) {
        this._opts = this._opts || Object.assign({}, exports.defaultOptions);
        this._seedrandom = this.__generator(...argv);
        super._init(seed, opts, ...argv);
    }
    __generator(fn = seedrandom) {
        if (fn && typeof fn === 'string') {
            switch (fn) {
                case 'alea':
                case 'tychei':
                case 'xor128':
                case 'xor4096':
                case 'xorshift7':
                case 'xorwow':
                    fn = require(`seedrandom/lib/${fn}`);
                    break;
                default:
                    if (fn.indexOf('..') === -1 && /^[a-z\-\.]+$/i.test(fn)) {
                        fn = require(`seedrandom/lib/${fn}`);
                        break;
                    }
                    else {
                        throw new RangeError(`unknow seedrandom lib name: ${fn}`);
                    }
            }
        }
        fn = fn || seedrandom;
        return (seed, opts, ...argv) => {
            // @ts-ignore
            return fn(seed, opts, ...argv);
        };
    }
    get name() {
        return 'seedrandom';
    }
    get options() {
        return this._opts;
    }
    get seedable() {
        return true;
    }
    /**
     * only when option.state = true
     */
    get state() {
        let fn = this._rng.state;
        if (typeof fn === 'function') {
            // @ts-ignore
            return fn();
        }
    }
    /**
     * @todo options for change seeder
     */
    seed(seed, opts, ...argv) {
        if (opts === null) {
            this._opts = undefined;
        }
        else {
            this._opts = opts || this._opts;
        }
        this._rng = this._seedrandom(this._seedStr(seed), this._opts, ...argv);
    }
    // @ts-ignore
    clone(seed, opts, ...argv) {
        return util_1.cloneClass(RNGSeedRandom, this, seed, opts, ...argv);
    }
}
exports.RNGSeedRandom = RNGSeedRandom;
exports.default = RNGSeedRandom;
// @ts-ignore
Object.freeze(exports);
