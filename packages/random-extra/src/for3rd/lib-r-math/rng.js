"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomRngWithLibRMath = exports.LibRMathRngWithRandom = void 0;
const libRMath = __importStar(require("lib-r-math.js"));
const random_1 = require("../../random");
const rng_1 = __importDefault(require("../../rng"));
const is_extends_of_1 = __importDefault(require("is-extends-of"));
class LibRMathRngWithRandom extends libRMath.IRNG {
    constructor(_seed, rng) {
        super(_seed);
        this.use(rng, _seed);
    }
    // @ts-ignore
    get _name() {
        return 'Random<' + this.__random.rng.name + '>';
    }
    get seed() {
        return this.__seed;
    }
    set seed(_seed) {
        var _a, _b;
        (_b = (_a = this.__random).seed) === null || _b === void 0 ? void 0 : _b.call(_a, this.__seed = _seed);
    }
    use(rng, _seed) {
        if (rng) {
            if (rng instanceof rng_1.default || typeof rng.next === 'function') {
                //
            }
            else if (rng === 'seedrandom') {
                rng = random_1.random.newUse('seedrandom', _seed, {
                    entropy: false,
                });
            }
            else if (!(rng instanceof random_1.Random)) {
                rng = random_1.random.newUse(rng);
            }
        }
        this.__random = rng || this.__random || random_1.random;
        if (typeof _seed !== 'undefined') {
            this.seed = _seed;
        }
    }
    _setup() { }
    internal_unif_rand() {
        return this.__random.next();
    }
}
exports.LibRMathRngWithRandom = LibRMathRngWithRandom;
class RandomRngWithLibRMath extends rng_1.default {
    constructor(seed, opts, ...argv) {
        super();
        this._seedable = true;
        this._init(seed, opts, ...argv);
    }
    _init(seed, opts, ...argv) {
        if (seed instanceof libRMath.IRNG) {
            // @ts-ignore
            this._rng = seed;
        }
        else if (opts instanceof libRMath.IRNG) {
            // @ts-ignore
            this._rng = opts;
        }
        else if (seed && is_extends_of_1.default(seed, libRMath.IRNG)) {
            // @ts-ignore
            this._rng = new seed(this._seedNum(opts));
        }
        else if (opts && is_extends_of_1.default(opts, libRMath.IRNG)) {
            // @ts-ignore
            this._rng = new opts(this._seedNum(seed));
        }
        // @ts-ignore
        else if (typeof (seed === null || seed === void 0 ? void 0 : seed.unif_rand) === 'function') {
            this._rng = seed;
        }
        // @ts-ignore
        else if (typeof (opts === null || opts === void 0 ? void 0 : opts.unif_rand) === 'function') {
            this._rng = opts;
        }
        else if (opts && libRMath[opts]) {
            let r = libRMath[opts];
            // @ts-ignore
            this._rng = new r(this._seedNum(seed));
        }
        else {
            // @ts-ignore
            this._rng = new libRMath.rng.MersenneTwister(this._seedNum(seed));
        }
        // @ts-ignore
        this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
    }
    get name() {
        return 'libRMath'
            + (this._rng.name ? `<${this._rng.name}>` : '');
    }
    get options() {
        return this._rng.seed;
    }
    next() {
        return this._fn();
    }
    seed(seed, opts, ...argv) {
        this._rng.seed = [this._seedNum(seed)];
    }
}
exports.RandomRngWithLibRMath = RandomRngWithLibRMath;
//# sourceMappingURL=rng.js.map