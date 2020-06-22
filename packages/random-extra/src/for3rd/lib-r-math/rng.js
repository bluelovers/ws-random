Object.defineProperty(exports, "__esModule", { value: true });
const libRMath = require("lib-r-math.js");
const random_1 = require("../../random");
const rng_1 = require("../../rng");
const isExtendsOf = require("is-extends-of");
class LibRMathRngWithRandom extends libRMath.IRNG {
    constructor(_seed, rng) {
        super(_seed);
        this.use(rng, _seed);
    }
    get _name() {
        return 'Random<' + this.__random.rng.name + '>';
    }
    get seed() {
        return this.__seed;
    }
    set seed(_seed) {
        this.__random.seed && this.__random.seed(this.__seed = _seed);
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
        else if (seed && isExtendsOf(seed, libRMath.IRNG)) {
            // @ts-ignore
            this._rng = new seed(this._seedNum(opts));
        }
        else if (opts && isExtendsOf(opts, libRMath.IRNG)) {
            // @ts-ignore
            this._rng = new opts(this._seedNum(seed));
        }
        // @ts-ignore
        else if (seed && typeof seed.unif_rand === 'function') {
            this._rng = seed;
        }
        // @ts-ignore
        else if (opts && typeof opts.unif_rand === 'function') {
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
