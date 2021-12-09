"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNGCrypto = void 0;
const shared_lib_1 = require("@lazy-random/shared-lib");
const crypto_1 = require("../util/crypto");
const expect_1 = require("@lazy-random/expect");
const rng_abstract_1 = require("@lazy-random/rng-abstract");
const float_from_buffer_1 = require("@lazy-num/float-from-buffer");
const array_rand_index_1 = require("@lazy-random/array-rand-index");
class RNGCrypto extends rng_abstract_1.RNG {
    constructor(seed, opts, ...argv) {
        super();
        this._seedable = false;
        this._randIndex = array_rand_index_1.arrayRandIndexByLength;
        this._seed_size = shared_lib_1.UINT32_BYTES;
        this._seed_size_min = shared_lib_1.UINT32_BYTES;
        this._init(seed, opts, ...argv);
    }
    _init(crypto, opts, ...argv) {
        crypto = crypto || (0, crypto_1.crossCrypto)();
        this._crypto = crypto;
        this._randIndex = this._randIndex || array_rand_index_1.arrayRandIndexByLength;
        (0, expect_1.expect)(crypto.randomBytes).is.a.function();
        if (1) {
            this._seed_size = Math.min(Math.max(this._seed_size, shared_lib_1.UINT32_BYTES), 255);
            this._seed_size_min = Math.min(Math.max(this._seed_size_min, shared_lib_1.UINT32_BYTES), 255);
            this._fn = float_from_buffer_1._floatFromBuffer2;
        }
        else {
            this._seed_size = Math.min(Math.max(this._seed_size, shared_lib_1.FLOAT_ENTROPY_BYTES), 255);
            this._seed_size_min = Math.min(Math.max(this._seed_size_min, shared_lib_1.FLOAT_ENTROPY_BYTES), 255);
            this._fn = float_from_buffer_1._floatFromBuffer;
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