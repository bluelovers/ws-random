'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function fakeLibRMathRng(fn) {
  function unif_rand(n) {
    if (n > 1) {
      let a = [];
      while (n--) {
        a[n] = fn();
      }
      return a;
    }
    return fn();
  }
  return {
    // @ts-ignore
    unif_rand,
    internal_unif_rand: unif_rand
  };
}

exports.default = fakeLibRMathRng;
exports.fakeLibRMathRng = fakeLibRMathRng;
//# sourceMappingURL=index.cjs.development.cjs.map
