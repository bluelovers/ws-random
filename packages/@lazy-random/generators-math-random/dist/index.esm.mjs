import { cloneClass } from '@lazy-random/clone-class';
import { _MathRandom } from '@lazy-random/original-math-random';
import { RNGCore } from '@lazy-random/rng-abstract-core';

class RNGMathRandom extends RNGCore {
  get name() {
    return 'math-random';
  }

  get seedable() {
    return false;
  }

  next() {
    return _MathRandom();
  }

  clone(seed, opts, ...argv) {
    return cloneClass(RNGMathRandom, this, seed, opts, ...argv);
  }

}

export { RNGMathRandom, RNGMathRandom as default };
//# sourceMappingURL=index.esm.mjs.map
