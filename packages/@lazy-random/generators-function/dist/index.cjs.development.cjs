'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var expect = require('@lazy-random/expect');
var rngAbstract = require('@lazy-random/rng-abstract');
var cloneClass = require('@lazy-random/clone-class');

/**
 * 把任意亂數函式包裝為 RNG 類別，使其享有 next()、clone() 等共用 API。
 *
 * Wraps an arbitrary random function into the RNG class, so it shares the
 * common API such as next() and clone().
 *
 * @typeParam S 底層亂數函式的型別 / the type of the underlying random function
 */
class RNGFunction extends rngAbstract.RNG {
  _seedable = null;
  /**
   * 建立包裝實例 (Instance)；初始化流程完全委派給 _init，方便子類別覆寫。
   *
   * Creates the wrapped instance; initialization is fully delegated to _init
   * so subclasses can override it.
   *
   * @param seed 底層亂數函式 / the underlying random function
   * @param opts 保留的選項參數（目前未使用） / reserved options, currently unused
   * @param argv 保留的其餘參數，透傳給 _init / extra arguments forwarded to _init
   * @throws 傳入非函式且非 null／undefined 的值時，由 _init_check 拋出斷言錯誤 / _init_check throws an assertion error for non-function, non-null, non-undefined input
   */
  constructor(seed, opts, ...argv) {
    super();
    this._init(seed, opts, ...argv);
  }
  /**
   * 建構期檢查：只有「非 null、非 undefined、且不是函式」的值才需要攔截，
   * 其餘情況（包含省略 seed）都允許延後到 seed() 再處理。
   *
   * Construction-time check: only values that are non-null, non-undefined and
   * not a function need to be intercepted; everything else (including an
   * omitted seed) is deferred to seed().
   *
   * @param seed 待檢查的種子值 / the seed value to check
   * @param opts 保留的選項參數 / reserved options
   * @param argv 保留的其餘參數 / extra reserved arguments
   *
   * TODO: 疑似 bug：`expect(seed).function` 缺少函式呼叫，斷言 (Assertion) 不會執行；
   *       應為 `expect(seed).function()` 之類的寫法。依規範僅記錄，不修改邏輯。
   *       Suspected bug: `expect(seed).function` is missing a call, so the
   *       assertion never runs; it should be something like
   *       `expect(seed).function()`. Recorded only, logic left untouched.
   */
  _init_check(seed, opts, ...argv) {
    let type = typeof seed;
    if (seed !== null && type !== 'undefined' && type !== 'function') {
      // @ts-ignore
      expect.expect(seed).function;
    }
  }
  /**
   * 初始化流程：先檢查種子合法性，再交給 seed() 套用到底層函式。
   *
   * Initialization flow: validates the seed first, then applies it to the
   * underlying function via seed().
   *
   * @param seed 底層亂數函式 / the underlying random function
   * @param opts 保留的選項參數 / reserved options
   * @param argv 保留的其餘參數，透傳給 seed() / extra arguments forwarded to seed()
   */
  _init(seed, opts, ...argv) {
    this._init_check(seed, opts, ...argv);
    this.seed(seed, opts, ...argv);
  }
  get name() {
    return 'function';
  }
  get seedable() {
    return this._seedable;
  }
  /**
   * 呼叫底層函式取得下一個亂數 (Random Number)。
   *
   * Calls the underlying function for the next random number.
   *
   * @returns 底層函式回傳的 0～1 亂數 / the 0~1 random number returned by the underlying function
   */
  next() {
    return this._rng();
  }
  /**
   * 設定底層亂數函式；只有傳入函式時才會覆寫，
   * 避免非函式的種子值意外把 _rng 清掉。
   *
   * Sets the underlying random function; overwrites only when a function is
   * passed, so a non-function seed cannot accidentally clear _rng.
   *
   * @param seed 新的底層亂數函式 / the new underlying random function
   * @param opts 保留的選項參數 / reserved options
   * @param argv 保留的其餘參數 / extra reserved arguments
   */
  seed(seed, opts, ...argv) {
    if (typeof seed === 'function') {
      this._rng = seed || this._rng;
    }
  }
  /**
   * 以同一個 RNGFunction 類別與目前狀態建立新實例 (Instance)。
   *
   * Creates a new instance from the same RNGFunction class and current state.
   *
   * @param seed 新實例要使用的底層亂數函式 / the underlying random function for the new instance
   * @param opts 保留的選項參數 / reserved options
   * @param argv 保留的其餘參數，透傳給 cloneClass / extra arguments forwarded to cloneClass
   * @returns 新的 RNGFunction 實例 / a new RNGFunction instance
   */
  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGFunction, this, seed, opts, ...argv);
  }
}

exports.RNGFunction = RNGFunction;
exports.default = RNGFunction;
//# sourceMappingURL=index.cjs.development.cjs.map
