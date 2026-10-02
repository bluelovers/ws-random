'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 以閉包 (Closure) 快取 (Cache) 方式，解析並回傳目前環境可用的 `crypto` 實作
 * Resolve and return the `crypto` implementation available in the current
 * environment, caching the resolved instance inside a closure.
 *
 * 首次呼叫會依序嘗試 `require('crypto')`、全域 (Global) 的 `crypto`／`msCrypto`；
 * 瀏覽器缺少 `randomBytes` 時會補上 (Polyfill) 對應實作。
 * The first call tries `require('crypto')` then global `crypto`／`msCrypto`;
 * a `randomBytes` polyfill is added when the browser lacks one.
 *
 * @returns 目前環境的 `crypto` 實例 / the `crypto` instance for the current environment
 * @throws 環境完全不支援 `crypto` 時拋出 `not support crypto` / throws `not support crypto` when nothing is available
 */
const crossCrypto = /*#__PURE__*/(() => {
  let crypto;
  return () => {
    if (typeof crypto === 'undefined') {
      var _crypto3;
      let _crypto;
      try {
        _crypto = crypto = require('crypto');
      } catch (e) {
        var _crypto2;
        // @ts-ignore
        _crypto = global.crypto || global.msCrypto;
        if ((_crypto2 = _crypto) !== null && _crypto2 !== void 0 && _crypto2.getRandomValues) {
          crypto = _crypto;
        }
      }
      if (!((_crypto3 = crypto) !== null && _crypto3 !== void 0 && _crypto3.randomBytes)) {
        crypto.randomBytes = crypto.randomBytes || function randomBytes(size, cb) {
          if (size > 65536) throw new Error('requested too many random bytes');
          let rawBytes = new Uint8Array(size);
          if (size > 0) {
            _crypto.getRandomValues(rawBytes);
          }
          let bytes = Buffer.from(rawBytes.buffer);
          if (typeof cb === 'function') {
            cb(null, bytes);
          }
          return bytes;
        };
      }
    }
    if (!crypto) {
      crypto = null;
      throw new Error(`not support crypto`);
    }
    return crypto;
  };
})();
/**
 * 取得指定數量的加密安全隨機位元組 (Cryptographically Secure Random Bytes)
 * Obtain the given number of cryptographically secure random bytes.
 *
 * 等同於 `crossCrypto().randomBytes(size, callback)`。
 * Equivalent to `crossCrypto().randomBytes(size, callback)`.
 *
 * @param size 要產生的位元組數 / how many bytes to generate
 * @param callback 完成時的回呼，第一參數為錯誤 / completion callback whose first argument is an error
 * @returns 隨機位元組 / the random bytes
 */
function randomBytes(size, callback) {
  return crossCrypto().randomBytes(size, callback);
}

exports.crossCrypto = crossCrypto;
exports.default = crossCrypto;
exports.randomBytes = randomBytes;
//# sourceMappingURL=index.cjs.development.cjs.map
