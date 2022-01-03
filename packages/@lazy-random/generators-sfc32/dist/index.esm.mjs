import { df_sfc32 } from '@lazy-num/float-algorithm';
import { _MathRandom } from '@lazy-random/original-math-random';
import { df_xfnv1a, doubleToIEEE } from '@lazy-random/seed-algorithm';
import { RNGCore } from '@lazy-random/rng-abstract-core';

function _handleSeed(seedInput) {
  let exists_zero = false;
  let s;
  const seed = [seedInput !== null && seedInput !== void 0 ? seedInput : []].flat().slice(0, 4);

  for (let i = 0; i < 4; i++) {
    const type = typeof seed[i];

    if (type === 'string') {
      seed[i] = df_xfnv1a(`${seed[i]}#sfc32#${i}`)();
    } else if (type !== 'number') {
      exists_zero = true;
      seed[i] = void 0;
    } else {
      seed[i] = Math.abs(seed[i]);
    }

    if (!seed[i]) {
      if (seed[i] === 0 && !exists_zero) {
        exists_zero = true;
      } else {
        var _s;

        (_s = s) !== null && _s !== void 0 ? _s : s = doubleToIEEE(_MathRandom());
        seed[i] = s.pop();

        if (!s.length) {
          s = void 0;
        }
      }
    }
  }

  return seed;
}
class RNGSfc32 extends RNGCore {
  constructor(seed, opts, ...argv) {
    super(seed, opts, ...argv);

    this._init(seed, opts, ...argv);
  }

  _init(seed, opts, ...argv) {
    seed = _handleSeed(seed);
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

export { RNGSfc32, _handleSeed, RNGSfc32 as default };
//# sourceMappingURL=index.esm.mjs.map
