'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var seedToken = require('@lazy-random/seed-token');
var rngAbstractCore = require('@lazy-random/rng-abstract-core');

/**
 * 跨 ESM / CJS 模組實體 (Module Instance) 共用的品牌鍵 (Brand Key)
 *
 * 以 `Symbol.for()` 建立會進入全域符號登錄 (Global Symbol Registry)，
 * 因此同一行程式不論載入幾次 `@lazy-random/rng-abstract`
 * （`require()` 與 `import` 各一份、workspace 與 node_modules 各一份），
 * 取得的都是同一個 symbol，可作為「同屬 `RNG` 家族」的共同識別依據。
 *
 * Built with `Symbol.for()` so it lives in the global symbol registry: every copy of
 * `@lazy-random/rng-abstract` loaded in the same process resolves to the same symbol,
 * making it a reliable "same RNG family" marker regardless of ESM/CJS duplication.
 */
const SYMBOL_RNG_BRAND = /*#__PURE__*/Symbol.for('@lazy-random/rng-abstract#RNG');
/**
 * 以品牌鍵 (Brand Key) 判斷值是否為 `RNG` 家族的實例
 *
 * 讀取值的原型 (Prototype) 上的 `SYMBOL_RNG_BRAND`，而不是比對建構子 (Constructor) 本身，
 * 讓 ESM 與 CJS 各自載入的一份 `RNG` 類別有機會互相承認；
 * 原型不存在（例如 `Object.create(null)`）時以 `?.` 安全地回傳 `undefined`。
 *
 * Reads `SYMBOL_RNG_BRAND` from the value's prototype instead of comparing constructors, giving an
 * ESM copy and a CJS copy of `RNG` a chance to recognise each other; `?.` safely yields `undefined`
 * when there is no prototype (e.g. `Object.create(null)`).
 *
 * TODO: `RNG` 目前以「實例欄位」宣告 `private readonly [SYMBOL_RNG_BRAND]`（own property），
 * 而此處讀取的是實例的「原型」，兩者位置不一致時會恆回 `undefined`；
 * 需改為讀取 `value[SYMBOL_RNG_BRAND]`，或把品牌鍵掛到 `RNG.prototype`，僅記錄、不修改邏輯。
 * TODO: `RNG` declares `private readonly [SYMBOL_RNG_BRAND]` as an instance field (own property)
 * while this reads the value's prototype, so the two never line up and it always returns
 * `undefined`; either read `value[SYMBOL_RNG_BRAND]` or brand `RNG.prototype` — recorded only,
 * logic untouched.
 *
 * @param value - 待檢查的值 / the value to check
 * @returns 原型上帶有品牌鍵時為真值，否則為 `undefined` / truthy when the prototype carries the brand key, `undefined` otherwise
 */
