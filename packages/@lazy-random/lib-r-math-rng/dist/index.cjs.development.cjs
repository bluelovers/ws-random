'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var libRMath = require('lib-r-math.js');
var random = require('random-extra/src/random');
var rngAbstract = require('@lazy-random/rng-abstract');
var isExtendsOf = require('is-extends-of');

function _interopNamespaceDefault(e) {
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return n;
}

var libRMath__namespace = /*#__PURE__*/_interopNamespaceDefault(libRMath);

class LibRMathRngWithRandom extends libRMath.IRNG {
  /**
   * 建立實例並立刻套用底層亂數產生器與種子 (Seed)
   * Create an instance and immediately apply the underlying RNG and seed
   *
   * @param _seed - 亂數種子 (Seed)，會一併交給 `use()` 重設
   * @param rng - 底層亂數來源，可為 `Random`、`RNG`、`IRNGLike` 實例或名稱字串
   */
  constructor(_seed, rng) {
    // @ts-ignore
    super(_seed);
    this.use(rng, _seed);
  }
  // @ts-ignore
  get _name() {
    return 'Random<' + this.__random.rng.name + '>';
  }
  get seed() {
    return this.__seed;
  }
  /**
   * 重設亂數種子 (Seed)，同步呼叫底層 `Random` 的種子設定函式
   * Reset the random seed, which also invokes the underlying `Random` seed function
   *
   * @param _seed - 新的亂數種子 (Seed)
   */
  set seed(_seed) {
    var _this$__random$seed, _this$__random;
    (_this$__random$seed = (_this$__random = this.__random).seed) === null || _this$__random$seed === void 0 || _this$__random$seed.call(_this$__random, this.__seed = _seed);
  }
  /**
   * 切換底層亂數產生器 (RNG)，並在有傳入時重設種子 (Seed)
   * Switch the underlying RNG and reset the seed when one is provided
   *
   * @param rng - 底層亂數來源；未傳入時沿用既有的 `__random`，否則退回全域 `random`
   * @param _seed - 亂數種子 (Seed)，僅在非 `undefined` 時重設
   */
  use(rng, _seed) {
    if (rng) {
      /**
       * 以 `_isInstanceOfRNG()` 取代原生 `instanceof RNG`：兩者共用 `@lazy-random/rng-abstract`
       * 的品牌鍵 (Brand Key) 驗證，ESM / CJS 重複載入時同一個別仍會被承認，
       * 不會因為建構子不同個體而誤判成「不是 RNG」、白白多走一次 `random.newUse()`。
       * `_isInstanceOfRNG()` replaces native `instanceof RNG`; both share the brand-key check from
       * `@lazy-random/rng-abstract`, so a duplicate ESM/CJS copy still counts as an RNG
       * and does not fall through to `random.newUse()`.
       */
      if (rngAbstract._isInstanceOfRNG(rng) || typeof rng.next === 'function') ; else if (rng === 'seedrandom') {
        rng = random.random.newUse('seedrandom', _seed, {
          entropy: false
        });
      } else if (!(rng instanceof random.Random)) {
        rng = random.random.newUse(rng);
      }
    }
    this.__random = rng || this.__random || random.random;
    if (typeof _seed !== 'undefined') {
      this.seed = _seed;
    }
  }
  _setup() {}
  /**
   * 取得下一個亂數 (Random Number)，委派給底層 `Random.next()`
   * Get the next random number, delegating to the underlying `Random.next()`
   *
   * @returns 底層 `Random` 產生的亂數 / the random number produced by the underlying `Random`
   */
  internal_unif_rand() {
    return this.__random.next();
  }
}
/**
 * 型別守衛 (Type Guard)：判斷是否為 lib-r-math.js 的 RNGLike
 * Type guard: checks whether a value is a lib-r-math.js RNGLike
 *
 * 以鴨子型別 (Duck Typing) 檢查 `unif_rand` 或 `internal_unif_rand` 是否存在
 * Uses duck typing to check for `unif_rand` or `internal_unif_rand`
 *
 * @param rng - 待檢查的值 / the value to check
 * @returns 是否為 RNGLike / whether the value is RNGLike
 */
function _isLibRMathRNGLike(rng) {
  // @ts-ignore
  if (rng && (typeof rng.unif_rand === 'function' || typeof rng.internal_unif_rand === 'function')) {
    return true;
  }
  return false;
}
/**
 * 型別守衛 (Type Guard)：判斷是否為 lib-r-math.js `IRNG` 的子類別 (Subclass)
 * Type guard: checks whether a value is a subclass of lib-r-math.js's `IRNG`
 *
 * 與 `_isLibRMathRNGLike` 的差別在於此處檢查的是類別繼承關係而非實例特徵
 * Unlike `_isLibRMathRNGLike`, this checks class inheritance rather than instance shape
 *
 * @param rng - 待檢查的值 / the value to check
 * @returns 是否為 `IRNG` 子類別 / whether the value is an `IRNG` subclass
 */
