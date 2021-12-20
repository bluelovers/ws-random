import { RNGSeedRandom } from '@lazy-random/generators-seedrandom';
import { RNG } from '@lazy-random/rng-abstract';
import { IRNGFactoryType } from '@lazy-random/rng-factory';
import { RandomCore } from '@lazy-random/random-core';
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
export declare class Random<R extends RNG = RNG> extends RandomCore<R> {
    protected _init(rng?: R): void;
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
    clone(seed?: any, opts?: any, ...args: any[]): Random<R>;
    clone<T extends RNG>(seed?: any, opts?: any, ...args: any[]): Random<T>;
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
    use(arg0: IRNGFactoryType, ...args: any[]): this;
    newUse(arg0: 'seedrandom', ...args: any[]): Random<RNGSeedRandom>;
    newUse<T extends RNG>(arg0: T, ...args: any[]): Random<T>;
    newUse(arg0: IRNGFactoryType, ...args: any[]): Random<R | any>;
    /**
     * clone current Random and use
     */
    cloneUse<T extends RNG>(arg0: IRNGFactoryType, ...args: any[]): Random<T>;
    cloneUse(arg0: IRNGFactoryType, ...args: any[]): Random<R | any>;
    protected static default: typeof Random;
    readonly Random: typeof Random;
    static Random: typeof Random;
}
export declare const random: Random<RNG>;
export default random;
