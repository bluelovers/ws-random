import { cloneClass } from '@lazy-random/clone-class';
import { RNG } from '@lazy-random/rng-abstract';
import { _MathRandom } from '@lazy-random/original-math-random';

class RNGMathRandom extends RNG {
  get name() {
    return 'math-random';
  }

  get seedable() {
    return false;
  }

  next() {
    return _MathRandom();
  }

  seed(seed, opts, ...argv) {}

  clone(seed, opts, ...argv) {
    return cloneClass(RNGMathRandom, this, seed, opts, ...argv);
  }

}

export { RNGMathRandom, RNGMathRandom as default };
//# sourceMappingURL=index.esm.mjs.map