function _isExtendsOfLibRMathRNGLike(rng) {
  if (rng && isExtendsOf(rng, libRMath.IRNG)) {
    return true;
  }
  return false;
}
/**
 * 將 lib-r-math.js 的亂數產生器 (RNG) 包裝成 `@lazy-random` 的 `RNG`
 * Wraps a lib-r-math.js RNG as a `@lazy-random` `RNG`
 *
 * 讓 `@lazy-random`／`random-extra` 的函式可以改用 lib-r-math.js 作為亂數 (Random Number) 來源
 * Allows `@lazy-random`/`random-extra` functions to consume lib-r-math.js as their random number source
 *
 * @template R - 底層的 lib-r-math.js `IRNG` 型別 / the underlying lib-r-math.js `IRNG` type
 */
class RandomRngWithLibRMath extends rngAbstract.RNG {
  _seedable = true;
  /**
   * 建立包裝器，實際的亂數產生器 (RNG) 解析交給 `_init()` 處理
   * Create the wrapper; actual RNG resolution is delegated to `_init()`
   *
   * @param seed - 種子 (Seed) 或 `IRNG` 實例／子類別／RNGLike 實例
   * @param opts - 第二個候選的亂數產生器 (RNG) 或名稱
   */
  constructor(seed, opts, ...argv) {
    super();
    this._init(seed, opts, ...argv);
  }
  /**
   * 依優先順序解析底層 `IRNG`，並綁定取亂數 (Random Number) 的函式
   * Resolve the underlying `IRNG` by priority and bind the random number function
   *
   * @param seed - 種子 (Seed) 或第一個候選的亂數來源
   * @param opts - 第二個候選的亂數來源或名稱
   */
  _init(seed, opts, ...argv) {
    if (seed instanceof libRMath.IRNG) {
      // @ts-ignore
      this._rng = seed;
    } else if (opts instanceof libRMath.IRNG) {
      // @ts-ignore
      this._rng = opts;
    } else if (_isExtendsOfLibRMathRNGLike(seed)) {
      // @ts-ignore
      this._rng = new seed(this._seedNum(opts));
    } else if (_isExtendsOfLibRMathRNGLike(opts)) {
      // @ts-ignore
      this._rng = new opts(this._seedNum(seed));
    } else if (_isLibRMathRNGLike(seed)) {
      this._rng = seed;
    } else if (_isLibRMathRNGLike(opts)) {
      this._rng = opts;
    } else if (opts && libRMath__namespace[opts]) {
      let r = libRMath__namespace[opts];
      // @ts-ignore
      this._rng = new r(this._seedNum(seed));
    } else {
      // @ts-ignore
      this._rng = new libRMath__namespace.rng.MersenneTwister(this._seedNum(seed));
    }
    // @ts-ignore
    this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
  }
  get name() {
    return 'libRMath' + (this._rng.name ? `<${this._rng.name}>` : '');
  }
  get options() {
    // @ts-ignore
    return this._rng.seed;
  }
  /**
   * 取得下一個亂數 (Random Number)
   * Get the next random number
   *
   * @returns 底層 `IRNG` 產生的亂數 / the random number produced by the underlying `IRNG`
   */
  next() {
    return this._fn();
  }
  /**
   * 將種子 (Seed) 寫入底層 `IRNG`
   * Write the seed into the underlying `IRNG`
   *
   * 種子 (Seed) 會先經 `_seedNum()` 整理後，以單元素陣列寫入底層 `IRNG.seed`
   * The seed is normalized via `_seedNum()` and written into the underlying `IRNG.seed` as a single-element array
   *
   * @param seed - 新的亂數種子 (Seed)，亦可為種子陣列
   */
  // @ts-ignore
  seed(seed, opts, ...argv) {
    // @ts-ignore
    this._rng.seed = [this._seedNum(seed)];
  }
}

exports.LibRMathRngWithRandom = LibRMathRngWithRandom;
exports.RandomRngWithLibRMath = RandomRngWithLibRMath;
exports._isExtendsOfLibRMathRNGLike = _isExtendsOfLibRMathRNGLike;
exports._isLibRMathRNGLike = _isLibRMathRNGLike;
exports.default = RandomRngWithLibRMath;
//# sourceMappingURL=index.cjs.development.cjs.map
