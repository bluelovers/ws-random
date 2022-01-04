'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var floatAlgorithm = require('@lazy-num/float-algorithm');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');
var seedAlgorithm = require('@lazy-random/seed-algorithm');

class RNGSfc32 extends rngAbstractCore.RNGCore {
  constructor(seed, opts, ...argv) {
    super(seed, opts, ...argv);

    this._init(seed, opts, ...argv);
  }

  _init(seed, opts, ...argv) {
    seed = seedAlgorithm.seedFromStringOrNumberOrArray(seed, 4);
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
exports["default"] = RNGSfc32;
//# sourceMappingURL=index.cjs.development.cjs.map
