import { df_sfc32 } from '@lazy-num/float-algorithm';
import { RNGCore } from '@lazy-random/rng-abstract-core';
import { seedFromStringOrNumberOrArray } from '@lazy-random/seed-algorithm';

class RNGSfc32 extends RNGCore {
  constructor(seed, opts, ...argv) {
    super(seed, opts, ...argv);

    this._init(seed, opts, ...argv);
  }

  _init(seed, opts, ...argv) {
    seed = seedFromStringOrNumberOrArray(seed, 4);
    this._seed = seed;
    this._rng = df_sfc32(...seed);
  }

  seed(seed, opts, ...argv) {
    return this._init(seed, opts, ...argv);
  }

  get seedable() {
    return true;
  }

  next() {
    return this._rng();
  }

  get name() {
    return 'sfc32';
  }

}

export { RNGSfc32, RNGSfc32 as default };
//# sourceMappingURL=index.esm.mjs.map
