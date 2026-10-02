'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var floatAlgorithm = require('@lazy-num/float-algorithm');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');
var seedAlgorithm = require('@lazy-random/seed-algorithm');

class RNGSfc32 extends rngAbstractCore.RNGCore {
  /**
   * 建立 SFC32 亂數產生器。
   * Create an SFC32 random number generator.
   *
   * @param seed 種子 (Seed)，可為字串、數字或陣列 / the seed: a string, number or array
   * @param opts 保留參數 (Reserved)，目前 `_init()` 未使用 / reserved; currently unused by `_init()`
   * @param argv 其餘參數，原樣轉交基類 / remaining arguments forwarded to the base class
   */
  constructor(seed, opts, ...argv) {
    super(seed, opts, ...argv);
    this._init(seed, opts, ...argv);
  }
  /**
   * 初始化 (Initialize) 種子狀態與亂數來源 (Random Source)，`seed()` 重新播种時也會重用此流程。
   * Initialize the seed state and random source; `seed()` reuses this flow when reseeding.
   *
   * @param seed 種子 (Seed)，可為字串、數字或陣列 / the seed: a string, number or array
   * @param opts 保留參數 (Reserved)，目前未使用 / reserved; currently unused
   * @param argv 其餘參數，目前未參與初始化 / remaining arguments; currently not part of initialization
   */
  _init(seed, opts, ...argv) {
    seed = seedAlgorithm.seedFromStringOrNumberOrArray(seed, 4);
    // @ts-ignore
    this._seed = seed;
    // @ts-ignore
    this._rng = floatAlgorithm.df_sfc32(...seed);
  }
  /**
   * 重新播种 (Reseed)：重新正規化種子並重建亂數來源 (Random Source)。
   * Reseed: re-normalize the seed and rebuild the random source.
   *
   * @param seed 新的種子 (New seed)，可為字串、數字或陣列 / the new seed: a string, number or array
   * @param opts 保留參數 (Reserved)，目前未使用 / reserved; currently unused
   * @param argv 其餘參數 / the remaining arguments
   */
  seed(seed, opts, ...argv) {
    return this._init(seed, opts, ...argv);
  }
  get seedable() {
    return true;
  }
  /**
   * 取下一個亂數 (Random Number)。
   * Get the next random number.
   *
   * @returns `[0, 1)` 區間的浮點數 (Float in `[0, 1)`) / a float in `[0, 1)`
   */
  next() {
    return this._rng();
  }
  /**
   * 產生器名稱 (Generator Name)，供除錯或辨識演算法時使用。
   * The generator name, used for debugging or algorithm identification.
   *
   * @returns 固定字串 `'sfc32'` / the constant string `'sfc32'`
   */
  get name() {
    return 'sfc32';
  }
}

exports.RNGSfc32 = RNGSfc32;
exports.default = RNGSfc32;
//# sourceMappingURL=index.cjs.development.cjs.map