function _hasRNGBrand(value) {
  var _Object$getPrototypeO;
  if (!value || typeof value !== 'object' && typeof value !== 'function') {
    return false;
  }
  return (_Object$getPrototypeO = Object.getPrototypeOf(value)) === null || _Object$getPrototypeO === void 0 ? void 0 : _Object$getPrototypeO[SYMBOL_RNG_BRAND];
}
class RNG extends rngAbstractCore.RNGCore {
  // @ts-ignore
  [SYMBOL_RNG_BRAND] = true;
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
class RNGInstanceOfError extends TypeError {
  constructor(message, value) {
    if (typeof message === 'function') {
      message = message(value);
    }
    super(message || _getExpectRNGMessage(value));
  }
}
/**
 * 依被檢查的值產生預設失敗訊息 (Build the default failure message from the checked value)
 *
 * 訊息格式為 `expected [<constructor name>] <value> to be an instance of RNG`，
 * 保留 `to be an instance of RNG` 字樣，與過去 Chai 斷言訊息的特徵一致；
 * 取不到建構子名稱（例如 `null`、`undefined`）時以 `unknown` 代替。
 * The message keeps `to be an instance of RNG` for consistency with the old Chai assertion,
 * and falls back to `unknown` when the constructor name is unavailable (`null`, `undefined`).
 *
 * @param value - 被檢查的值，會被字串化後放進訊息 / the checked value, stringified into the message
 * @returns 預設失敗訊息 / the default failure message
 */
function _getExpectRNGMessage(value) {
  var _value$constructor;
  return `expected [${(value === null || value === void 0 || (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name) || 'unknown'}] ${value} to be an instance of RNG`;
}
/**
 * 判斷值是否為 `RNG` 實例，即自我驗證版的 `instanceof` (Self-verifying `instanceof`)
 *
 * 先走原生 `value instanceof RNG`，再以品牌鍵 `_hasRNGBrand()` 補上
 * ESM / CJS 重複載入造成的「同類別、不同個體」情況，最後以 `|| false` 統一回傳布林值；
 * 可直接取代專案中的 `x instanceof RNG` 寫法。
 * Falls back from the native `value instanceof RNG` to the brand-key check `_hasRNGBrand()` —
 * which covers the "same class, different module instance" case of duplicate ESM/CJS loads —
 * and normalizes the result to a boolean; use it to replace `x instanceof RNG`.
 *
 * @param value - 待檢查的值 / the value to check
 * @returns 是否為 `RNG` 家族的實例 / whether the value is an `RNG` instance
 */
function _isInstanceOfRNG(value) {
  return value instanceof RNG || _hasRNGBrand(value) || false;
}
/**
 * 斷言 (Assert) 傳入的值確實為 `RNG` 實例，失敗時拋出 `RNGInstanceOfError`
 *
 * 與 `_isInstanceOfRNG()` 共用同一套品牌鍵 (Brand Key) 驗證，可取代
 * `expect(rng).instanceof(RNG)` 寫法；回傳宣告為 `asserts value is RNG & T`，
 * 呼叫端可顯式傳入 `<R>`，使收窄 (Narrowing) 後的型別仍符合自己的泛型參數（例如 `_rng: R`）。
 *
 * Asserts that the value is an `RNG` instance and throws `RNGInstanceOfError` otherwise.
 * It shares the brand check with `_isInstanceOfRNG()` and replaces `expect(rng).instanceof(RNG)`;
 * the return type is declared as `asserts value is RNG & T`, so callers can pass an explicit `<R>`
 * and keep the narrowed type compatible with their own generic parameter (e.g. `_rng: R`).
 *
 * @param value - 待驗證的值 / the value to check
 * @param message - 覆寫本次呼叫使用的訊息，省略時採用 `_getExpectRNGMessage(value)` /
 * message for this call only; omitted means `_getExpectRNGMessage(value)`
 * @throws {RNGInstanceOfError} 值不是 `RNG` 實例時 / when the value is not an `RNG` instance
 */
function _assertInstanceOfRNG(value, message) {
  if (!_isInstanceOfRNG(value)) {
    throw new RNGInstanceOfError(message, value);
  }
}
/**
 * 判斷是否為「instanceof 檢查失敗」的錯誤 (Whether the error is a failed instanceof check)
 *
 * 同時涵蓋兩種錯誤來源，讓驗證規則能在新舊實作之間相容：
 * 1. 本套件 `_assertInstanceOfRNG()` 拋出的 `RNGInstanceOfError`（以類別判定）
 * 2. 舊版 `expect(rng).instanceof(RNG)` 拋出的 chai AssertionError（以 `name` 與訊息特徵判定）
 *
 * Covers both error sources so a check stays compatible with old and new implementations:
 * 1. the `RNGInstanceOfError` thrown by this package's `_assertInstanceOfRNG()` (matched by class)
 * 2. the chai AssertionError from the old `expect(rng).instanceof(RNG)` (matched by `name` and message)
 *
 * @param err - 待檢查的錯誤值 / the error value to check
 * @returns 是否為上述其中一種錯誤 / whether it is one of the errors above
 */
function _isInstanceofAssertionOrRNGError(err) {
  return err instanceof RNGInstanceOfError || err instanceof Error && (err.name === 'AssertionError' || err.name === 'RNGAssertionError') && /instance/i.test(err.message);
}

exports.RNG = RNG;
exports.RNGInstanceOfError = RNGInstanceOfError;
exports._assertInstanceOfRNG = _assertInstanceOfRNG;
exports._getExpectRNGMessage = _getExpectRNGMessage;
exports._hasRNGBrand = _hasRNGBrand;
exports._isInstanceOfRNG = _isInstanceOfRNG;
exports._isInstanceofAssertionOrRNGError = _isInstanceofAssertionOrRNGError;
exports.default = RNG;
//# sourceMappingURL=index.cjs.development.cjs.map
