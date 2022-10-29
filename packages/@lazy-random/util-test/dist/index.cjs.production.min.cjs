"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/simple-wrap"), r = require("@lazy-random/original-math-random"), n = require("@lazy-random/rng-factory"), a = require("seedrandom");

Object.defineProperty(exports, "newRngFactory", {
  enumerable: !0,
  get: function() {
    return n.RNGFactory;
  }
}), exports.newRngMathRandom = function newRngMathRandom() {
  return e.simpleWrap(r._MathRandom);
}, exports.newRngSeedRandom = function newRngSeedRandom() {
  return n.RNGFactory(a("ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk"));
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
