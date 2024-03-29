'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generatorsFunction = require('@lazy-random/generators-function');
var seedrandom = require('seedrandom');
var cloneClass = require('@lazy-random/clone-class');

const defaultOptions = /*#__PURE__*/Object.freeze({
  entropy: true
});
class RNGSeedRandom extends generatorsFunction.RNGFunction {
  _seedable = true;
  constructor(seed, opts, ...argv) {
    super(seed, opts, ...argv);
  }
  static createLib(...argv) {
    return new this(argv[1], argv[2], argv[0], ...argv.slice(3));
  }
  static create(...argv) {
    return new this(...argv);
  }
  // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
  _init_check(seed, opts, ...argv) {}
  _init(seed, opts, ...argv) {
    this._opts = this._opts || Object.assign({}, defaultOptions);
    this._seedrandom = this.__generator(...argv);
    super._init(seed, opts, ...argv);
  }
  _NAME = 'seedrandom';
  _TYPE = null;
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
          fn = seedrandom[fn];
          //fn = require(`seedrandom/lib/${fn}`)
          this._TYPE = fn;
          break;
        default:
          if (!fn.includes('..') && /^[a-z\-\.]+$/i.test(fn)) {
            this._TYPE = fn;
            fn = require(`seedrandom/lib/${fn}`);
            break;
          } else {
            throw new RangeError(`unknow seedrandom lib name: ${fn}`);
          }
      }
    } else if (fn) {
      // @ts-ignore
      this._TYPE = fn.name;
    } else {
      this._TYPE = null;
    }
    fn = fn || seedrandom;
    return fn;
    /*
    return (seed?, opts?: RNGSeedRandomOptions, ...argv) => {
        // @ts-ignore
        return fn(seed, opts, ...argv)
    }
    */
  }

  get options() {
    return this._opts;
  }
  /**
   * only when option.state = true
   */
  // eslint-disable-next-line consistent-return,getter-return
  get state() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const fn = this._rng.state;
    if (typeof fn === 'function') {
      // @ts-ignore
      return fn();
    }
  }
  /**
   * @todo options for change seeder
   */
  seed(seed, opts, ...argv) {
    if (opts === null) {
      this._opts = void 0;
    } else {
      this._opts = opts || this._opts;
    }
    this._rng = this._seedrandom(this._seedAuto(seed), this._opts, ...argv);
  }
  // @ts-ignore
  clone(seed, opts, ...argv) {
    return cloneClass.cloneClass(RNGSeedRandom, this, seed, opts, ...argv);
  }
}

exports.RNGSeedRandom = RNGSeedRandom;
exports.default = RNGSeedRandom;
exports.defaultOptions = defaultOptions;
//# sourceMappingURL=index.cjs.development.cjs.map
