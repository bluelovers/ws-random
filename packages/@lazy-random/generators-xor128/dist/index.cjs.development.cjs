'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rngAbstract = require('@lazy-random/rng-abstract');
var seedToken = require('@lazy-random/seed-token');
var cloneClass = require('@lazy-random/clone-class');

class RNGXOR128 extends rngAbstract.RNG {
  /**
   * 建立 xor128 亂數產生器。
   * Create an xor128 random number generator.
   *
   * 兩種簽章 (Two signatures)：`(seed, ...argv)` 以單一種子初始化；
   * `(x?, y?, z?, w?, ...argv)` 可逐字指定四個狀態字，省略者以 `randomSeedNum()` 補齊。
   *
   * `(seed, ...argv)` initializes from a single seed; `(x?, y?, z?, w?, ...argv)` sets
   * the four state words individually, filling any omitted word with `randomSeedNum()`.
   *
   * @param seed 種子 (Seed) / the seed
   * @param argv 其餘參數，原樣轉交 `_init()` / the remaining arguments, forwarded to `_init()`
   */

  constructor(...argv) {
    super();
    this._init(...argv);
    this.seed(this.x);
  }
  /**
   * 產生器名稱 (Generator Name)，供除錯或辨識演算法時使用。
   * The generator name, used for debugging or algorithm identification.
   *
   * @returns 固定字串 `'xor128'` / the constant string `'xor128'`
   */
  get name() {
    return 'xor128';
  }
  get seedable() {
    return true;
  }
  /**
   * 產生下一個亂數 (Random Number)。
   * Produce the next random number.
   *
   * @returns `[0, 1)` 區間的浮點數 (Float in `[0, 1)`) / a float in `[0, 1)`
   */
  next() {
    const t = this.x ^ this.x << 1;
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.w ^ (this.w >>> 19 ^ t ^ t >>> 8);
    return (this.w >>> 0) / 0x100000000;
  }
  /**
   * 重新播种 (Reseed)：以新值重設狀態字，並捨棄開頭 64 個輸出做預熱 (Warm-up)。
   * Reseed: reset the state words with new values and discard the first 64 outputs as a warm-up.
   *
   * @param seed 第一個狀態字 (First state word)，非數字時由 `_seedNum()` 轉換 / the first state word, converted by `_seedNum()` when not a number
   * @param opts 依位置對應狀態字 `y`（非數字時沿用目前狀態）/ positionally corresponds to state word `y` (falls back to the current state when not a number)
   * @param argv 依序對應狀態字 `z`、`w` 與其餘參數 / corresponds in order to state words `z`, `w` and the remaining arguments
   */
  seed(seed, opts, ...argv) {
    this._seed(seed, opts, ...argv);
    let i = 64;
    while (i--) {
      this.next();
    }
  }
  /**
   * 以目前實例複製出新的 `RNGXOR128`。
   * Create a new `RNGXOR128` copied from the current instance.
   *
   * @param seed 覆寫的種子 (Seed to override with) / the seed to override with
   * @param opts 覆寫的選項 (Options to override with) / the options to override with
   * @param argv 其餘參數 / the remaining arguments
   * @returns 新的 `RNGXOR128` 實例 / a new `RNGXOR128` instance
   */
  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGXOR128, this, seed, opts, ...argv);
  }
  /**
   * 由建構參數初始化狀態 (Initialize the State)：每個省略的位置以 `randomSeedNum()`
   * 產生的隨機數補齊，再交由 `_seed()` 寫入。
   *
   * Initialize the state from constructor arguments: each omitted position is filled
   * with a `randomSeedNum()` value and then written through `_seed()`.
   *
   * @param argv 依序對應 `x`、`y`、`z`、`w` 的建構參數 / constructor arguments corresponding to `x`, `y`, `z`, `w` in order
   */
  _init(...argv) {
    let [x = seedToken.randomSeedNum(), y = seedToken.randomSeedNum(), z = seedToken.randomSeedNum(), w = seedToken.randomSeedNum()] = argv;
    this._seed(x, y, z, w);
  }
  _seed(...argv) {
    let [x = this.x, y = this.y, z = this.z, w = this.w] = argv;
    if (typeof x !== 'number') {
      x = this._seedNum(x) || this.x;
    }
    if (typeof y !== 'number') {
      y = this.y;
    }
    if (typeof z !== 'number') {
      z = this.z;
    }
    if (typeof x !== 'number') {
      w = this.w;
    }
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}

exports.RNGXOR128 = RNGXOR128;
exports.default = RNGXOR128;
//# sourceMappingURL=index.cjs.development.cjs.map
