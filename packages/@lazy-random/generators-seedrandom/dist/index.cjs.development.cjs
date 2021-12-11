'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generatorsFunction = require('@lazy-random/generators-function');
var seedrandom = require('seedrandom');
var cloneClass = require('@lazy-random/clone-class');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var seedrandom__default = /*#__PURE__*/_interopDefaultLegacy(seedrandom);

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

const defaultOptions = /*#__PURE__*/Object.freeze({
  entropy: true
});
class RNGSeedRandom extends generatorsFunction.RNGFunction {
  constructor(seed, opts, ...argv) {
    super(seed, opts, ...argv);

    _defineProperty(this, "_seedable", true);

    _defineProperty(this, "_NAME", 'seedrandom');

    _defineProperty(this, "_TYPE", null);
  }

  static createLib(...argv) {
    return new this(argv[1], argv[2], argv[0], ...argv.slice(3));
  }

  static create(...argv) {
    return new this(...argv);
  }

  _init_check(seed, opts, ...argv) {}

  _init(seed, opts, ...argv) {
    this._opts = this._opts || Object.assign({}, defaultOptions);
    this._seedrandom = this.__generator(...argv);

    super._init(seed, opts, ...argv);
  }

  get name() {
    return `${this._NAME}${this._TYPE ? ':' + this._TYPE : ''}`;
  }

  __generator(fn) {
    if (fn && typeof fn === 'string') {
      this._TYPE = null;

      switch (fn) {
        case 'alea':
        case 'tychei':
        case 'xor128':
        case 'xor4096':
        case 'xorshift7':
        case 'xorwow':
          fn = seedrandom__default["default"][fn];
          this._TYPE = fn;
          break;

        default:
          if (fn.indexOf('..') === -1 && /^[a-z\-\.]+$/i.test(fn)) {
            this._TYPE = fn;
            fn = require(`seedrandom/lib/${fn}`);
            break;
          } else {
            throw new RangeError(`unknow seedrandom lib name: ${fn}`);
          }

      }
    } else if (fn) {
      this._TYPE = fn.name;
    } else {
      this._TYPE = null;
    }

    fn = fn || seedrandom__default["default"];
    return fn;
  }

  get options() {
    return this._opts;
  }

  get state() {
    let fn = this._rng.state;

    if (typeof fn === 'function') {
      return fn();
    }
  }

  seed(seed, opts, ...argv) {
    if (opts === null) {
      this._opts = undefined;
    } else {
      this._opts = opts || this._opts;
    }

    this._rng = this._seedrandom(this._seedAuto(seed), this._opts, ...argv);
  }

  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGSeedRandom, this, seed, opts, ...argv);
  }

}

exports.RNGSeedRandom = RNGSeedRandom;
exports["default"] = RNGSeedRandom;
exports.defaultOptions = defaultOptions;
//# sourceMappingURL=index.cjs.development.cjs.map
