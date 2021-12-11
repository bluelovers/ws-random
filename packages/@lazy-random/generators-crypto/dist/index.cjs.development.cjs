'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sharedLib = require('@lazy-random/shared-lib');
var crossCrypto = require('@lazy-random/cross-crypto');
var expect = require('@lazy-random/expect');
var rngAbstract = require('@lazy-random/rng-abstract');
var floatFromBuffer = require('@lazy-num/float-from-buffer');
var arrayRandIndex = require('@lazy-random/array-rand-index');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class RNGCrypto extends rngAbstract.RNG {
  constructor(seed, opts, ...argv) {
    super();

    _defineProperty(this, "_seedable", false);

    _defineProperty(this, "_randIndex", arrayRandIndex.arrayRandIndexByLength);

    _defineProperty(this, "_seed_size", sharedLib.UINT32_BYTES);

    _defineProperty(this, "_seed_size_min", sharedLib.UINT32_BYTES);

    this._init(seed, opts, ...argv);
  }

  _init(crypto, opts, ...argv) {
    crypto = crypto || crossCrypto.crossCrypto();
    this._crypto = crypto;
    this._randIndex = this._randIndex || arrayRandIndex.arrayRandIndexByLength;
    expect.expect(crypto.randomBytes).is.a.function();

    {
      this._seed_size = Math.min(Math.max(this._seed_size, sharedLib.UINT32_BYTES), 255);
      this._seed_size_min = Math.min(Math.max(this._seed_size_min, sharedLib.UINT32_BYTES), 255);
      this._fn = floatFromBuffer._floatFromBuffer2;
    }
  }

  _buffer(size, size_min = this._seed_size_min) {
    size = (size || this._seed_size) | 0;

    if (size < size_min) {
      size = size_min;
    } else if (size > 255) {
      size = 255;
    }

    let buf = this._crypto.randomBytes(size);

    if (size > size_min) {
      let i = this._randIndex(size - size_min);

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

  seed(seed, opts, ...argv) {}

}

exports.RNGCrypto = RNGCrypto;
exports["default"] = RNGCrypto;
//# sourceMappingURL=index.cjs.development.cjs.map
