import * as libRMath from 'lib-r-math.js';
import { IRNG } from 'lib-r-math.js';
import { random, Random } from 'random-extra/src/random';
import { RNG } from '@lazy-random/rng-abstract';
import isExtendsOf from 'is-extends-of';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class LibRMathRngWithRandom extends IRNG {
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
    var _this$__random$seed, _this$__random;

    (_this$__random$seed = (_this$__random = this.__random).seed) === null || _this$__random$seed === void 0 ? void 0 : _this$__random$seed.call(_this$__random, this.__seed = _seed);
  }

  use(rng, _seed) {
    if (rng) {
      if (rng instanceof RNG || typeof rng.next === 'function') ; else if (rng === 'seedrandom') {
        rng = random.newUse('seedrandom', _seed, {
          entropy: false
        });
      } else if (!(rng instanceof Random)) {
        rng = random.newUse(rng);
      }
    }

    this.__random = rng || this.__random || random;

    if (typeof _seed !== 'undefined') {
      this.seed = _seed;
    }
  }

  _setup() {}

  internal_unif_rand() {
    return this.__random.next();
  }

}
class RandomRngWithLibRMath extends RNG {
  constructor(seed, opts, ...argv) {
    super();

    _defineProperty(this, "_seedable", true);

    this._init(seed, opts, ...argv);
  }

  _init(seed, opts, ...argv) {
    if (seed instanceof libRMath.IRNG) {
      this._rng = seed;
    } else if (opts instanceof libRMath.IRNG) {
      this._rng = opts;
    } else if (seed && isExtendsOf(seed, libRMath.IRNG)) {
      this._rng = new seed(this._seedNum(opts));
    } else if (opts && isExtendsOf(opts, libRMath.IRNG)) {
      this._rng = new opts(this._seedNum(seed));
    } else if (typeof (seed === null || seed === void 0 ? void 0 : seed.unif_rand) === 'function') {
      this._rng = seed;
    } else if (typeof (opts === null || opts === void 0 ? void 0 : opts.unif_rand) === 'function') {
      this._rng = opts;
    } else if (opts && libRMath[opts]) {
      let r = libRMath[opts];
      this._rng = new r(this._seedNum(seed));
    } else {
      this._rng = new libRMath.rng.MersenneTwister(this._seedNum(seed));
    }

    this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
  }

  get name() {
    return 'libRMath' + (this._rng.name ? `<${this._rng.name}>` : '');
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

export { LibRMathRngWithRandom, RandomRngWithLibRMath, RandomRngWithLibRMath as default };
//# sourceMappingURL=index.esm.mjs.map
