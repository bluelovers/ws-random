import { UINT32_BYTES } from '@lazy-random/shared-lib';
import { crossCrypto } from '@lazy-random/cross-crypto';
import { expect } from '@lazy-random/expect';
import { RNG } from '@lazy-random/rng-abstract';
import { _floatFromBuffer2 } from '@lazy-num/float-from-buffer';
import { arrayRandIndexByLength } from '@lazy-random/array-rand-index';

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

class RNGCrypto extends RNG {
  constructor(seed, opts, ...argv) {
    super();

    _defineProperty(this, "_seedable", false);

    _defineProperty(this, "_randIndex", arrayRandIndexByLength);

    _defineProperty(this, "_seed_size", UINT32_BYTES);

    _defineProperty(this, "_seed_size_min", UINT32_BYTES);

    this._init(seed, opts, ...argv);
  }

  _init(crypto, opts, ...argv) {
    crypto = crypto || crossCrypto();
    this._crypto = crypto;
    this._randIndex = this._randIndex || arrayRandIndexByLength;
    expect(crypto.randomBytes).is.a.function();

    {
      this._seed_size = Math.min(Math.max(this._seed_size, UINT32_BYTES), 255);
      this._seed_size_min = Math.min(Math.max(this._seed_size_min, UINT32_BYTES), 255);
      this._fn = _floatFromBuffer2;
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

export { RNGCrypto, RNGCrypto as default };
//# sourceMappingURL=index.esm.mjs.map
