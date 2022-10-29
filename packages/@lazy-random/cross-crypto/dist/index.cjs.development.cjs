'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
function randomBytes(size, callback) {
  return crossCrypto().randomBytes(size, callback);
}

exports.crossCrypto = crossCrypto;
exports.default = crossCrypto;
exports.randomBytes = randomBytes;
//# sourceMappingURL=index.cjs.development.cjs.map
