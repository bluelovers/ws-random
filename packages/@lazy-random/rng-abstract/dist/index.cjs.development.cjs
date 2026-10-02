'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var seedToken = require('@lazy-random/seed-token');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');

class RNG extends rngAbstractCore.RNGCore {
  /**
   * 建立目前子類別的實例，作為統一的實例化工廠 (Factory Method)
   *
   * 僅供繼承 `RNG` 的具體子類別呼叫，抽象類別本身不可被實例化。
   * Creates an instance of the current subclass as a unified factory method.
   *
   * @param seed 種子 (Seed)，任意型別；未提供時交由種子推導處理
   * @param opts 種子推導所使用的選項 (Options)
   * @param argv 其餘欲傳給建構子的參數 (Extra constructor arguments)
   * @returns 目前子類別的實例 / an instance of the current subclass
   * @throws {ReferenceError} 當 `this` 為 `RNG`、`RNGCore` 或空值時，抽象類別不可直接實例化
   */
  static create(seed, opts, ...argv) {
    if (this === RNG || this === rngAbstractCore.RNGCore || !this) {
      throw new ReferenceError('RNG is abstract class');
    }
    /**
     * 子類別建構子的簽章 (Signature) 在靜態型別上無法確知，
     * 因此需要 `@ts-ignore` 才能將參數原樣轉交給 `new`。
     * The subclass constructor signature is not statically known, so `@ts-ignore` is required to forward all arguments.
     */
    // @ts-ignore
    return new this(seed, opts, ...argv);
  }
  _seedNum(seed, opts, ...argv) {
    if (typeof seed === 'undefined' || seed === null || seed === 0) {
      seed = seedToken.randomSeedStr();
    }
    return seedToken.seedToken(seed, opts, ...argv);
  }
  _seedStr(seed, opts, ...argv) {
    return seedToken.hashAny(seed, opts, ...argv);
  }
}

exports.RNG = RNG;
exports.default = RNG;
//# sourceMappingURL=index.cjs.development.cjs.map
