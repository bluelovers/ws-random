'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generatorsFunction = require('@lazy-random/generators-function');
var seedrandom = require('seedrandom');
var cloneClass = require('@lazy-random/clone-class');

const defaultOptions = /*#__PURE__*/Object.freeze({
  entropy: true
});
class RNGSeedRandom extends generatorsFunction.RNGFunction {
  _seedable = true;
  /**
   * 建立 `seedrandom` 亂數產生器。
   * Create a `seedrandom`-backed random number generator.
   *
   * @param seed 種子 (Seed)，可省略 / the seed, may be omitted
   * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
   * @param lib 演算法名稱字串或函式 (Library name string or function)，省略時使用預設演算法 / the algorithm name or function; falls back to the default algorithm when omitted
   * @param argv 其餘參數，原樣轉交基類，其中第一項會在 `_init()` 中交給 `__generator()` / remaining arguments forwarded to the base class, whose first item is passed to `__generator()` in `_init()`
   */

  constructor(seed, opts, ...argv) {
    super(seed, opts, ...argv);
  }
  /**
   * 以「演算法在最前」的參數順序建立實例。
   * Create an instance with the library name as the first argument.
   *
   * @param lib 演算法名稱字串或函式 (Library name string or function) / the algorithm name or function
   * @param seed 種子 (Seed) / the seed
   * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
   * @param argv 其餘參數 / the remaining arguments
   * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
   */

  static createLib(...argv) {
    return new this(argv[1], argv[2], argv[0], ...argv.slice(3));
  }
  /**
   * 與 `new RNGSeedRandom(...)` 等價的靜態工厂方法 (Static Factory Method)，參數順序與建構子一致。
   * A static factory method equivalent to `new RNGSeedRandom(...)`, using the same argument order as the constructor.
   *
   * @param seed 種子 (Seed) / the seed
   * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
   * @param lib 演算法名稱字串或函式 (Library name string or function) / the algorithm name or function
   * @param argv 其餘參數 / the remaining arguments
   * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
   */

  static create(...argv) {
    return new this(...argv);
  }
  _init_check(seed, opts, ...argv) {}
  /**
   * 初始化選項 (Options) 與亂數來源函式 (Random Source Function)，再交由基類完成種子設定。
   * Initializes the options and the random source function, then defers seeding to the base class.
   *
   * @param seed 種子 (Seed) / the seed
   * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
   * @param argv 第一項為演算法名稱或函式，其後為附加參數 / the first item is the library name or function, followed by extra arguments
   */
  _init(seed, opts, ...argv) {
    this._opts = this._opts || Object.assign({}, defaultOptions);
    this._seedrandom = this.__generator(...argv);
    super._init(seed, opts, ...argv);
  }
  _NAME = 'seedrandom';
  _TYPE = null;
  /**
   * 產生器名稱 (Generator Name)：固定前綴 `seedrandom`，有指定演算法時附加 `:<演算法>`。
   * The generator name: the constant prefix `seedrandom`, plus `:<algorithm>` when one is specified.
   *
   * @returns 形如 `seedrandom` 或 `seedrandom:<演算法>` 的字串 / a string such as `seedrandom` or `seedrandom:<algorithm>`
   */
  get name() {
    return `${this._NAME}${this._TYPE ? ':' + this._TYPE : ''}`;
  }
  /**
   * 將演算法 (Algorithm) 參數解析為實際可呼叫的 `seedrandom` 產生器函式。
   * Resolve the algorithm argument into an actual callable `seedrandom` generator function.
   *
   * @param fn 內建演算法名稱、`seedrandom/lib/` 模組名稱或函式 (Built-in name, `seedrandom/lib/` module name, or function) / the algorithm name or function
   * @returns 可呼叫的產生器 (Callable generator) / a callable generator
   * @throws `RangeError` 當名稱字串包含 `..` 或不符合安全名稱格式 / when the name contains `..` or fails the safe-name pattern
   */
  __generator(fn) {
    if (fn && typeof fn === 'string') {
      this._TYPE = null;
      switch (fn) {
        case 'alea':
        case 'tychei':
        case 'xor128':
        case 'xor4096':
        case 'xorshift7':
        case 'xorwow':
          fn = seedrandom[fn];
          this._TYPE = fn;
          break;
        default:
          if (!fn.includes('..') && /^[a-z\-\.]+$/i.test(fn)) {
            this._TYPE = fn;
            fn = require(`seedrandom/lib/${fn}`);
            break;
          } else {
            throw new RangeError(`unknow seedrandom lib name: ${fn}`);
          }
      }
    } else if (fn) {
      // @ts-ignore
      this._TYPE = fn.name;
    } else {
      this._TYPE = null;
    }
    fn = fn || seedrandom;
    return fn;
  }
  /**
   * 目前生效的 `seedrandom` 選項 (Options)，由 `_init()` 與 `seed()` 共同維護。
   * The `seedrandom` options currently in effect, maintained by `_init()` and `seed()`.
   *
   * @returns 選項物件 (Options object) / the options object
   */
  get options() {
    return this._opts;
  }
  get state() {
    const fn = this._rng.state;
    if (typeof fn === 'function') {
      // @ts-ignore
      return fn();
    }
  }
  /**
   * @todo options for change seeder
   */
  seed(seed, opts, ...argv) {
    if (opts === null) {
      this._opts = void 0;
    } else {
      this._opts = opts || this._opts;
    }
    this._rng = this._seedrandom(this._seedAuto(seed), this._opts, ...argv);
  }
  /**
   * 以目前實例的設定複製出新的 `RNGSeedRandom`。
   * Create a new `RNGSeedRandom` copying the current instance's settings.
   *
   * @param seed 覆寫的種子 (Seed to override with) / the seed to override with
   * @param opts 覆寫的選項 (Options to override with) / the options to override with
   * @param argv 其餘參數 / the remaining arguments
   * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
   */
  // @ts-ignore
  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGSeedRandom, this, seed, opts, ...argv);
  }
}

exports.RNGSeedRandom = RNGSeedRandom;
exports.default = RNGSeedRandom;
exports.defaultOptions = defaultOptions;
//# sourceMappingURL=index.cjs.development.cjs.map
