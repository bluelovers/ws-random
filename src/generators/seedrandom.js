Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const req_1 = require("../util/req");
const function_1 = require("./function");
exports.defaultOptions = Object.freeze({
    entropy: true
});
class RNGSeedRandom extends function_1.default {
    constructor(seed, opts, ...argv) {
        super(seed, opts, ...argv);
    }
    static createLib(...argv) {
        return new this(argv[1], argv[2], argv[0], ...argv.slice(3));
    }
    static create(...argv) {
        return new this(...argv);
    }
    _init(seed, opts, ...argv) {
        this._opts = this._opts || Object.assign({}, exports.defaultOptions);
        this._seedrandom = this.__generator(...argv);
        super._init(seed, opts, ...argv);
    }
    __generator(fn) {
        if (fn && typeof fn === 'string') {
            switch (fn) {
                case 'alea':
                case 'tychei':
                case 'xor128':
                case 'xor4096':
                case 'xorshift7':
                case 'xorwow':
                    fn = req_1.tryRequire('seedrandom')[fn];
                    //fn = require(`seedrandom/lib/${fn}`)
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
        fn = fn || req_1.tryRequire('seedrandom');
        return fn;
        /*
        return (seed?, opts?: RNGSeedRandomOptions, ...argv) => {
            // @ts-ignore
            return fn(seed, opts, ...argv)
        }
        */
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
        this._rng = this._seedrandom(this._seedAuto(seed), this._opts, ...argv);
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
