"use strict";
/**
 * Created by user on 2018/11/25/025.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBytes = exports.crossCrypto = void 0;
exports.crossCrypto = (() => {
    let crypto;
    return () => {
        if (typeof crypto === 'undefined') {
            let _crypto;
            try {
                _crypto = crypto = require('crypto');
            }
            catch (e) {
                // @ts-ignore
                _crypto = global.crypto || global.msCrypto;
                if (_crypto && _crypto.getRandomValues) {
                    crypto = _crypto;
                }
            }
            if (crypto && !crypto.randomBytes) {
                crypto.randomBytes = crypto.randomBytes || function randomBytes(size, cb) {
                    if (size > 65536)
                        throw new Error('requested too many random bytes');
                    let rawBytes = new Uint8Array(size);
                    if (size > 0) {
                        _crypto.getRandomValues(rawBytes);
                    }
                    // XXX: phantomjs doesn't like a buffer being passed here
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
    return exports.crossCrypto().randomBytes(size, callback);
}
exports.randomBytes = randomBytes;
//# sourceMappingURL=crypto.js.map