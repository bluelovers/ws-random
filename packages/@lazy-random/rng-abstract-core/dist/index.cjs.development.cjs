'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class RNGCore {
  constructor(seed, opts, ...argv) {}
  _init_check(seed, opts, ...argv) {}
  /**
   * 初始化入口：先執行 `_init_check()` 驗證參數，再由子類別延伸後續流程
   * Initialization entry: run `_init_check()` to validate the arguments first, then let subclasses extend the rest
   *
   * @param seed - 種子 (Seed) / the seed
   * @param opts - 建立選項 (Options) / creation options
   */
  _init(seed, opts, ...argv) {
    this._init_check(seed, opts, ...argv);
  }
  /**
   * 靜態工廠 (Factory)：以 `new this(...)` 建立子類別實例
   * Static factory that instantiates the subclass via `new this(...)`
   *
   * @param seed - 種子 (Seed) / the seed
   * @param opts - 建立選項 (Options) / creation options
   * @returns 子類別的實例 / an instance of the subclass
   * @throws 於 `RNGCore` 本身（或無建構器）上呼叫時拋出 `ReferenceError` / throws `ReferenceError` when invoked on `RNGCore` itself (or without a constructor)
   */
  static create(seed, opts, ...argv) {
    if (this === RNGCore || !this) {
      throw new ReferenceError('RNG is abstract class');
    }
    // @ts-ignore
    return new this(seed, opts, ...argv);
  }
  /**
   * 亂數產生器 (RNG) 的名稱；抽象核心不提供預設值
   * Name of the RNG; the abstract core provides no default value
   *
   * @throws 子類別未覆寫時拋出 `Error` / throws `Error` when not overridden by a subclass
   */
  get name() {
    throw new Error('RNG.name must be overridden');
  }
  get options() {
    return null;
  }
  get seedable() {
    return null;
  }
  // @ts-ignore

  /**
   * 重新設定種子 (Seed)；預設為無操作 (No-op)，由子類別覆寫以實際套用種子
   * Reset the seed; a no-op by default, overridden by subclasses to actually apply the seed
   *
   * @param seed - 新的種子 (Seed) / the new seed
   * @param opts - 建立選項 (Options) / creation options
   */
  seed(seed, opts, ...argv) {}
  /**
   * 複製目前的 RNG 實例（可指定新的種子 (Seed)）
   * Clone the current RNG instance (optionally with a new seed)
   *
   * @param seed - 新實例使用的種子 (Seed) / seed for the new instance
   * @param opts - 建立選項 (Options) / creation options
   * @throws 子類別未覆寫時拋出 `ReferenceError` / throws `ReferenceError` when not overridden by a subclass
   */
  clone(seed, opts, ...argv) {
    throw new ReferenceError('RNG.clone must be overridden');
  }
  _seedAuto(seed, opts, ...argv) {
    if (seed && typeof seed === 'number') {
      return this._seedNum(seed, opts, ...argv);
    }
    return this._seedStr(seed, opts, ...argv);
  }
  _seedNum(seed, opts, ...argv) {
    throw new ReferenceError('RNG._seedNum must be overridden');
  }
  _seedStr(seed, opts, ...argv) {
    throw new ReferenceError('RNG._seedStr must be overridden');
  }
}

exports.RNGCore = RNGCore;
exports.default = RNGCore;
//# sourceMappingURL=index.cjs.development.cjs.map
