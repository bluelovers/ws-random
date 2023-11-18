"use strict";

function fakeLibRMathRng(n) {
  function unif_rand(e) {
    if (e > 1) {
      let r = [];
      for (;e--; ) r[e] = n();
      return r;
    }
    return n();
  }
  return {
    unif_rand,
    internal_unif_rand: unif_rand
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = fakeLibRMathRng, exports.fakeLibRMathRng = fakeLibRMathRng;
//# sourceMappingURL=index.cjs.production.min.cjs.map
