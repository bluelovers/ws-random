'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sharedLib = require('@lazy-random/shared-lib');
var crossCrypto = require('@lazy-random/cross-crypto');
var expect = require('@lazy-random/expect');
var rngAbstract = require('@lazy-random/rng-abstract');
var floatFromBuffer = require('@lazy-num/float-from-buffer');
var arrayRandIndex = require('@lazy-random/array-rand-index');

class RNGCrypto extends rngAbstract.RNG {
  _seedable = false;
  _randIndex = arrayRandIndex.arrayRandIndexByLength;
  _seed_size = sharedLib.UINT32_BYTES;
  _seed_size_min = sharedLib.UINT32_BYTES;
  /**
   * 建立亂數產生器；刻意不呼叫 super(seed)，因為加密來源不接受種子，
   * 改由 _init 直接初始化 crypto 來源。
   *
   * Creates the generator; super(seed) is deliberately skipped because a
   * crypto source takes no seed, and _init sets up the crypto source instead.
   *
   * @param seed 可傳入自訂 crypto-like 物件；省略時使用 crossCrypto() / a custom crypto-like object, or crossCrypto() when omitted
   * @param opts 保留的選項參數（目前未使用） / reserved options, currently unused
   * @param argv 保留的其餘參數，透傳給 _init / extra arguments forwarded to _init
   */
  constructor(seed, opts, ...argv) {
    super();
    this._init(seed, opts, ...argv);
  }
  /**
   * 初始化 crypto 來源並決定緩衝區大小與浮點轉換策略。
   *
   * Initializes the crypto source and picks the buffer size plus float
   * conversion strategy.
   *
   * @param crypto 自訂 crypto-like 物件；省略或 falsy 時退回 crossCrypto() / custom crypto-like object, falls back to crossCrypto() when omitted or falsy
   * @param opts 保留的選項參數 / reserved options
   * @param argv 保留的其餘參數 / extra reserved arguments
   */
  _init(crypto, opts, ...argv) {
    crypto = crypto || crossCrypto.crossCrypto();
    this._crypto = crypto;
    this._randIndex = this._randIndex || arrayRandIndex.arrayRandIndexByLength;
    /**
     * 以斷言 (Assertion) 提早失敗：來源缺少 randomBytes 時在建構期就報錯，
     * 避免延遲到第一次取樣才出現難以追蹤的錯誤。
     *
     * Fails fast via assertion: a source missing randomBytes errors during
     * construction instead of surfacing at the first sample.
     *
     * @throws 斷言失敗時丟出 Chai AssertionError / Chai AssertionError when the assertion fails
     */
    // @ts-ignore
    expect.expect(crypto.randomBytes).is.a.function();
    {
      this._seed_size = Math.min(Math.max(this._seed_size, sharedLib.UINT32_BYTES), 255);
      this._seed_size_min = Math.min(Math.max(this._seed_size_min, sharedLib.UINT32_BYTES), 255);
      this._fn = floatFromBuffer._floatFromBuffer2;
    }
  }
  /**
   * 取得指定大小的隨機緩衝區 (Buffer)。
   *
   * Gets a random buffer of the requested size.
   *
   * @param size 期望的位元組數；省略時使用 _seed_size / desired byte count, uses _seed_size when omitted
   * @param size_min 位元組數下限，預設為 _seed_size_min / lower bound of the byte count, defaults to _seed_size_min
   * @returns 長度落在 [size_min, 255] 的隨機緩衝區 / a random buffer whose length is within [size_min, 255]
   */
  _buffer(size, size_min = this._seed_size_min) {
    size = (size || this._seed_size) | 0;
    if (size < size_min) {
      size = size_min;
    } else if (size > 255) {
      size = 255;
    }
    let buf = this._crypto.randomBytes(size);
    if (size > size_min) {
      let i = this._randIndex(size - size_min);
      // @ts-ignore
      buf = buf.slice(i, i + size_min);
    }
    return buf;
  }
  get name() {
    return 'crypto';
  }
  /**
   * 產生一個 0～1 的浮點亂數 (Float Random Number)。
   *
   * Produces one 0~1 float random number.
   *
   * @returns 0～1 區間內的亂數 / a random number within 0~1
   */
  next() {
    return this._fn(this._buffer());
  }
  /**
   * 保留的種子 API：加密亂數來源不可重播 (Non-replayable)，故為空實作。
   *
   * Reserved seeding API: a crypto source is non-replayable, so this is a
   * no-op implementation.
   *
   * @param seed 未使用 / unused
   * @param opts 未使用 / unused
   * @param argv 未使用 / unused
   */
  seed(seed, opts, ...argv) {}
}

exports.RNGCrypto = RNGCrypto;
exports.default = RNGCrypto;
//# sourceMappingURL=index.cjs.development.cjs.map
