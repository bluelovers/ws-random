import { RNGFunction } from '@lazy-random/generators-function';
import { _MathRandom } from '@lazy-random/original-math-random';

class RNGMathRandom2 extends RNGFunction {
  constructor(seed = _MathRandom, opts, ...argv) {
    super(seed || _MathRandom, opts, ...argv);
  }

  get name() {
    return 'math-random2';
  }

}

export { RNGMathRandom2, RNGMathRandom2 as default };
//# sourceMappingURL=index.esm.mjs.map
