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
        this._opts = Object.assign({}, exports.defaultOptions);
    }
    get name() {
        return 'seedrandom';
    }
    get options() {
        return this._opts;
    }
    seed(seed, opts, ...argv) {
        if (opts === null) {
            this._opts = undefined;
        }
        else {
            this._opts = opts || this._opts;
        }
        this._rng = seedrandom(this._seedStr(seed), this._opts, ...argv);
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
