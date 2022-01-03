'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var floatAlgorithm = require('@lazy-num/float-algorithm');
var originalMathRandom = require('@lazy-random/original-math-random');
var seedAlgorithm = require('@lazy-random/seed-algorithm');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');

function _handleSeed(seedInput) {
  let exists_zero = false;
  let s;
  const seed = [seedInput !== null && seedInput !== void 0 ? seedInput : []].flat().slice(0, 4);

  for (let i = 0; i < 4; i++) {
    const type = typeof seed[i];

    if (type === 'string') {
      seed[i] = seedAlgorithm.df_xfnv1a(`${seed[i]}#sfc32#${i}`)();
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

        (_s = s) !== null && _s !== void 0 ? _s : s = seedAlgorithm.doubleToIEEE(originalMathRandom._MathRandom());
        seed[i] = s.pop();

        if (!s.length) {
          s = void 0;
        }
      }
    }
  }

  return seed;
}
class RNGSfc32 extends rngAbstractCore.RNGCore {
  constructor(seed, opts, ...argv) {
    super(seed, opts, ...argv);

    this._init(seed, opts, ...argv);
  }

  _init(seed, opts, ...argv) {
    seed = _handleSeed(seed);
    this._seed = seed;
    this._rng = floatAlgorithm.df_sfc32(...seed);
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

exports.RNGSfc32 = RNGSfc32;
exports._handleSeed = _handleSeed;
exports["default"] = RNGSfc32;
//# sourceMappingURL=index.cjs.development.cjs.map
