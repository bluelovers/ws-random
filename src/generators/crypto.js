Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../util/array");
const const_1 = require("../util/const");
const math_1 = require("../util/math");
const ow_1 = require("../util/ow");
const rng_1 = require("../rng");
const req_1 = require("../util/req");
class RNGCrypto extends rng_1.default {
    constructor(seed, opts, ...argv) {
        super();
        this._seedable = false;
        this._randIndex = array_1.randIndex;
        this._seed_size = const_1.FLOAT_ENTROPY_BYTES;
        this._init(seed, opts, ...argv);
    }
    _init(crypto, opts, ...argv) {
        crypto = crypto || req_1.tryRequire('crypto');
        this._crypto = crypto;
        this._randIndex = this._randIndex || array_1.randIndex;
        ow_1.default(crypto.randomBytes).is.function();
    }
    _buffer(n) {
        n = (n || this._seed_size) | 0;
        if (n < const_1.FLOAT_ENTROPY_BYTES) {
            n = const_1.FLOAT_ENTROPY_BYTES;
        }
        else if (n > 255) {
            n = 255;
        }
        let buf = this._crypto.randomBytes(n);
        if (n > const_1.FLOAT_ENTROPY_BYTES) {
            let i = this._randIndex(n - const_1.FLOAT_ENTROPY_BYTES);
            // @ts-ignore
            buf = buf.slice(i, i + const_1.FLOAT_ENTROPY_BYTES);
        }
        return buf;
    }
    get name() {
        return 'crypto';
    }
    next() {
        return math_1._floatFromBuffer(this._buffer());
    }
    seed(seed, opts, ...argv) {
    }
}
exports.RNGCrypto = RNGCrypto;
exports.default = RNGCrypto;
