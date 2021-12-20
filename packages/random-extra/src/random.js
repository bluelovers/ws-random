"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Random_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.Random = void 0;
/// <reference types="node" />
const expect_1 = require("@lazy-random/expect");
const rng_abstract_1 = require("@lazy-random/rng-abstract");
const rng_factory_1 = require("@lazy-random/rng-factory");
const core_decorators_1 = require("core-decorators");
const clone_class_1 = require("@lazy-random/clone-class");
const random_core_1 = require("@lazy-random/random-core");
/**
 * Seedable random number generator supporting many common distributions.
 *
 * Defaults to Math.random as its underlying pseudorandom number generator.
 *
 * @name Random
 * @class
 *
 * @param {Rng|function} [rng=Math.random] - Underlying pseudorandom number generator.
 */
let Random = Random_1 = class Random extends random_core_1.RandomCore {
    _init(rng) {
        if (rng) {
            //ow(rng, ow.object.instanceOf(RNG))
            (0, expect_1.expect)(rng).instanceof(rng_abstract_1.RNG);
        }
        Object.defineProperty(this, 'Random', {
            configurable: false,
            enumerable: false,
            get() {
                return Random_1;
            },
        });
        this.use(rng);
    }
    /**
     * Creates a new `Random` instance, optionally specifying parameters to
     * set a new seed.
     *
     * @see Rng.clone
     *
     * @param {string} [seed] - Optional seed for new RNG.
     * @param {object} [opts] - Optional config for new RNG options.
     * @return {Random}
     */
    clone(seed, ...args) {
        let o;
        if (this instanceof Random_1) {
            // @ts-ignore
            o = (this.__proto__.constructor);
        }
        else {
            o = Random_1;
        }
        // @ts-ignore
        return new o(this.rng.clone(seed, ...args));
    }
    /**
     * Sets the underlying pseudorandom number generator used via
     * either an instance of `seedrandom`, a custom instance of RNG
     * (for PRNG plugins), or a string specifying the PRNG to use
     * along with an optional `seed` and `opts` to initialize the
     * RNG.
     *
     * @example
     * const random = require('random')
     *
     * random.use('xor128', 'foobar')
     * // or
     * random.use(seedrandom('kittens'))
     * // or
     * random.use(Math.random)
     *
     * @param {...*} args
     */
    use(arg0, ...args) {
        this._rng = (0, rng_factory_1.RNGFactory)(arg0, ...args);
        return this;
    }
    /**
     * create new Random and use
     */
    newUse(arg0, ...args) {
        let o = (0, clone_class_1.getClass)(Random_1, this);
        return new o((0, rng_factory_1.RNGFactory)(arg0, ...args));
    }
    cloneUse(arg0, ...args) {
        let o = this.clone();
        o.use(arg0, ...args);
        return o;
    }
};
Random.Random = Random_1;
Random = Random_1 = __decorate([
    core_decorators_1.autobind
], Random);
exports.Random = Random;
exports.random = new Random();
// @ts-ignore
//random.default = random
Object.defineProperty(exports.random, 'default', {
    configurable: false,
    enumerable: false,
    get() {
        return exports.random;
    },
});
Object.defineProperty(Random, 'default', {
    configurable: false,
    enumerable: false,
    get() {
        return exports.random;
    },
});
Object.defineProperty(exports.random, "__esModule", { value: true });
// defaults to Math.random as its RNG
exports.default = exports.random;
//# sourceMappingURL=random.js.map