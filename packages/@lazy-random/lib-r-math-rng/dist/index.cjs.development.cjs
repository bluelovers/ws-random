'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var libRMath = require('lib-r-math.js');
var random = require('random-extra/src/random');
var rngAbstract = require('@lazy-random/rng-abstract');
var isExtendsOf = require('is-extends-of');

function _interopNamespaceDefault(e) {
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return n;
}

var libRMath__namespace = /*#__PURE__*/_interopNamespaceDefault(libRMath);

class LibRMathRngWithRandom extends libRMath.IRNG {
  constructor(_seed, rng) {
    // @ts-ignore
    super(_seed);
    this.use(rng, _seed);
  }
  // @ts-ignore
  get _name() {
    return 'Random<' + this.__random.rng.name + '>';
  }
  get seed() {
    return this.__seed;
  }
  set seed(_seed) {
    var _this$__random$seed, _this$__random;
    (_this$__random$seed = (_this$__random = this.__random).seed) === null || _this$__random$seed === void 0 || _this$__random$seed.call(_this$__random, this.__seed = _seed);
  }
  use(rng, _seed) {
    if (rng) {
      if (rng instanceof rngAbstract.RNG || typeof rng.next === 'function') ; else if (rng === 'seedrandom') {
        rng = random.random.newUse('seedrandom', _seed, {
          entropy: false
        });
      } else if (!(rng instanceof random.Random)) {
        rng = random.random.newUse(rng);
      }
    }
    this.__random = rng || this.__random || random.random;
    if (typeof _seed !== 'undefined') {
      this.seed = _seed;
    }
  }
  _setup() {}
  internal_unif_rand() {
    return this.__random.next();
  }
}
function _isLibRMathRNGLike(rng) {
  // @ts-ignore
  if (rng && (typeof rng.unif_rand === 'function' || typeof rng.internal_unif_rand === 'function')) {
    return true;
  }
  return false;
}
function _isExtendsOfLibRMathRNGLike(rng) {
  if (rng && isExtendsOf(rng, libRMath.IRNG)) {
    return true;
  }
  return false;
}
class RandomRngWithLibRMath extends rngAbstract.RNG {
  _seedable = true;
  constructor(seed, opts, ...argv) {
    super();
    this._init(seed, opts, ...argv);
  }
  _init(seed, opts, ...argv) {
    if (seed instanceof libRMath.IRNG) {
      // @ts-ignore
      this._rng = seed;
    } else if (opts instanceof libRMath.IRNG) {
      // @ts-ignore
      this._rng = opts;
    } else if (_isExtendsOfLibRMathRNGLike(seed)) {
      // @ts-ignore
      this._rng = new seed(this._seedNum(opts));
    } else if (_isExtendsOfLibRMathRNGLike(opts)) {
      // @ts-ignore
      this._rng = new opts(this._seedNum(seed));
    } else if (_isLibRMathRNGLike(seed)) {
      this._rng = seed;
    } else if (_isLibRMathRNGLike(opts)) {
      this._rng = opts;
    } else if (opts && libRMath__namespace[opts]) {
      let r = libRMath__namespace[opts];
      // @ts-ignore
      this._rng = new r(this._seedNum(seed));
    } else {
      // @ts-ignore
      this._rng = new libRMath__namespace.rng.MersenneTwister(this._seedNum(seed));
    }
    // @ts-ignore
    this._fn = (this._rng.internal_unif_rand || this._rng.unif_rand).bind(this._rng);
  }
  get name() {
    return 'libRMath' + (this._rng.name ? `<${this._rng.name}>` : '');
  }
  get options() {
    // @ts-ignore
    return this._rng.seed;
  }
  next() {
    return this._fn();
  }
  // @ts-ignore
  seed(seed, opts, ...argv) {
    // @ts-ignore
    this._rng.seed = [this._seedNum(seed)];
  }
}

exports.LibRMathRngWithRandom = LibRMathRngWithRandom;
exports.RandomRngWithLibRMath = RandomRngWithLibRMath;
exports._isExtendsOfLibRMathRNGLike = _isExtendsOfLibRMathRNGLike;
exports._isLibRMathRNGLike = _isLibRMathRNGLike;
exports.default = RandomRngWithLibRMath;
//# sourceMappingURL=index.cjs.development.cjs.map
