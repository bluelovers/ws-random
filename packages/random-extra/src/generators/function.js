"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNGFunction = void 0;
const rng_1 = __importDefault(require("../rng"));
const util_1 = require("../util");
class RNGFunction extends rng_1.default {
    constructor(seed, opts, ...argv) {
        super();
        this._seedable = null;
        this._init(seed, opts, ...argv);
    }
    _init(seed, opts, ...argv) {
        this.seed(seed, opts, ...argv);
    }
    get name() {
        return 'function';
    }
    get seedable() {
        return this._seedable;
    }
    next() {
        return this._rng();
    }
    seed(seed, opts, ...argv) {
        if (typeof seed === 'function') {
            this._rng = seed || this._rng;
        }
        //ow(this._rng, ow.function)
        //expect(this._rng).function();
    }
    clone(seed, opts, ...argv) {
        return util_1.cloneClass(RNGFunction, this, seed, opts, ...argv);
    }
}
exports.RNGFunction = RNGFunction;
exports.default = RNGFunction;
//# sourceMappingURL=function.js.map