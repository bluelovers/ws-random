"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNGCrypto = void 0;
const array_1 = require("../util/array");
const const_1 = require("../util/const");
const crypto_1 = require("../util/crypto");
const math_1 = require("../util/math");
const ow_1 = __importDefault(require("../util/ow"));
const rng_1 = __importDefault(require("../rng"));
class RNGCrypto extends rng_1.default {
    constructor(seed, opts, ...argv) {
        super();
        this._seedable = false;
        this._randIndex = array_1.randIndex;
        this._seed_size = const_1.UINT32_BYTES;
        this._seed_size_min = const_1.UINT32_BYTES;
        this._init(seed, opts, ...argv);
    }
    _init(crypto, opts, ...argv) {
        crypto = crypto || (0, crypto_1.crossCrypto)();
        this._crypto = crypto;
        this._randIndex = this._randIndex || array_1.randIndex;
        (0, ow_1.default)(crypto.randomBytes).is.a.function();
        if (1) {
            this._seed_size = Math.min(Math.max(this._seed_size, const_1.UINT32_BYTES), 255);
            this._seed_size_min = Math.min(Math.max(this._seed_size_min, const_1.UINT32_BYTES), 255);
            this._fn = math_1._floatFromBuffer2;
        }
        else {
            this._seed_size = Math.min(Math.max(this._seed_size, const_1.FLOAT_ENTROPY_BYTES), 255);
            this._seed_size_min = Math.min(Math.max(this._seed_size_min, const_1.FLOAT_ENTROPY_BYTES), 255);
            this._fn = math_1._floatFromBuffer;
        }
    }
    _buffer(size, size_min = this._seed_size_min) {
        size = (size || this._seed_size) | 0;
        if (size < size_min) {
            size = size_min;
        }
        else if (size > 255) {
            size = 255;
        }
        let buf = this._crypto.randomBytes(size);
        if (size > size_min) {
            let i = this._randIndex(size - size_min);
            // @ts-ignore
            buf = buf.slice(i, i + size_min);
        }
        return buf;
    }
    get name() {
        return 'crypto';
    }
    next() {
        return this._fn(this._buffer());
    }
    seed(seed, opts, ...argv) {
    }
}
exports.RNGCrypto = RNGCrypto;
exports.default = RNGCrypto;
//# sourceMappingURL=crypto.js.map