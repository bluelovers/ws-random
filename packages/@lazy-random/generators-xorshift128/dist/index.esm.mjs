import { RNG } from '@lazy-random/rng-abstract';
import { getRandomSeedAuto, XorShift } from '@bluelovers/xorshift';

class RNGXorShift128 extends RNG {
  constructor(seed, opts, ...argv) {
    super();

    this._init(seed, opts, ...argv);
  }

  _init(seed, opts, ...argv) {
    super._init(seed, opts, ...argv);

    seed = getRandomSeedAuto(seed);
    this._rng = new XorShift(seed);
  }

  seed(seed, opts, ...argv) {
    var _seed;

    (_seed = seed) !== null && _seed !== void 0 ? _seed : seed = getRandomSeedAuto();

    this._rng.seed(seed);
  }

  next() {
    return this._rng.random();
  }

  get seedable() {
    return true;
  }

  get name() {
    return 'xorshift128';
  }

}

export { RNGXorShift128, RNGXorShift128 as default };
//# sourceMappingURL=index.esm.mjs.map
